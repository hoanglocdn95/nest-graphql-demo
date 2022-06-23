import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet()

    return this.petsRepository.save(newPet); // save newPet into repository
  }

  async findAll(): Promise<Pet[]> {
    // const pet = new Pet();
    // pet.id = 1;
    // pet.name = 'Kikun';
    // pet.type = 'Corgi';
    // return [pet];
    // // return Promise.resolve([pet]);

    return this.petsRepository.find(); // SELECT pet
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneBy({ id: id }); // find by Id
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
