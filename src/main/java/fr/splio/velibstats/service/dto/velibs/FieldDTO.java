package fr.splio.velibstats.service.dto.velibs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
public class FieldDTO implements Serializable {
    @JsonProperty(value = "station_State")
    private String stationState;
    private String dist;
    private String densityLevel;
    private int nbbikeOverflow;
    private int maxBikeOverflow;
    @JsonProperty(value = "station_name")
    private String stationName;
    private String kioskState;
    @JsonProperty(value = "station_type")
    private String stationType;
    @JsonProperty(value = "station_code")
    private String stationCode;
    private String creditCard;
    private String station;
    @JsonProperty(value = "nbebike")
    private int nbEBike;
    @JsonProperty(value = "nbbike")
    private int nbBike;
    private ZonedDateTime dueDate;
    private String overflow;
    private int nbEBikeOverflow;
    @JsonProperty(value = "nbfreedock")
    private int nbFreeDock;
    @JsonProperty(value = "nbfreeedock")
    private int nbFreeEDock;
    @JsonProperty(value = "nbdock")
    private int nbDock;
    private List<BigDecimal> geo;
    private String overflowActivation;
}
