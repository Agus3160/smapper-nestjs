/**
 * Generic interface for mapping objects from one type to another,
 * optionally based on a context parameter.
 *
 * @template S - The source type to map from.
 * @template D - The destination type to map to.
 * @template P - Optional context parameter type that influences mapping behavior.
 */
export interface IMapper<S = unknown, D = unknown, P = any> {
  /**
   * Maps a source object `S` to a destination object `D`
   * Optional context can be used to affect the mapping process
   *
   * @param source The source object to map
   * @param context Optional context that can affect the mapping
   * @returns The mapped destination object
   */
  map(source: S, context?: P): D;
}
