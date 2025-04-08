function generateArray(size, withUndefined = false) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        if (withUndefined && Math.random() > 0.8) {
            arr.push(undefined);
        } else {
            arr.push(Math.floor(Math.random() * 100));
        }
    }
    return arr;
}

function arrayToString(arr) {
    return arr.map(item => item === undefined ? 'undefined' : item).join(" ");
}

function printSortResults(sortFunction, arr, order, name) {
    console.log(`\nArray for ${name}:`);
    console.log(arrayToString(arr));
    console.log(`Sorted array ${name}:`);
    let sortedArr = sortFunction(arr, order);
    console.log(arrayToString(sortedArr));
}

(function() {
    console.log("МАСИВ (БЕЗ undefined)");

    let arrBubble = generateArray(100);
    printSortResults(SortingLib.bubbleSort, arrBubble.slice(), "asc", "Bubble sort");

    let arrSelection = generateArray(100);
    printSortResults(SortingLib.selectionSort, arrSelection.slice(), "asc", "Selection sort");

    let arrInsertion = generateArray(100);
    printSortResults(SortingLib.insertionSort, arrInsertion.slice(), "desc", "Insertion sort");

    let arrShell = generateArray(100);
    printSortResults(SortingLib.shellSort, arrShell.slice(), "desc", "Shell sort");

    let arrQuick = generateArray(100);
    printSortResults(SortingLib.quickSort, arrQuick.slice(), "asc", "Quick sort");

    console.log("\n\n\nМАСИВ (З undefined)");

    let arrBubbleUndef = generateArray(100, true);
    printSortResults(SortingLib.bubbleSort, arrBubbleUndef.slice(), "asc", "Bubble sort with undefined");

    let arrSelectionUndef = generateArray(100, true);
    printSortResults(SortingLib.selectionSort, arrSelectionUndef.slice(), "asc", "Selection sort with undefined");

    let arrInsertionUndef = generateArray(100, true);
    printSortResults(SortingLib.insertionSort, arrInsertionUndef.slice(), "asc", "Insertion sort with undefined");

    let arrShellUndef = generateArray(100, true);
    printSortResults(SortingLib.shellSort, arrShellUndef.slice(), "asc", "Shell sort with undefined");

    let arrQuickUndef = generateArray(100, true);
    printSortResults(SortingLib.quickSort, arrQuickUndef.slice(), "asc", "Quick sort with undefined");
})();
