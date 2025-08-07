import { Injectable } from "@nestjs/common";
import { MAPPER_METADATA_KEY } from "./constant";

/**
 * Marks a class as a mapper and as injectable. (The class should implement the `IMapper` interface.)
 */
export function Mapper(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MAPPER_METADATA_KEY, true, target);
    Injectable()(target);
  };
}

/**
 * Utility function to check if a class is a mapper
 * @param target Class to check
 * @returns Verifies if the class is a mapper
 */
export function isMapper(target: any): boolean {
  return Reflect.getMetadata(MAPPER_METADATA_KEY, target) === true;
}
