import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { GetDiscussionsParamDto } from './dto/get-discussions.dto';
import { IdParamDto, PaginationQueryDto } from './dto/shared.dto';
import { GetRepliesParamDto } from './dto/get-discussion-replies.dto';

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

  @Get(':postId')
  findAll(
    @Param() param: GetDiscussionsParamDto,
    @Query() query: PaginationQueryDto,
  ) {
    return this.discussionService.findAllParent(query.page, param.postId);
  }

  @Patch(':id')
  update(
    @Param() param: IdParamDto,
    @Body() updateDiscussionDto: UpdateDiscussionDto,
    @Req() request: Request,
  ) {
    const user = request.user as { id: number; email: string };
    return this.discussionService.update(
      param.id,
      user.id,
      updateDiscussionDto,
    );
  }

  @Delete(':id')
  remove(@Param() param: IdParamDto, @Req() request: Request) {
    const user = request.user as { id: number; email: string };
    return this.discussionService.remove(user.id, param.id);
  }

  @Get('reply/:parentId')
  getReplies(
    @Param() param: GetRepliesParamDto,
    @Query() query: PaginationQueryDto,
  ) {
    return this.discussionService.findAllReplies(query.page, param.parentId);
  }
}
