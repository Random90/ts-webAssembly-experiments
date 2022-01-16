import * as wordsDictionary from './data/words_dictionary.json';
import * as htoa from './hashmapOpenAddressing'
import * as htsc from './hashmapSeparateChaining'

let t0: number;
let t1: number;

const perfectSize = Object.entries(wordsDictionary).length / 0.75 + 1;

// -------- openAddressing
t0 = performance.now();
const ht1 = new htoa.Hashtable(perfectSize);
Object.entries(wordsDictionary).forEach(([key, value]) => {
    ht1.put(key, value);
});
t1 = performance.now();
console.log(`OpenAddressing build: ${t1 - t0} ms`);

t0 = performance.now();
Object.entries(wordsDictionary).forEach(([key]) => {
    ht1.get(key);
});
t1 = performance.now();
console.log(`OpenAddressing access: ${t1 - t0} ms`);

// -------- separateChaining

t0 = performance.now();
const ht2 = new htsc.Hashtable(perfectSize);
Object.entries(wordsDictionary).forEach(([key, value]) => {
    ht2.put(key, value);
});
t1 = performance.now();
console.log(`SeparateChaining build: ${t1 - t0} ms`);

t0 = performance.now();
Object.entries(wordsDictionary).forEach(([key]) => {
    ht2.get(key);
});
t1 = performance.now();
console.log(`SeparateChaining access: ${t1 - t0} ms`);


// -------- js object

t0 = performance.now();
const ht3 = {} as { [key: string]: string | number };
Object.entries(wordsDictionary).forEach(([key, value]) => {
    ht3[key] = value;
});
t1 = performance.now();
console.log(`JsObject build: ${t1 - t0} ms`);

t0 = performance.now();
Object.entries(wordsDictionary).forEach(([key]) => {
    ht3[key];
});
t1 = performance.now();
console.log(`JsObject access: ${t1 - t0} ms`);

// -------- js map

t0 = performance.now();
const ht4 = new Map<string, string | number>();
Object.entries(wordsDictionary).forEach(([key, value]) => {
    ht4.set(key, value);
});
t1 = performance.now();
console.log(`JsMap build: ${t1 - t0} ms`);

t0 = performance.now();
Object.entries(wordsDictionary).forEach(([key]) => {
    ht4.get(key);
});
t1 = performance.now();
console.log(`JsMap access: ${t1 - t0} ms`);