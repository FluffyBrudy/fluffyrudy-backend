import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  findAll(page?: number) {
    const pageNum = typeof page === 'number' && page >= 0 ? page : 0;
    return this.contactRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
      skip: pageNum * 50,
    });
  }

  findOne(id: number) {
    return this.contactRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.contactRepository.delete({ id });
  }
}
