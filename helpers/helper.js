exports.binarySearchNumbers = function (arr, x) {

    let start = 0, end = arr.length - 1;

    // Iterate while start not meets end
    while (start <= end) {

        // Find the mid index
        let mid = Math.floor((start + end) / 2);


        // If element is present at mid, return True
        if (arr[mid] === x) return mid;

        // Else look in left or right half accordingly
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return false;
}


exports.binarySearchStrings = (arr, x) => {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);

        let res = x.localeCompare(arr[m]);

        // Check if x is present at mid
        if (res == 0)
            return m;

        // If x greater, ignore left half
        if (res > 0)
            l = m + 1;

        // If x is smaller, ignore right half
        else
            r = m - 1;
    }

    return false;
}

exports.sorter = (a, b) => {
    const first = typeof a === 'number';
    const second = typeof b === 'number';
    if (first && second) {
        return a - b;
    } else if (first && !second) {
        return -1;
    } else if (!first && second) {
        return 1;
    } else {
        return a > b ? 1 : -1;
    }
};

exports.seperateList = (arr) => {
    const onlyNumbers = arr.filter(n => typeof n === 'number');
    return onlyNumbers
}