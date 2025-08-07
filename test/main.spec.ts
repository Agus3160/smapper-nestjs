import { Test, TestingModule } from "@nestjs/testing";
import { MapperModule } from "../src/mapper.module";
import { DummyMapper } from "./mock/mappers/dummy.mapper";
import { Dummy } from "./mock/dummy";

describe("MapperModule", () => {
  let dummyMapper: DummyMapper;
  let module: TestingModule;

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
    dummyMapper = module.get<DummyMapper>(DummyMapper);
    expect(dummyMapper).toBeDefined();
  });

  it("should map a dummy", async () => {
    const dummyMock: Dummy = {
      age: 30,
      name: "John",
      lastName: "Doe",
      password: "password",
    };
    const dummy = dummyMapper.map(dummyMock, { toUpperCase: true });
    expect(dummy.fullname).toBe("JOHN DOE");
  });
});
