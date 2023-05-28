package fr.splio.velibstats.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.splio.velibstats.service.dto.velibs.FieldDTO;
import fr.splio.velibstats.service.dto.velibs.RecordDTO;
import fr.splio.velibstats.service.dto.velibs.VelibDataSetDTO;
import fr.splio.velibstats.web.rest.velibs.response.VelibStatResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class VelibStatService {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    public VelibStatResponse getVelibStatResponse(String dataSetFileName) {
        if (StringUtils.isEmpty(dataSetFileName)) {
            throw new IllegalArgumentException("Le nom du jeu de données est obligatoire");
        }
        Map<String, Map<Integer, Integer>> stationHourAvailableBikeData = new HashMap<>();
        Map<String, Map<Integer, Integer>> stationHourAvailableDockData = new HashMap<>();
        List<FieldDTO> fieldFromEachRecords = new ArrayList<>();
        try {
            // lecture du dataset
            fieldFromEachRecords = buildRecordFieldListFromDataSet(dataSetFileName);

            // Parcour de la liste des champs Fields contenant les nombre de vélibs disponibles, emplacement disponibles etc.
            for (FieldDTO recordStationField : fieldFromEachRecords) {
                // nom de la station
                String stationName = recordStationField.getStationName();
                // heure d'enregistrement des données de la station
                int hour = recordStationField.getDueDate().getHour();
                // construction des données des velos disponibles en moyenne par heure
                buildMapStationNameHourElement(stationHourAvailableBikeData, recordStationField.getNbBike() +
                    recordStationField.getNbEBike(), stationName, hour);
                // construction des données des emplacements libres disponibles  par heure
                buildMapStationNameHourElement(stationHourAvailableDockData, recordStationField.getNbFreeDock() + recordStationField
                    .getNbFreeEDock(), stationName, hour);
            }
            // Parse the JSON string into a generic object0
        } catch (IOException e) {
            log.error("Erreur lecture fichier", e);
        }
        VelibStatResponse velibStatResponse = new VelibStatResponse();
        velibStatResponse.setStationNameHourAverageFreeDockAvailable(calculAverageByStation(stationHourAvailableDockData, fieldFromEachRecords));
        velibStatResponse.setStationNameHourAverageBikeAvailable(calculAverageByStation(stationHourAvailableBikeData, fieldFromEachRecords));
        return velibStatResponse;
    }

    private List<FieldDTO> buildRecordFieldListFromDataSet(String dataSetFileName) throws IOException {
        List<FieldDTO> fieldFromEachRecords = new ArrayList<>();
        BufferedReader bufferedReader = getBufferedReaderFromDataSet(dataSetFileName);
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            // Conversion de chaque ligne du fichier du dataset en objet
            VelibDataSetDTO velibDataSetDTO = objectMapper.readValue(line, VelibDataSetDTO.class);
            List<RecordDTO> records = velibDataSetDTO.getRecords();
            if (!CollectionUtils.isEmpty(records)) {
                // construction de la liste de tous les Fields de l'objet Record pour chaque enregistrement
                // des données des stations de vélibs.
                records.forEach(recordDTO ->
                {
                    FieldDTO fieldDTO = recordDTO.getFields();
                    fieldDTO.setDueDate(recordDTO.getRecordTimestamp());
                    fieldFromEachRecords.add(fieldDTO);

                });
            }
        }
        return fieldFromEachRecords.stream().sorted(Comparator.comparing(FieldDTO::getStationName))
            .collect(Collectors.toList());
    }

    /**
     * @param stationNameHourDataMap, {@link  HashMap<String, Map<Integer, Integer>>}, map contenant le nom de la station en clef et en valeur
     *                                une map avec pour clef l'heure et valeur les élements disponibles( nombre de vélibs ou nombre d'emplacement libre)
     * @param nbElement,              nombre d'element disponible pour une heure donnée ( Ex: vélibs méaniques + vélibs electriques)
     * @param stationName,            nom de la station;
     * @param hour,                   heure de l'enregistrement des données de la station de vélibs.
     */
    private void buildMapStationNameHourElement(Map<String, Map<Integer, Integer>> stationNameHourDataMap,
                                                int nbElement, String stationName, int hour) {
        if (!stationNameHourDataMap.containsKey(stationName))
            stationNameHourDataMap.put(stationName, new HashMap<>());
        // Récupérez la map des heures pour la station donnée
        Map<Integer, Integer> hourAvailableElementMap = stationNameHourDataMap.get(stationName);

        // Mettez à jour le total des elements disponibles pour cette heure de la station
        if (hourAvailableElementMap.containsKey(hour)) {
            // somme totale de elements disponibles sur une heure, pour la même heure et minutes différentes on somme le nombre d'elements
            int totalFreeDock = hourAvailableElementMap.get(hour) + nbElement;
            hourAvailableElementMap.put(hour, totalFreeDock);
        } else {
            // si l'heure n'existe pas dans la map hourData, on initialise une nouvelle entrée dans la map avec
            // l'heure en clef et lle nombre d'elements  disponibles à cette heure.
            hourAvailableElementMap.put(hour, nbElement);
        }
    }

    /**
     * @param stationHourData, map contenant en clef le nom de la station
     *                         et pour valeur une Map contenant en clef l'heure de l'enregistrement et le nombre d'elements disponibles a cette heure
     * @param fieldDTOS,       liste de tous les {@link FieldDTO} contenu dans l'ensemble des {@link  RecordDTO} du dataset en entrée
     * @return Une map contenant pour clef le nom de la station, en valeur une map contenant en clef l'heure et en valeur la moyenne d'éléments disponibles
     */
    private Map<String, Map<Integer, Double>> calculAverageByStation(Map<String, Map<Integer, Integer>> stationHourData, List<FieldDTO> fieldDTOS) {
        log.info("Calcul de la moyenne d'éléments disponibles par heure");
        Map<String, Map<Integer, Double>> stationHourElementAverage = new HashMap<>();
        for (String stationName : stationHourData.keySet()) {
            Map<Integer, Integer> hourData = stationHourData.get(stationName);
            if (!stationHourElementAverage.containsKey(stationName)) {
                stationHourElementAverage.put(stationName, new HashMap<>());
            }

            for (int hour : hourData.keySet()) {
                int totalBikes = hourData.get(hour);
                long totalRecordByHour = getNbRecordByStationNameAndHour(fieldDTOS, stationName, hour);
                // Pour calculer la moyenne pour chaque heure, on divise le nombre total d'elements disponibles à l'heure definie
                // par le nombre d'enregistrement pour cette heure.
                // Exemple: Si pour Station A, dans le dataSet on a 10 enregistrements à 16h, alors moyenne = (Somme des elements disponibles(vélibs ou emplacement libre) des 10 enregistrements) / 10
                double average = (double) totalBikes / totalRecordByHour;
                Map<Integer, Double> hourAvailableDockData = stationHourElementAverage.get(stationName);
                hourAvailableDockData.put(hour, average);
            }
        }
        log.info("Fin du Calcul de la moyenne d'éléments disponibles par heure");
        return stationHourElementAverage;
    }

    /**
     * @param fieldDTOS,   liste de tous les {@link FieldDTO} contenu dans l'ensemble des {@link  RecordDTO} du dataset en entrée
     * @param stationName, nom de la station de vélibs
     * @param hour,        heure de l'enregistrement  du record ( ex: 5h,16h)
     * @return Le nombre total d'enregistrement  pour une station donnée à une certaine heure.
     */
    private long getNbRecordByStationNameAndHour(List<FieldDTO> fieldDTOS, String stationName, int hour) {
        return fieldDTOS.stream().filter(fieldDTO -> fieldDTO.getStationName().equals(stationName)
            && fieldDTO.getDueDate().getHour() == hour).count();
    }

    /**
     * @return {@link  BufferedReader} contenant les données du dataset en entrée.
     * @throws IOException
     */
    private BufferedReader getBufferedReaderFromDataSet(String dataSetFileName) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + dataSetFileName);
        InputStreamReader inputStreamReader;
        inputStreamReader = new InputStreamReader(resource.getInputStream());
        return new BufferedReader(inputStreamReader);
    }


}
