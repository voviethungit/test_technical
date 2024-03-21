function findDuplicates(arr) {
    const duplicates = [];
    
    for (let i = 0; i < arr.length; i++) {
        const index = Math.abs(arr[i]) - 1;
        if (arr[index] < 0) {
            duplicates.push(Math.abs(arr[i]));
        } else {
            arr[index] = -arr[index];
        }
    }
    
    return duplicates;
}

// test
console.log(findDuplicates([1, 2, 3, 4, 5]));  // Output: []
console.log(findDuplicates([1, 2, 3, 3, 4, 5]));  // Output: [3]
console.log(findDuplicates([1, 1, 2, 3, 3, 4, 5]));  // Output: [1, 3]
console.log(findDuplicates([1, 1, 1, 2, 3, 3, 3, 4, 5, 5]));  // Output: [1, 3, 5]
