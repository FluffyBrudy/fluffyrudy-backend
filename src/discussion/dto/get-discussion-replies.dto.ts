import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetRepliesParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  parentId: number;
}
