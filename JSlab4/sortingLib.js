(function(window) {
  let SortingLib = {};

  SortingLib.bubbleSort = function(arr, order = "asc") {
      let comparisons = 0;
      let swaps = 0;
      let undefinedCount = 0;
      let undefinedElems = [];

      let array = [...arr];
      for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === undefined) {
              undefinedCount++;
              undefinedElems.push(undefined);
              array.splice(i, 1);
          }
      }

      let n = array.length;
      for (let i = 0; i < n; i++) {
          for (let j = 0; j < n - i - 1; j++) {
              comparisons++;
              if ((order === "asc" && array[j] > array[j + 1]) || 
                  (order === "desc" && array[j] < array[j + 1])) {
                  let temp = array[j];
                  array[j] = array[j + 1];
                  array[j + 1] = temp;
                  swaps++;
              }
          }
      }

      array = array.concat(undefinedElems);

      console.log('Bubble Sort: ', order, '\nComparisons: ', comparisons, '\nSwaps: ', swaps);
      if (undefinedCount > 0) {
          console.log('Undefined values ', undefinedCount, '\n\n');
      }
      return array;
  }

  SortingLib.selectionSort = function(arr, order = "asc") {
      let comparisons = 0;
      let swaps = 0;
      let undefinedCount = 0;
      let undefinedElems = [];

      let array = [...arr];
      for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === undefined) {
              undefinedCount++;
              undefinedElems.push(undefined);
              array.splice(i, 1);
          }
      }

      let n = array.length;
      for (let i = 0; i < n - 1; i++) {
          let minIndex = i;
          for (let j = i + 1; j < n; j++) {
              comparisons++;
              if ((order === "asc" && array[j] < array[minIndex]) ||
                  (order === "desc" && array[j] > array[minIndex])) {
                  minIndex = j;
              }
          }
          if (minIndex !== i) {
              let temp = array[i];
              array[i] = array[minIndex];
              array[minIndex] = temp;
              swaps++;
          }
      }

      array = array.concat(undefinedElems);

      console.log('Selection Sort: ', order, '\nComparisons: ', comparisons, '\nSwaps: ', swaps);
      if (undefinedCount > 0) { 
          console.log('Undefined values ', undefinedCount, '\n\n');
      }
      return array;
  }

  SortingLib.insertionSort = function(arr, order = "asc") {
      let comparisons = 0;
      let swaps = 0;
      let undefinedCount = 0;
      let undefinedElems = [];

      let array = [...arr];
      for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === undefined) {
              undefinedCount++;
              undefinedElems.push(undefined);
              array.splice(i, 1);
          }
      }

      let n = array.length;
      for (let i = 1; i < n; i++) {
          let key = array[i];
          let j = i - 1;
          while (j >= 0) {
              comparisons++; 
              if ((order === "asc" && array[j] > key) ||
                  (order === "desc" && array[j] < key)) {
                  array[j + 1] = array[j];
                  j--;
                  swaps++;
              } else {
                  break;
              }
          }
          array[j + 1] = key;
      }

      array = array.concat(undefinedElems);

      console.log('Insertion Sort: ', order, '\nComparisons: ', comparisons, '\nSwaps: ', swaps);
      if (undefinedCount > 0) { 
          console.log('Undefined values ', undefinedCount, '\n\n');
      }
      return array;
  }

  SortingLib.shellSort = function(arr, order = "asc") {
      let comparisons = 0;
      let swaps = 0;
      let undefinedCount = 0;
      let undefinedElems = [];

      let array = [...arr];
      for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === undefined) {
              undefinedCount++;
              undefinedElems.push(undefined);
              array.splice(i, 1);
          }
      }

      let n = array.length;
      let gap = Math.floor(n / 2);

      while (gap > 0) {
          for (let i = gap; i < n; i++) {
              let temp = array[i];
              let j = i;
              while (j >= gap) {
                  comparisons++; 
                  if ((order === "asc" && array[j - gap] > temp) ||
                      (order === "desc" && array[j - gap] < temp)) {
                      array[j] = array[j - gap];
                      j -= gap;
                      swaps++;
                  } else {
                      break;
                  }
              }
              array[j] = temp;
          }
          gap = Math.floor(gap / 2);
      }

      array = array.concat(undefinedElems);

      console.log('Shell Sort: ', order, '\nComparisons: ', comparisons, '\nSwaps: ', swaps);
      if (undefinedCount > 0) { 
          console.log('Undefined values ', undefinedCount, '\n\n');
      }       
      return array;
  }

  SortingLib.quickSort = function(arr, order = "asc") {
      let comparisons = 0;
      let swaps = 0;
      let undefinedCount = 0;
      let undefinedElems = [];

      let array = [...arr];
      for (let i = array.length - 1; i >= 0; i--) {
          if (array[i] === undefined) {
              undefinedCount++;
              undefinedElems.push(undefined);
              array.splice(i, 1);
          }
      }

      function partition(low, high) {
          let pivot = array[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
              comparisons++;
              if ((order === "asc" && array[j] < pivot) ||
                  (order === "desc" && array[j] > pivot)) {
                  i++;
                  let temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
                  swaps++;
              }
          }
          let temp = array[i + 1];
          array[i + 1] = array[high];
          array[high] = temp;
          swaps++;
          return i + 1;
      }

      function quickSortHelper(low, high) {
          if (low < high) {
              let pi = partition(low, high);
              quickSortHelper(low, pi - 1);
              quickSortHelper(pi + 1, high);
          }
      }

      quickSortHelper(0, array.length - 1);

      array = array.concat(undefinedElems);

      console.log('Quick Sort: ', order, '\nComparisons: ', comparisons, '\nSwaps: ', swaps);
      if (undefinedCount > 0) {
          console.log('Undefined values ', undefinedCount, '\n\n');
      }           

      return array;
  }

  window.SortingLib = SortingLib;
})(window);
