package fr.splio.velibstats.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.splio.velibstats.service.dto.velibs.FieldDTO;
import fr.splio.velibstats.web.rest.TestUtil;
import fr.splio.velibstats.web.rest.velibs.response.VelibStatResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = {
    ObjectMapper.class,
    ResourceLoader.class,
    VelibStatService.class
})
class VelibStatServiceTest {


    private VelibStatService velibStatService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ResourceLoader resourceLoader;

    @BeforeEach
    public void init() {
        this.velibStatService = new VelibStatService(resourceLoader, TestUtil.createObjectMapper());
    }

    @Test
    public void getVelibStatResponse_nb_free_bike_and_nb_free_dock_average_available() {
        VelibStatResponse velibStatResponse = this.velibStatService.getVelibStatResponse("velib_dataset_test.json");

        // Nom de la station de vélib qu'on veut tester.
        String stationToTest = "Favart - Italiens";

        // test moyenne des vélos disponibles pour la station Favart Italiens
        Map<Integer, Double> mapHourStationMoyenneAvailableBike = velibStatResponse.getStationNameHourAverageBikeAvailable().get(stationToTest);
        // Moyenne attendu de de vélo disponible
        Double moyenneBikeAvailableExpected = 2.0;
        // heure à laquelle on veut savoir le nombre de de vélibs disponisbles en moyenne.
        int hourToTest = 5;
        assertEquals(mapHourStationMoyenneAvailableBike.get(hourToTest), moyenneBikeAvailableExpected);

        ///////////////////////////////////////////////////////////////

        // test moyenne des emplacements libres disponibles pour la station Favart Italiens

        Map<Integer, Double> mapHourStationMoyenneAvailableFreeDock = velibStatResponse.getStationNameHourAverageFreeDockAvailable().get(stationToTest);
        // Moyenne attendu des emplacements libres
        Double moyenneFreeDockAvailableExpected = 10.0;
        // heure à laquelle on veut savoir le nombre de de vélibs disponisbles en moyenne.
        assertEquals(mapHourStationMoyenneAvailableFreeDock.get(hourToTest), moyenneFreeDockAvailableExpected);
    }

    @Test
    public void getRecordFieldsFromDataSet() throws IOException {
        List<FieldDTO> fieldDTOList = this.velibStatService.buildRecordFieldListFromDataSet("velib_dataset_test.json");
        assertEquals(fieldDTOList.size(), 10);
        assertEquals(fieldDTOList.get(0).getStationName(), "Bibliothèque Nationale");
        assertEquals(fieldDTOList.get(0).getNbBike(), 3);
    }
}
