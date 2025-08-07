export class Dummy {
  name!: string;
  lastName!: string;
  age!: number;
  password!: string;
}

export class DummyDto {
  fullname!: string;
  age!: number;
}

export type DummyMapperCtxType = {
  toUpperCase: boolean;
};
