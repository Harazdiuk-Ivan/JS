let array_ = [];
for (let i = 0; i < 100; i++) {
    array_.push(Math.floor(Math.random() * 100));
}

console.log("МАСИВ (БЕЗ undefined)");

console.log("\nЗА ЗРОСТАННЯМ:");
SortingLib.bubbleSort(array_.slice(), "asc");
SortingLib.selectionSort(array_.slice(), "asc");
SortingLib.insertionSort(array_.slice(), "asc");
SortingLib.shellSort(array_.slice(), "asc");
SortingLib.quickSort(array_.slice(), "asc");

console.log("\nЗА СПАДАННЯМ:");
SortingLib.bubbleSort(array_.slice(), "desc");  
SortingLib.selectionSort(array_.slice(), "desc");
SortingLib.insertionSort(array_.slice(), "desc");
SortingLib.shellSort(array_.slice(), "desc");
SortingLib.quickSort(array_.slice(), "desc");

let array_s = [];
for (let i = 0; i < 100; i++) {
    if (i % 10 === 0) {
        array_s.push(undefined); 
    } else {
        array_s.push(Math.floor(Math.random() * 1000)); 
    }
  }

  console.log("\n\nМАСИВ (З undefined)");

  console.log("\nЗА ЗРОСТАННЯМ:");
  SortingLib.bubbleSort(array_s.slice(), "asc");
  SortingLib.selectionSort(array_s.slice(), "asc");
  SortingLib.insertionSort(array_s.slice(), "asc");
  SortingLib.shellSort(array_s.slice(), "asc");
  SortingLib.quickSort(array_s.slice(), "asc");

  console.log("\nЗА СПАДАННЯМ:");
  SortingLib.bubbleSort(array_s.slice(), "desc");
  SortingLib.selectionSort(array_s.slice(), "desc");
  SortingLib.insertionSort(array_s.slice(), "desc");
  SortingLib.shellSort(array_s.slice(), "desc");
  SortingLib.quickSort(array_s.slice(), "desc");
