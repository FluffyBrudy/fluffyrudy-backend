import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';

@Controller('discussions')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createDiscussionDto: CreateDiscussionDto,
  ) {
    const user = request.user as { id: number; email: string };
    return this.discussionService.create(user.id, createDiscussionDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 0,
    @Query('postId', ParseIntPipe) postId: number,
  ) {
    return this.discussionService.findAll(page, postId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Body() updateDiscussionDto: UpdateDiscussionDto,
  ) {
    const user = request.user as { id: number; email: string };
    return this.discussionService.update(id, user.id, updateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const user = request.user as { id: number; email: string };
    return this.discussionService.remove(user.id, id);
  }
}
