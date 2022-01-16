"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashtable = void 0;
const cyrb53_hash_1 = require("./cyrb53_hash");
class Entry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class Hashtable {
    constructor(m = 10) {
        this.size = 0;
        this.loadFactor = 0.75;
        this.table = new Array(m).fill(undefined);
        this.threshold = Math.min(m * this.loadFactor, m - 1);
    }
    get(key) {
        let hc = (0, cyrb53_hash_1.cyrb53)(key) % this.table.length;
        while (this.table[hc] !== undefined) {
            if (this.table[hc].key === key) {
                return this.table[hc].value;
            }
            hc = (hc + 1) % this.table.length;
        }
        return undefined;
    }
    put(key, value) {
        let hc = (0, cyrb53_hash_1.cyrb53)(key) % this.table.length;
        while (this.table[hc] !== undefined) {
            if (this.table[hc].key === key) {
                this.table[hc].value = value;
                return;
            }
            hc = (hc + 1) % this.table.length;
        }
        if (this.size >= this.table.length) {
            throw new Error("Hashtable is full");
        }
        this.table[hc] = new Entry(key, value);
        this.size++;
        if (this.size > this.threshold) {
            this.resize(this.table.length * 2 + 1);
        }
    }
    resize(newSize) {
        const temp = new Hashtable(newSize);
        for (const entry of this.table) {
            if (entry !== undefined) {
                temp.put(entry.key, entry.value);
            }
        }
        this.table = temp.table;
        this.threshold = this.table.length * this.loadFactor;
    }
}
exports.Hashtable = Hashtable;
const ht = new Hashtable(7);
ht.put("test1", "test1");
ht.put("test2", "test2");
ht.put("test3", "test3");
ht.put("test4", "test4");
ht.put("test5", "test5");
ht.put("test6", "test6");
console.log(ht.table);
//# sourceMappingURL=hashmapOpenAddressing.js.map