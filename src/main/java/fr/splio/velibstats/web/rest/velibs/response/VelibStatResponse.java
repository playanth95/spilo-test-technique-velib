package fr.splio.velibstats.web.rest.velibs.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VelibStatResponse {
    // Map contenant à la fois le nom de la station ainsi qu'une map contenant l'heure et le nombre moyen de vélibs disponibles à cette heure
    Map<String, Map<Integer, Double>> stationNameHourAverageBikeAvailable;
    // Map contenant à la fois le nom de la station ainsi qu'une map contenant l'heure et le nombre moyen d'emplacement  disponibles à cette heure
    Map<String, Map<Integer, Double>> stationNameHourAverageFreeDockAvailable;
}
