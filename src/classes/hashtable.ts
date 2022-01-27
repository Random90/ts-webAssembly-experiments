import { cyrb53 } from "./cyrb53_hash.js";
import { simpleHash } from "./simpleHash.js";

export abstract class AbstractHashtable {
  getHash: (key: string) => number;

  constructor(hash = "cyrb53") {
    if (hash === "cyrb53") {
      this.getHash = cyrb53;
    } else if (hash === "simple") {
      this.getHash = simpleHash;
    } else {
      throw new Error("Invalid hash function");
    }
  }
}
