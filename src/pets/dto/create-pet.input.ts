import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsInt } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @IsInt()
  @Field((type) => Int)
  ownerId: number;
}
