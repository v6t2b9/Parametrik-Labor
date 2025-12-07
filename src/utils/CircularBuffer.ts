/**
 * CircularBuffer - Efficient fixed-size FIFO buffer
 *
 * Replaces array shift() operations (O(n)) with O(1) indexed access.
 * Used for audio history tracking and adaptive normalization.
 */
export class CircularBuffer<T> {
  private buffer: T[];
  private head: number = 0;
  private size: number = 0;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  /**
   * Add item to buffer (FIFO - overwrites oldest if full)
   */
  push(item: T): void {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.size < this.capacity) {
      this.size++;
    }
  }

  /**
   * Get item at index (0 = oldest, size-1 = newest)
   */
  get(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    const actualIndex = (this.head - this.size + index + this.capacity) % this.capacity;
    return this.buffer[actualIndex];
  }

  /**
   * Get current number of items
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Get maximum capacity
   */
  getCapacity(): number {
    return this.capacity;
  }

  /**
   * Check if buffer is full
   */
  isFull(): boolean {
    return this.size === this.capacity;
  }

  /**
   * Check if buffer is empty
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Get all items as array (oldest to newest)
   */
  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.size; i++) {
      const item = this.get(i);
      if (item !== undefined) {
        result.push(item);
      }
    }
    return result;
  }

  /**
   * Get newest item
   */
  getNewest(): T | undefined {
    return this.size > 0 ? this.get(this.size - 1) : undefined;
  }

  /**
   * Get oldest item
   */
  getOldest(): T | undefined {
    return this.size > 0 ? this.get(0) : undefined;
  }

  /**
   * Clear all items
   */
  clear(): void {
    this.head = 0;
    this.size = 0;
  }
}
