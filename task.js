class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }

    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);

   


    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {



    if (this.cache.has(key)) {
      this.cache.delete(key);
    }


    this.cache.set(key, value);

   
    if (this.cache.size > this.capacity) {
      const leastRecentlyUsedKey = this.cache.keys().next().value;
      this.cache.delete(leastRecentlyUsedKey);
    }
  }
}


// Example
const cache = new LRUCache(2);

cache.put("A", 10);
cache.put("B", 20);

console.log(cache.get("A")); // -> 10

cache.put("C", 30);

console.log(cache.get("B")); // -> -1
console.log(cache.get("C")); // -> 30
console.log(cache.get("A")); // -> 10


