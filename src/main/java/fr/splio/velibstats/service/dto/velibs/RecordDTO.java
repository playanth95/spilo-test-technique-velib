package fr.splio.velibstats.service.dto.velibs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Getter
@Setter
@EqualsAndHashCode
public class RecordDTO implements Serializable {
    @JsonProperty(value = "record_timestamp")
    private ZonedDateTime recordTimestamp;
    private FieldDTO fields;
}
