import { cyrb53 } from "./cyrb53_hash";

class LinkedEntry {
    key: string;
    value: string;
    next: LinkedEntry | undefined;
    constructor(key: string, value: string, rest: LinkedEntry | undefined = undefined) {
        this.key = key;
        this.value = value;
        this.next = rest;
    }
}
export class Hashtable {
    table: (LinkedEntry | undefined)[];
    size = 0;
    private loadFactor = 0.75;
    private threshold: number;

    constructor(m = 10) {
        this.table = new Array(m).fill(undefined);
        this.threshold = Math.min(m * this.loadFactor, m - 1);
    }

    public get(key: string): string | undefined {
        const hc = cyrb53(key) % this.table.length;
        let entry: LinkedEntry | undefined = this.table[hc];
        while (entry !== undefined) {
            if (entry.key === key) {
                return entry.value;
            }
            entry = entry.next;
        }
        return undefined;
    }

    public put(key: string, value: string): void {
        const hc = cyrb53(key) % this.table.length;
        let entry: LinkedEntry | undefined = this.table[hc];
        while (entry !== undefined) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
            entry = entry.next;
        }
        this.table[hc] = new LinkedEntry(key, value, this.table[hc]);
        this.size++;
        if (this.size >= this.threshold) {
            this.resize(this.table.length * 2 + 1);
        }
    }

    public remove(key: string): string | undefined {
        const hc = cyrb53(key) % this.table.length;
        let entry: LinkedEntry | undefined = this.table[hc];
        let prev: LinkedEntry | undefined = undefined;
        while (entry !== undefined) {
            if (entry.key === key) {
                if (prev === undefined) {
                    this.table[hc] = entry.next;
                } else {
                    prev.next = entry.next;
                }
                this.size--;
                return entry.value;
            }
            prev = entry;
            entry = entry.next;
        }
        return undefined;
    }

    private resize(newSize: number): void {
        const temp = new Hashtable(newSize);
        for (let n of this.table) {
            while (n !== undefined) {
                temp.put(n.key, n.value);
                n = n.next;
            }
        }
        this.table = temp.table;
        this.threshold = this.loadFactor * this.table.length;
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