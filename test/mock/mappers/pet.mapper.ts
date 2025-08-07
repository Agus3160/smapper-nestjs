import { Mapper } from "../../../src/decorator";
import { IMapper } from "../../../src/mapper.interface";
import { DoctorPetDto, Pet, PetMapperCtxType, PublicPetDto } from "../pet";

@Mapper()
export class PetMapper
  implements IMapper<Pet, DoctorPetDto | PublicPetDto, PetMapperCtxType>
{
  map(source: Pet, context: "public"): PublicPetDto;
  map(source: Pet, context: "doctor"): DoctorPetDto;
  map(
    source: Pet,
    context: PetMapperCtxType = "public"
  ): PublicPetDto | DoctorPetDto {
    if (context === "public") {
      return { id: source.id, name: source.name, type: source.type };
    } else {
      return {
        id: source.id,
        name: source.name,
        type: source.type,
        vaccines: source.vaccines,
      };
    }
  }
}
