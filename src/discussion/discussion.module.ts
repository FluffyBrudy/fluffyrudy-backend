import { Module } from '@nestjs/common';
// import { DiscussionService } from './discussion.service';
// import { DiscussionController } from './discussion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discussion])],
  // controllers: [DiscussionController],
  // providers: [DiscussionService],
})
export class DiscussionModule {}
