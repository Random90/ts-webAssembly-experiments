import { AbstractHashtable } from "./hashtable";

class Entry {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
export class Hashtable extends AbstractHashtable{
    table: Entry[];
    size = 0;
    hash: string;

    private loadFactor = 0.75;
    private threshold: number;

    constructor(m = 10, hash = 'cyrb53') {
        super(hash);
        this.table = new Array(m).fill(undefined);
        this.threshold = Math.min(m * this.loadFactor, m - 1);
        this.hash = hash;
    }

    public get(key: string): string | number | undefined {
        let hc = this.getHash(key) % this.table.length;
        while (this.table[hc] !== undefined) {
            if (this.table[hc].key === key) {
                return this.table[hc].value;
            }
            hc = (hc + 1) % this.table.length;
        }
        return undefined;
    }

    public put(key: string, value: string): void {
        let hc = this.getHash(key) % this.table.length;
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

