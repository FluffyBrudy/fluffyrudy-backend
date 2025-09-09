import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { Repository } from 'typeorm';
import { TAKE_LIMIT } from './constants';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
  ) {}

  async create(userId: User['id'], createDiscussionDto: CreateDiscussionDto) {
    const discussion = this.discussionRepository.create({
      ...createDiscussionDto,
      userId,
    });
    return await this.discussionRepository.save(discussion);
  }

  async findAll(page = 0, postId: Discussion['postId']) {
    return await this.discussionRepository.find({
      where: { postId },
      take: TAKE_LIMIT,
      skip: page * TAKE_LIMIT,
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    userId: User['id'],
    updateDiscussionDto: UpdateDiscussionDto,
  ) {
    const { affected } = await this.discussionRepository.update(
      {
        id,
        userId,
      },
      { content: updateDiscussionDto.content },
    );
    if (affected === 0) throw new NotFoundException('discussion not found');
    return { id, userId, content: updateDiscussionDto.content };
  }

  async remove(userId: User['id'], id: number) {
    const discussion = await this.discussionRepository.findOne({
      where: { userId, id },
    });
    if (!discussion) throw new NotFoundException('discussion not found');
    return await this.discussionRepository.remove(discussion);
  }
}
