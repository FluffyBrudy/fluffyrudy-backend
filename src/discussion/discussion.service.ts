import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { IsNull, Repository } from 'typeorm';
import { TAKE_LIMIT } from './constants';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
  ) {}

  async create(userId: User['id'], createDiscussionDto: CreateDiscussionDto) {
    const { content, postId, parentId } = createDiscussionDto;
    const discussion = this.discussionRepository.create({
      content,
      postId,
      ...(parentId ? { parent: { id: parentId } } : {}),
      user: { id: userId },
    });
    return await this.discussionRepository.save(discussion);
  }

  async findAllParent(page = 0, postId: Discussion['postId']) {
    return await this.discussionRepository.find({
      where: { postId, parent: IsNull() },
      relations: ['user'],
      select: {
        id: true,
        postId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          username: true,
        },
      },
      take: TAKE_LIMIT,
      skip: page * TAKE_LIMIT,
      order: { id: 'DESC' },
    });
  }

  async findAllReplies(page = 0, parentId: Discussion['id']) {
    return await this.discussionRepository.find({
      where: { parent: { id: parentId } },
      relations: ['user'],
      select: {
        id: true,
        postId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        parent: { id: true },
        user: {
          username: true,
        },
      },
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
        user: { id: userId },
      },
      { content: updateDiscussionDto.content },
    );
    if (affected === 0) throw new NotFoundException('discussion not found');
    const discussion = await this.discussionRepository.findOneBy({
      id,
      user: { id: userId },
    });
    return discussion;
  }

  async remove(userId: User['id'], id: number) {
    const discussion = await this.discussionRepository.findOne({
      where: { user: { id: userId }, id },
    });
    if (!discussion) throw new NotFoundException('discussion not found');
    const { id: id_ } = await this.discussionRepository.remove(discussion);
    return { id: id_ };
  }
}
