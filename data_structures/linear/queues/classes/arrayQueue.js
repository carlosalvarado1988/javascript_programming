export class ArrayQueue {
  // arrayQueue (ArrayDeque) in java
  // enqueue
  // dequeue
  // peek
  // isEmpty
  // isFull -- in javascript arrays are dynamic, but we can mock this behavior checking a pointer towards the length
  // use two pointers to set the front and rear

  // ES6 Classes - private members
  #items = [];
  #front = 0;
  #rear = 0;
  #count = 0;
  #capacity = 0;

  constructor(length) {
    this.#capacity = length;
    this.#items = new Array(length);
  }

  // public getter, accessed as a property
  get isFull() {
    return this.#count === this.#capacity;
  }

  enqueue(item) {
    if (this.isFull) {
      //   throw new Error("Queue reached max capacity");
      //   its thrown to: --> try {} catch (e) {
      //     console.error(e);
      //   }
      // currently a log to continue the exercise
      console.error("Error: Queue reached max capacity");
      return;
    }

    console.log("this.#items", this.#items);
    // this.#items[this.#rear++] = item; // add item in the rear and increment rear++
    // with ciruclar aray
    this.#items[this.#rear] = item;
    this.#rear = this.#circularArrayTargetIndex(this.#rear, this.#items.length);
    /* this could be:
    this.#rear = (this.#rear + 1) % this.#items.length
     */
    this.#count++; // increment count of values
  }

  dequeue() {
    const item = this.#items[this.#front];
    this.#items[this.#front] = null;
    this.#front = this.#circularArrayTargetIndex(
      this.#front,
      this.#items.length
    );
    this.#count--;
    return item;
  }

  peek() {
    console.log("this.#items", this.#items);
    return this.#items[this.#rear - 1];
    // rear is like lenght, we need to disccount 1 to target an index position
  }

  // private method
  #circularArrayTargetIndex(index, lenght) {
    /*
    CIRCULAR ARRAY
    [ (0), (1), (2), (3) ]
                    rear -->
    the goal is to map each additional index to a index within the boudaries.
    Look at this pattern:
    new index -> target in circle
    (4) -> 0     (8) -> 0
    (5) -> 1     (9) -> 1
    (6) -> 2     (10) -> 2
    (7) -> 3     (11) -> 3

    this give us a FORMULA for the map:
    *  every new index devided by array length, then the reminder is the target
        reminder = (new index % array length)
        target = (this.#rear + 1) % (this.#items.length)

        note: isFull validation will prevent overriding items.
        the circular array algoritm is the key here to use the empty spaces
    */
    return (index + 1) % lenght;
  }
}
