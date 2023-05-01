package a101.phorest.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OffsetDTO {
    private Long limit;
    private Long offset;
    private Long humanCount;
}
