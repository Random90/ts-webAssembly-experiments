/* tslint:disable */
/* eslint-disable */
/**
*/
export class HashMapRust {
  free(): void;
/**
* @param {number} size
* @returns {HashMapRust}
*/
  static new(size: number): HashMapRust;
/**
* @param {string} key
* @param {number} value
*/
  set(key: string, value: number): void;
/**
* @param {string} key
* @returns {number}
*/
  get(key: string): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_hashmaprust_free: (a: number) => void;
  readonly hashmaprust_new: (a: number) => number;
  readonly hashmaprust_set: (a: number, b: number, c: number, d: number) => void;
  readonly hashmaprust_get: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
