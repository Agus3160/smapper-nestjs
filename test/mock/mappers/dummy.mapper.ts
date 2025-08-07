import { Mapper } from "../../../src/decorator";
import { IMapper } from "../../../src/mapper.interface";
import { DummyDto, Dummy, DummyMapperCtxType } from "../dummy";

@Mapper()
export class DummyMapper
  implements IMapper<Dummy, DummyDto, DummyMapperCtxType>
{
  map(source: Dummy, context: DummyMapperCtxType): DummyDto {
    let fullname = `${source.name} ${source.lastName}`;
    if (context.toUpperCase) fullname = fullname.toUpperCase();
    const dto = new DummyDto();
    dto.fullname = fullname;
    dto.age = source.age;
    return dto;
  }
}
