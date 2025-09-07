import { Discussion } from '../entities/discussion.entity';

export class CreateDiscussionDto {
  content: Discussion['content'];
  postId: Discussion['postId'];
}
