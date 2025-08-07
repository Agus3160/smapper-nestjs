import { Type } from "@nestjs/common";
import { IMapper } from "./mapper.interface";

/**
 * Options for the `MapperModule`
 */
export interface MapperModuleOptions {
  /**
   * Paths patterns to scan for mappers
   */
  paths?: string[];

  /**
   * Injectable mappers that implments the `IMapper` interface and uses the `@Mapper` decorator
   */
  profiles?: Type<IMapper>[];

  isGlobal?: boolean;
}

export interface MapperModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<MapperModuleOptions> | MapperModuleOptions;
  inject?: any[];
}
