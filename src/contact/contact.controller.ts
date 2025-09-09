import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  findAll(@Param('page', ParseIntPipe) page: number) {
    return this.contactService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(+id);
  }
}
