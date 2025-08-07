import { Test, TestingModule } from "@nestjs/testing";
import { MapperModule } from "../src/mapper.module";
import { PetMapper } from "./mock/mappers/pet.mapper";
import { Pet } from "./mock/pet";

describe("MapperModule", () => {
  let petMapper: PetMapper;
  let module: TestingModule;
  const petMock: Pet = {
    id: 1,
    name: "John",
    type: "dog",
    vaccines: ["v1", "v2"],
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MapperModule.forRoot({
          paths: [`${__dirname}/mock/mappers/*.mapper.{ts,js}`],
        }),
      ],
    }).compile();
  });

  it("should compile with forRoot", async () => {
    expect(module).toBeDefined();
  });

  it("should get a defined mapper", async () => {
    petMapper = module.get<PetMapper>(PetMapper);
    expect(petMapper).toBeDefined();
  });

  it("should map a petdto for doctors", async () => {
    const result = petMapper.map(petMock, "doctor");
    expect(result.vaccines).toBe(petMock.vaccines);
  });

  it("should map a petdto for public", async () => {
    const result = petMapper.map(petMock, "public");
    //@ts-ignore
    expect(result.vaccines).toBeUndefined();
  });
});
