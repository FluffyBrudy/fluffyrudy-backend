import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetDiscussionsParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postId: number;
}
