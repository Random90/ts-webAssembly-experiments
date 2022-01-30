mod utils;

use std::collections::HashMap;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct HashMapRust {
    data: HashMap<String, u8>, // u8 is specific just for this example using wordDictionary
}

#[wasm_bindgen]
impl HashMapRust {
    pub fn new(size: usize) -> HashMapRust {
        let mut data = HashMap::new();
        data.reserve(size);
        return HashMapRust { data };
    }

    pub fn set(&mut self, key: String, value: u8) {
        self.data.insert(key, value);
    }
    pub fn get(&self, key: String) -> u8 {
        return self.data.get(&key).unwrap_or(&0).clone();
    }
}
