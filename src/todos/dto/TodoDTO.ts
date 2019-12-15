import { ApiModelProperty } from '@nestjs/swagger';

export class TodoDTO {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    task: string;

    @ApiModelProperty()
    complete: boolean;

    @ApiModelProperty({ enum: [1, 2, 3] })
    priority: Priority;
}

export enum Priority {
    Low = 1,
    Med = 2,
    High = 3,
}
