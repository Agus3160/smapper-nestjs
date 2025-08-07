export class Pet {
  id!: number;
  name!: string;
  type!: string;
  vaccines!: string[];
}

export class PublicPetDto {
  id!: number;
  name!: string;
  type!: string;
}

export class DoctorPetDto {
  id!: number;
  name!: string;
  type!: string;
  vaccines!: string[];
}

export type PetMapperCtxType = "public" | "doctor";
