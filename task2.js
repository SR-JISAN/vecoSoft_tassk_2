class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }

    this.capacity = capacity;
    this.cache = new Map();

    // Dummy head and tail nodes
    this.head = new Node(null, null);
    this.tail = new Node(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Add a node just before the tail.
  // This position represents Most Recently Used.
  addToMRU(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;

    this.tail.prev.next = node;
    this.tail.prev = node;
  }

  // Remove a node from the linked list.
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Move an existing node to MRU position.
  moveToMRU(node) {
    this.removeNode(node);
    this.addToMRU(node);
  }

  // Remove and return the Least Recently Used node.
  removeLRU() {
    const lruNode = this.head.next;

    this.removeNode(lruNode);

    return lruNode;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key);

    // Accessing the key makes it most recently used
    this.moveToMRU(node);

    return node.value;
  }

  put(key, value) {
    // If key already exists
    if (this.cache.has(key)) {
      const node = this.cache.get(key);

      // Update value
      node.value = value;

      // Make it most recently used
      this.moveToMRU(node);

      return;
    }

    // Create a new node
    const newNode = new Node(key, value);

    // Store in Hash Map
    this.cache.set(key, newNode);

    // Add to MRU position
    this.addToMRU(newNode);

    // Capacity exceeded
    if (this.cache.size > this.capacity) {
      const lruNode = this.removeLRU();

      // Remove from Hash Map
      this.cache.delete(lruNode.key);
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

Output: 10 - 1;
30;
10;
