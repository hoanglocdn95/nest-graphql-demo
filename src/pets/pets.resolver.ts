import { OwnersService } from './../owners/owners.service';
import { Owner } from './../owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { PetsService } from './pets.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Pet } from './pets.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(
    private petsService: PetsService,
    private ownersService: OwnersService,
  ) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation((returns) => Pet)
  createPet(@Args('input') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Query((returns) => Pet)
  getPet(@Args('idPet', { type: () => Int }) idPet: number): Promise<Pet> {
    return this.petsService.findOne(idPet);
  }
}
