import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Discussion } from '../entities/discussion.entity';
import { DISCUSSION_CONTENT } from 'src/constants/schema';

export class CreateDiscussionDto {
  @IsString()
  @Length(DISCUSSION_CONTENT.MIN, DISCUSSION_CONTENT.MAX)
  content: Discussion['content'];

  @IsNumber()
  postId: Discussion['postId'];

  @IsOptional()
  @IsNumber()
  parentId: Discussion['id'];
}
