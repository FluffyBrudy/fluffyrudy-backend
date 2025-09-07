import { Discussion } from '../entities/discussion.entity';

export class UpdateDiscussionDto {
  content: Discussion['content'];
}
