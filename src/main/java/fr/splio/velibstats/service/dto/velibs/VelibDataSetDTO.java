package fr.splio.velibstats.service.dto.velibs;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class VelibDataSetDTO implements Serializable {

    private int nhits;
    private List<RecordDTO> records;
}
