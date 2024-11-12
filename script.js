"use strict";

const fs = require("fs"); // Import the fs module to write output to a file
let inputString = ""; // Variable to store input data
let currentLine = 0; // Tracks the current line being processed in the input

// Collect input data sent to the process
process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

// After all input data is received, split it into lines and initiate processing
process.stdin.on("end", (_) => {
  inputString = inputString.trim().split("\n");
  main();
});

// Reads the next line of input data
function readLine() {
  return inputString[currentLine++];
}

// Function to calculate the minimum power required to merge all cells
function minPower(cells) {
  // Initialize a min-heap to store cell values
  const minHeap = new MinHeap();

  // Insert each cell value into the min-heap
  for (const cell of cells) {
    minHeap.insert(cell);
  }

  let totalPower = 0; // Variable to keep track of the total power required

  // Continue merging until only one cell remains
  while (minHeap.size() > 1) {
    // Extract the two smallest values
    const first = minHeap.removeMin();
    const second = minHeap.removeMin();

    // Calculate the merge cost for these two values
    const mergeCost = first + second;
    totalPower += mergeCost; // Add the merge cost to the total power

    // Insert the merged cell back into the min-heap
    minHeap.insert(mergeCost);
  }

  return totalPower; // Return the total power required for all merges
}

// Min-Heap class to efficiently retrieve the smallest element
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Returns the number of elements in the heap
  size() {
    return this.heap.length;
  }

  // Inserts a new value into the heap
  insert(value) {
    this.heap.push(value);
    this._heapifyUp(); // Re-adjusts the heap structure after insertion
  }

  // Removes and returns the smallest value in the heap
  removeMin() {
    if (this.size() === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this._heapifyDown(); // Re-adjusts the heap structure after removal
    }
    return min;
  }

  // Moves the last element up to its correct position to maintain heap order
  _heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  // Moves the root element down to its correct position to maintain heap order
  _heapifyDown() {
    let index = 0;
    const length = this.size();
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallest]
      ) {
        smallest = leftChildIndex;
      }
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallest]
      ) {
        smallest = rightChildIndex;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

// Main function to handle input and call the calculation function
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH); // Creates a write stream for the output file

  const cellsCount = parseInt(readLine().trim(), 10); // Reads the number of cells

  let cells = []; // Array to store cell values

  for (let i = 0; i < cellsCount; i++) {
    const cellsItem = parseInt(readLine().trim(), 10); // Reads each cell value
    cells.push(cellsItem); // Adds the value to the cells array
  }

  const result = minPower(cells); // Calls minPower to calculate the minimum power needed

  ws.write(result + "\n"); // Writes the result to the output file
  ws.end(); // Closes the write stream
}
