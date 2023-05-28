package fr.splio.velibstats.web.rest.velibs.response;

import fr.splio.velibstats.service.VelibStatService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.ResponseUtil;

import java.util.Optional;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping(value = "/api/velib-stats")
public class VelibStatResource {


    public static final String DATASET_TXT = "velib_dataset.txt";
    private final VelibStatService velibStatService;

    /**
     * {@code GET /velib-stats/process} : get all velibs stats with all the details
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all velibs stats.
     */
    @GetMapping("/process")
    public ResponseEntity<VelibStatResponse> readResourceFile() {
        return ResponseUtil.wrapOrNotFound(Optional.of(velibStatService.getVelibStatResponse(DATASET_TXT)));
    }
}
