import { cyrb53 } from "./cyrb53_hash";

class Entry {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
export class Hashtable {
    table: Entry[];
    size = 0;

    private loadFactor = 0.75;
    private threshold: number;

    constructor(m = 10) {
        this.table = new Array(m).fill(undefined);
        this.threshold = Math.min(m * this.loadFactor, m - 1);
    }

    public get(key: string): string | undefined {
        let hc = cyrb53(key) % this.table.length;
        while (this.table[hc] !== undefined) {
            if (this.table[hc].key === key) {
                return this.table[hc].value;
            }
            hc = (hc + 1) % this.table.length;
        }
        return undefined;
    }

    public put(key: string, value: string): void {
        let hc = cyrb53(key) % this.table.length;
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

        if (this.size >= this.threshold) {
            this.resize(this.table.length * 2 + 1);
        }
    }

    private resize(newSize: number): void {
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

const ht = new Hashtable(7);
ht.put("test1", "test1");
ht.put("test2", "test2");
ht.put("test3", "test3");
ht.put("test4", "test4");
ht.put("test5", "test5");
ht.put("test6", "test6");
console.log(ht.table);