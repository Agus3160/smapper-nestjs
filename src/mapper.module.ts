import { MapperModuleOptions, MapperModuleAsyncOptions } from "./types";
import { DynamicModule, Logger, Module, Provider, Type } from "@nestjs/common";
import { sync as fgScan } from "fast-glob";
import { isMapper } from "./decorator";
import { IMapper } from "./mapper.interface";

export class MapperModule {
  private static readonly logger = new Logger(MapperModule.name);

  static forRoot({
    paths = [],
    profiles = [],
    isGlobal = false,
  }: MapperModuleOptions): DynamicModule {
    const scanned = this.scanAndImportMappers(paths);
    this.verifyProfiles(profiles);
    const allProviders: Provider[] = [...profiles, ...scanned];
    if (allProviders.length === 0) this.logger.warn("No mappers found");
    return {
      global: isGlobal,
      module: MapperModule,
      providers: [...profiles, ...scanned],
      exports: [...profiles, ...scanned],
    };
  }

  static async forRootAsync(
    options: MapperModuleAsyncOptions
  ): Promise<DynamicModule> {
    const opts: MapperModuleOptions = await options.useFactory(
      ...(options.inject || [])
    );
    this.verifyProfiles(opts.profiles || []);
    const scanned = opts.paths?.length
      ? MapperModule.scanAndImportMappers(opts.paths)
      : [];
    const providers: Provider[] = [...(opts.profiles || []), ...scanned];
    if (providers.length === 0) this.logger.warn("No mappers found");
    return {
      global: opts.isGlobal,
      module: MapperModule,
      providers,
      exports: providers,
    };
  }

  private static scanAndImportMappers = (paths: string[]) => {
    const mappers: Type<IMapper>[] = [];
    const normalizedPaths = paths.map((path) => path.replace(/\\/g, "/"));
    const files = fgScan(normalizedPaths, { onlyFiles: true });
    for (const file of files) {
      const module = require(file);
      for (const exported of Object.values(module)) {
        if (typeof exported === "function" && isMapper(exported)) {
          mappers.push(exported as Type<IMapper>);
        }
      }
    }
    return mappers;
  };

  private static verifyProfiles(profiles: Type<IMapper>[]) {
    return profiles.map((profile) => {
      if (!isMapper(profile))
        throw new Error(
          `Mapper ${profile.name} is not decorated with @Mapper()`
        );
    });
  }
}
