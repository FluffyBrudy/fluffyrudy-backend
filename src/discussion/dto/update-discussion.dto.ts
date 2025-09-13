import { IsString, Length } from 'class-validator';
import { Discussion } from '../entities/discussion.entity';
import { DISCUSSION_CONTENT } from 'src/constants/schema';

export class UpdateDiscussionDto {
  @IsString()
  @Length(DISCUSSION_CONTENT.MIN, DISCUSSION_CONTENT.MAX)
  content: Discussion['content'];
}
