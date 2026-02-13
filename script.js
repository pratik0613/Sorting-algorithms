// Algorithm Definitions
const algorithms = {
    mergeSort: {
        name: "Merge Sort",
        description: "Divides array into halves, recursively sorts them, and merges back together.",
        complexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
            space: "O(n)"
        },
        execute: function(arr) {
            const helper = function(arr, left, right) {
                if (left >= right) return;
                const mid = Math.floor((left + right) / 2);
                helper(arr, left, mid);
                helper(arr, mid + 1, right);
                merge(arr, left, mid, right);
            };

            const merge = function(arr, left, mid, right) {
                const leftArr = arr.slice(left, mid + 1);
                const rightArr = arr.slice(mid + 1, right + 1);
                let i = 0, j = 0, k = left;

                while (i < leftArr.length && j < rightArr.length) {
                    if (leftArr[i] <= rightArr[j]) {
                        arr[k++] = leftArr[i++];
                    } else {
                        arr[k++] = rightArr[j++];
                    }
                }

                while (i < leftArr.length) {
                    arr[k++] = leftArr[i++];
                }
                while (j < rightArr.length) {
                    arr[k++] = rightArr[j++];
                }
            };

            const original = [...arr];
            helper(arr, 0, arr.length - 1);
            return {
                result: arr,
                original: original,
                details: "Sorted array using divide and conquer merge sort approach"
            };
        }
    },

    quickSort: {
        name: "Quick Sort",
        description: "Divides array using a pivot element, recursively sorts partitions.",
        complexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)",
            space: "O(log n)"
        },
        execute: function(arr) {
            const helper = function(arr, low, high) {
                if (low < high) {
                    const pi = partition(arr, low, high);
                    helper(arr, low, pi - 1);
                    helper(arr, pi + 1, high);
                }
            };

            const partition = function(arr, low, high) {
                const pivot = arr[high];
                let i = low - 1;

                for (let j = low; j < high; j++) {
                    if (arr[j] < pivot) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                return i + 1;
            };

            const original = [...arr];
            helper(arr, 0, arr.length - 1);
            return {
                result: arr,
                original: original,
                details: "Sorted array using divide and conquer quick sort approach with pivot"
            };
        }
    },

    heapSort: {
        name: "Heap Sort",
        description: "Divides array into heap structure, extracts elements from heap to sort using divide and conquer heap operations.",
        complexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
            space: "O(1)"
        },
        execute: function(arr) {
            const heapify = function(arr, n, i) {
                let largest = i;
                const left = 2 * i + 1;
                const right = 2 * i + 2;

                if (left < n && arr[left] > arr[largest]) {
                    largest = left;
                }
                if (right < n && arr[right] > arr[largest]) {
                    largest = right;
                }
                if (largest !== i) {
                    [arr[i], arr[largest]] = [arr[largest], arr[i]];
                    heapify(arr, n, largest);
                }
            };

            const original = [...arr];
            const n = arr.length;

            // Build max heap
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(arr, n, i);
            }

            // Extract elements from heap one by one
            for (let i = n - 1; i > 0; i--) {
                [arr[0], arr[i]] = [arr[i], arr[0]];
                heapify(arr, i, 0);
            }

            return {
                result: arr,
                original: original,
                details: "Sorted array using heap sort approach with divide and conquer heapify operations"
            };
        }
    },

    binarySearch: {
        name: "Binary Search",
        description: "Searches in a sorted array by dividing the search interval in half.",
        complexity: {
            best: "O(1)",
            average: "O(log n)",
            worst: "O(log n)",
            space: "O(1)"
        },
        execute: function(arr, target) {
            const sorted = [...arr].sort((a, b) => a - b);
            
            let left = 0, right = sorted.length - 1;
            let found = false;
            let position = -1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (sorted[mid] === target) {
                    found = true;
                    position = mid;
                    break;
                } else if (sorted[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            return {
                result: found ? `Found at position ${position}` : "Not found",
                original: arr,
                details: found ? 
                    `Target ${target} found at index ${position} in sorted array: [${sorted.join(', ')}]` :
                    `Target ${target} not found in array: [${sorted.join(', ')}]`
            };
        }
    },


    searchRotated: {
        name: "Search in Rotated Array",
        description: "Searches in a rotated sorted array by identifying which half is sorted.",
        complexity: {
            best: "O(1)",
            average: "O(log n)",
            worst: "O(log n)",
            space: "O(1)"
        },
        execute: function(arr, target) {
            let left = 0, right = arr.length - 1;
            let found = false;
            let position = -1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (arr[mid] === target) {
                    found = true;
                    position = mid;
                    break;
                }

                // Check which half is sorted
                if (arr[left] <= arr[mid]) {
                    // Left half is sorted
                    if (target >= arr[left] && target < arr[mid]) {
                        right = mid - 1;
                    } else {
                        left = mid + 1;
                    }
                } else {
                    // Right half is sorted
                    if (target > arr[mid] && target <= arr[right]) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }
            }

            return {
                result: found ? `Found at position ${position}` : "Not found",
                original: arr,
                details: found ? 
                    `Target ${target} found at index ${position}` :
                    `Target ${target} not found in rotated array`
            };
        }
    },

    majorityElement: {
        name: "Majority Element",
        description: "Finds element appearing more than n/2 times using divide and conquer.",
        complexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
            space: "O(log n)"
        },
        execute: function(arr) {
            const findMajority = function(arr, left, right) {
                if (left === right) return arr[left];

                const mid = Math.floor((left + right) / 2);
                const leftMajority = findMajority(arr, left, mid);
                const rightMajority = findMajority(arr, mid + 1, right);

                if (leftMajority === rightMajority) return leftMajority;

                const leftCount = arr.slice(left, right + 1).filter(x => x === leftMajority).length;
                const rightCount = arr.slice(left, right + 1).filter(x => x === rightMajority).length;

                return leftCount > rightCount ? leftMajority : rightMajority;
            };

            const majority = findMajority(arr, 0, arr.length - 1);
            const count = arr.filter(x => x === majority).length;

            return {
                result: count > arr.length / 2 ? majority : "No majority element",
                original: arr,
                details: count > arr.length / 2 ? 
                    `Majority element is ${majority} (appears ${count} times out of ${arr.length})` :
                    `No element appears more than ${Math.floor(arr.length / 2)} times`
            };
        }
    },

    medianSorted: {
        name: "Median of Two Sorted Arrays",
        description: "Finds median of two sorted arrays using binary search and divide & conquer.",
        complexity: {
            best: "O(log(min(m, n)))",
            average: "O(log(min(m, n)))",
            worst: "O(log(min(m, n)))",
            space: "O(1)"
        },
        execute: function(arr1, arr2 = null) {
            if (!arr2) {
                const sorted = arr1.slice().sort((a, b) => a - b);
                const n = sorted.length;
                const median = n % 2 === 0 ? 
                    (sorted[n/2 - 1] + sorted[n/2]) / 2 : 
                    sorted[Math.floor(n/2)];
                return {
                    result: median,
                    original: arr1,
                    details: `Median of [${arr1.join(', ')}] is ${median}`
                };
            }

            // If second array provided, find median of both
            const merged = [...arr1, ...arr2].sort((a, b) => a - b);
            const n = merged.length;
            const median = n % 2 === 0 ? 
                (merged[n/2 - 1] + merged[n/2]) / 2 : 
                merged[Math.floor(n/2)];

            return {
                result: median,
                original: arr1,
                details: `Median of [${arr1.join(', ')}] and [${arr2.join(', ')}] is ${median}`
            };
        }
    },

    maxSubarray: {
        name: "Maximum Subarray (Kadane's Algorithm)",
        description: "Finds contiguous subarray with largest sum using divide and conquer approach.",
        complexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)",
            space: "O(1)"
        },
        execute: function(arr) {
            let maxCurrent = arr[0];
            let maxGlobal = arr[0];
            let startIndex = 0, endIndex = 0, tempStart = 0;

            for (let i = 1; i < arr.length; i++) {
                if (arr[i] > maxCurrent + arr[i]) {
                    maxCurrent = arr[i];
                    tempStart = i;
                } else {
                    maxCurrent += arr[i];
                }

                if (maxCurrent > maxGlobal) {
                    maxGlobal = maxCurrent;
                    startIndex = tempStart;
                    endIndex = i;
                }
            }

            const subarray = arr.slice(startIndex, endIndex + 1);
            return {
                result: maxGlobal,
                original: arr,
                details: `Maximum subarray: [${subarray.join(', ')}] with sum = ${maxGlobal}`
            };
        }
    },

    countInversions: {
        name: "Count Inversions",
        description: "Counts pairs (i,j) where i<j but arr[i]>arr[j] using merge sort approach.",
        complexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
            space: "O(n)"
        },
        execute: function(arr) {
            let invCount = 0;

            const mergeAndCount = function(arr, temp, left, mid, right) {
                let i = left, j = mid + 1, k = left;

                while (i <= mid && j <= right) {
                    if (arr[i] <= arr[j]) {
                        temp[k++] = arr[i++];
                    } else {
                        temp[k++] = arr[j++];
                        invCount += (mid - i + 1);
                    }
                }

                while (i <= mid) temp[k++] = arr[i++];
                while (j <= right) temp[k++] = arr[j++];

                for (let i = left; i <= right; i++) {
                    arr[i] = temp[i];
                }
            };

            const mergeSortAndCount = function(arr, temp, left, right) {
                if (left < right) {
                    const mid = Math.floor((left + right) / 2);
                    mergeSortAndCount(arr, temp, left, mid);
                    mergeSortAndCount(arr, temp, mid + 1, right);
                    mergeAndCount(arr, temp, left, mid, right);
                }
            };

            const temp = new Array(arr.length);
            mergeSortAndCount(arr, temp, 0, arr.length - 1);

            return {
                result: invCount,
                original: arr,
                details: `Total inversions in array: ${invCount}`
            };
        }
    }
};

// Algorithm information mapping
const algorithmInfo = {
    mergeSort: "Merge Sort recursively divides the array into two halves, sorts them independently, and then merges them. This ensures O(n log n) complexity in all cases.",
    quickSort: "Quick Sort selects a pivot and partitions the array. It's efficient with average O(n log n) but can degrade to O(n²) with poor pivot selection.",
    heapSort: "Heap Sort builds a max heap from the array and repeatedly extracts the maximum element. It ensures O(n log n) in all cases with O(1) space complexity.",
    binarySearch: "Binary Search works on sorted arrays by repeatedly dividing the search space in half. Search value input is required.",
    searchRotated: "This algorithm searches in a rotated sorted array. It determines which half is properly sorted and eliminates half the search space. Search value input is required.",
    majorityElement: "Finds an element that appears more than n/2 times in the array using a divide and conquer approach.",
    medianSorted: "Uses divide and conquer to find the median value of an array. For even-length arrays, returns the average of two middle elements.",
    maxSubarray: "Also known as Kadane's Algorithm, it finds the contiguous subarray with the maximum sum using dynamic programming approach.",
    countInversions: "Counts pairs where an earlier element is greater than a later element. Uses merge sort approach to achieve O(n log n)."
};

// Event listeners
document.getElementById('algorithm').addEventListener('change', function() {
    const algorithm = this.value;
    const searchValueGroup = document.getElementById('searchValueGroup');
    
    // Show search value input for algorithms that need it
    if (algorithm === 'binarySearch' || algorithm === 'searchRotated') {
        searchValueGroup.style.display = 'flex';
    } else {
        searchValueGroup.style.display = 'none';
    }

    // Update algorithm info
    if (algorithm) {
        document.getElementById('algorithmInfo').innerHTML = `<p>${algorithmInfo[algorithm]}</p>`;
        
        const algo = algorithms[algorithm];
        const complexityHTML = `
            <p><strong>Best Case:</strong> ${algo.complexity.best}</p>
            <p><strong>Average Case:</strong> ${algo.complexity.average}</p>
            <p><strong>Worst Case:</strong> ${algo.complexity.worst}</p>
            <p><strong>Space Complexity:</strong> ${algo.complexity.space}</p>
        `;
        document.getElementById('complexityInfo').innerHTML = complexityHTML;
    }
});

function executeAlgorithm() {
    const algorithmSelect = document.getElementById('algorithm');
    const arrayInput = document.getElementById('arrayInput');
    const searchValue = document.getElementById('searchValue');

    if (!algorithmSelect.value) {
        showError("Please select an algorithm");
        return;
    }

    if (!arrayInput.value.trim()) {
        showError("Please enter an array");
        return;
    }

    try {
        // Parse array input
        const arr = arrayInput.value
            .split(',')
            .map(x => x.trim())
            .map(x => isNaN(x) ? x : parseFloat(x));

        const algorithm = algorithmSelect.value;
        const algo = algorithms[algorithm];
        let result;

        // Execute algorithm
        if (algorithm === 'binarySearch' || algorithm === 'searchRotated') {
            if (!searchValue.value) {
                showError("Please enter a search value");
                return;
            }
            result = algo.execute(arr, parseFloat(searchValue.value));
        } else {
            result = algo.execute(arr);
        }

        // Display results
        displayResults(result, algo);
    } catch (error) {
        showError("Invalid input: " + error.message);
    }
}

function displayResults(result, algo) {
    const resultDiv = document.getElementById('result');
    const executionDiv = document.getElementById('executionDetails');

    // Format result
    let resultText = typeof result.result === 'object' ? 
        JSON.stringify(result.result) : 
        result.result;

    resultDiv.innerHTML = `<p><strong>Result:</strong> ${resultText}</p>`;
    executionDiv.innerHTML = `<p>${result.details}</p>`;

    // Add success styling
    [resultDiv, executionDiv].forEach(div => {
        div.parentElement.classList.remove('error');
        div.parentElement.classList.add('success');
    });
}

function clearResults() {
    document.getElementById('algorithm').value = '';
    document.getElementById('arrayInput').value = '';
    document.getElementById('searchValue').value = '';
    document.getElementById('algorithmInfo').innerHTML = '<p>Select an algorithm to see its details</p>';
    document.getElementById('complexityInfo').innerHTML = `
        <p>Best Case: --</p>
        <p>Average Case: --</p>
        <p>Worst Case: --</p>
        <p>Space Complexity: --</p>
    `;
    document.getElementById('result').innerHTML = '<p>Results will appear here</p>';
    document.getElementById('executionDetails').innerHTML = '<p>Execution details will appear here</p>';
    document.getElementById('searchValueGroup').style.display = 'none';

    // Remove styling
    document.querySelectorAll('.result-box').forEach(box => {
        box.classList.remove('success', 'error');
    });
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: #dc3545;"><strong>Error:</strong> ${message}</p>`;
    resultDiv.parentElement.classList.add('error');
}

// Initialize on page load
window.addEventListener('load', function() {
    document.getElementById('algorithm').value = '';
    document.getElementById('searchValueGroup').style.display = 'none';
});
