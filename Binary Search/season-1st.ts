
// ✅ 🔴 ⚪️ ----------------- 1. binary search basic implementation -------------------
function binarySearch(nums: number[], target: number) {
    let i = 0;
    let j = nums.length;

    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return mid
        }
        else if (target > nums[mid]) {
            i = mid + 1
        }
        else {
            j = mid - 1
        }
    }
    return -1
}
// let nums = [-11, -7, -4, 0, 5, 11, 15, 21]
// let target = 11
// console.log(binarySearch(nums, target));



// ✅ 🔴 ⚪️ ---------------------- 2. order agnostic binary search -----------------------
function orderAgnosticBinarySearch(nums: number[], target: number) {
    let asc;
    let desc;

    // check for array is ascending or descending
    if (nums[0] < nums[nums.length - 1]) {
        asc = true
    }
    else if (nums[0] > nums[nums.length - 1]) {
        desc = true
    }

    let i = 0;
    let j = nums.length;

    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return mid
        }
        if (asc) {
            if (target > nums[mid]) {
                i = mid + 1
            }
            else if (target < nums[mid]) {
                j = mid - 1
            }
        }
        if (desc) {
            if (target > nums[mid]) {
                j = mid - 1
            }
            else if (target < nums[mid]) {
                i = mid + 1
            }
        }
    }
    return -1
}
// let nums = [35, 22, 18, 10, 5, -5, -11, -21]
// let target = 180
// console.log(orderAgnosticBinarySearch(nums, target));




// ✅ 🔴 ⚪️ ---------------- 3. First and Last occurrence of an Element ------------------
function searchIndex(nums: number[], target: number, findFirstIndex: boolean) {
    let ans = -1
    let i = 0;
    let j = nums.length;

    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            ans = mid
            if (findFirstIndex) {
                j = mid - 1
            } else {
                i = mid + 1
            }
        }
        else if (target > nums[mid]) {
            i = mid + 1
        }
        else {
            j = mid - 1
        }
    }
    return ans
}

function firstLastOccurrence(nums: number[], target: number) {
    // if array is empty
    if (!nums.length) {
        return [-1, -1]
    }
    const firstOcc = searchIndex(nums, target, true)
    const lastOcc = searchIndex(nums, target, false)
    return [firstOcc, lastOcc]
}
// let nums = [5, 7, 7, 8, 8, 10]
// let target = 8
// let nums = [1, 3, 5, 5, 5, 5, 7, 123, 125]
// let target = 7
// let nums = [8]
// let target = 8
// console.log(firstLastOccurrence(nums, target))




// ✅ 🔴 ⚪️ -------- 4. Count number of occurrences (or frequency) in a sorted array - binary search, hashing ---------





/* 🔥 🔴 ⚪️ ✅ 🚀 --------- Imp.....  5.Find the Rotation Count in Rotated Sorted array -----------
Consider an array of distinct numbers sorted in increasing order. The array has been rotated (clockwise) k number of times. Given such an array, find the value of k.

Input : arr[] = {15, 18, 2, 3, 6, 12}
Output: 2
Explanation : Initial array must be {2, 3,
6, 12, 15, 18}. We get the given array after 
rotating the initial array twice.

Input : arr[] = {7, 9, 11, 12, 5}
Output: 4

Input: arr[] = {7, 9, 11, 12, 15};
Output: 0
*/

// first approch - linear search
function numberOfTimesRotated(nums: number[]) {
    // find index of smallest element.it is number of rotaion
    let smallest = nums[0]
    let min_index = 0
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < smallest) {
            smallest = nums[i]
            min_index = i
        }
    }

    return min_index
}

// second approch - binary search
function numberOfTimesRotatedBS(nums: number[]) {
    let n = nums.length - 1
    let str = 0
    let end = nums.length - 1

    // we need to retrun index of smallest element in order ot find number rof rotation.
    while (str <= end) {
        let mid = Math.floor(str + (end - str) / 2)

        //if first element is mid or last element is mid then simply use modulo so it never goes out of bound.
        let prev = (mid - 1 + n) % n
        let next = (mid + 1) % n
        // if prev and next elements are greater than the perticular element.then element is smallest.
        if (nums[mid] <= nums[prev] && nums[mid] <= nums[next]) {
            return mid
        }
        /* in the rotated array, there are always two posibility i.e. 
           one part is sorted and another part is un sorted. 
           after finding mid, we have to go toward unsorted part. 
           our ans lies here.
        */
        else if (nums[mid] >= nums[str]) {
            // just compare first and last element with mid. you will find sorted and unsorted part.
            str = mid + 1
        }
        else if (nums[mid] <= nums[end]) {
            end = mid - 1
        }

        return 0
    }
}
// let nums = [15, 18, 2, 3, 6, 12]
// let nums = [7, 9, 11, 12, 15]
// console.log(numberOfTimesRotatedBS(nums))




// ✅ 🔴 ⚪️ --------------- 6. Find an Element in a Rotated Sorted Array ------------------
function binarySearchHelper(nums: number[], target: number, str: number, end: number) {
    let i = str;
    let j = end;

    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return mid
        }
        else if (target > nums[mid]) {
            i = mid + 1
        }
        else {
            j = mid - 1
        }
    }
    return -1
}

function searchInRotatedArray(nums: number[], target: number) {
    /* 
        👉 first find find minimum element. 
        👉 Rotated list having two part according to their sorting nature
            ([index(first), index(min value)-1], [index(min value), index(last)]) 
        👉 then apply binary search two times in this rotated list
    */
    let minIndex = numberOfTimesRotatedBS(nums)
    let a = binarySearchHelper(nums, target, 0, minIndex - 1)
    let b = binarySearchHelper(nums, target, minIndex, nums.length - 1)
    if (a === -1 && b !== -1) {
        return b
    } else if (a !== -1 && b === -1) {
        return a
    } else {
        return -1
    }
}

// let nums = [15, 18, 25, 2, 3, 6, 12]
// let target = 100
// console.log(searchInRotatedArray(nums, target))




// ✅ 🔴 ⚪️ --------------- 7. Searching in a Nearly Sorted Array -------------------
function SearchNearlySoarted(nums: number[], target: number) {
    let i = 0;
    let j = nums.length - 1;

    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return mid
        }
        if (mid > 0 && target == nums[mid - 1]) {
            return mid - 1
        }
        if (mid < nums.length - 1 && target == nums[mid + 1]) {
            return mid + 1
        }
        else if (target > nums[mid]) {
            i = mid + 2
        }
        else {
            j = mid - 2
        }
    }
    return -1
}

// let nums = [10, 3, 40, 20, 50, 80, 70]
// let target = 40
// let nums = [10, 3, 40, 20, 50, 80, 70]
// let target = 90
// console.log(searchInRotatedArray(nums, target))




// ✅ 🔴 ⚪️ ----------- 8. floor of element - number is just less than or equal to element -----------
function floor(nums: number[], target: number) {
    let i = 0;
    let j = nums.length - 1;

    let ans = -1
    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return nums[mid]
        }
        // if element is less than target. it may be a possible solution
        else if (target > nums[mid]) {
            ans = nums[mid]
            i = mid + 1
        }
        else {
            j = mid - 1
        }
    }
    return ans
}

// ✅ 🔴 ⚪️ ------------ 9. ceil of element - number is just greater than or equal to element -----------
function ceil(nums: number[], target: number) {
    let i = 0;
    let j = nums.length - 1;

    let ans = -1
    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == nums[mid]) {
            return nums[mid]
        }
        else if (target > nums[mid]) {
            i = mid + 1
        }
        // if element is greater than target. it may be a possible solution
        else {
            ans = nums[mid]
            j = mid - 1
        }
    }
    return ans
}
// nums = [2,3,5,9,14,16,18]
// target = 14
// console.log(floor(nums, target))
// console.log(ceil(nums, target))




// ✅ 🔴 ⚪️ --------------- 10. Next Alphabetical Element ~ (ceil concept) ---------------
function nextAlphabet(strArr: string[], target: string) {
    let i = 0;
    let j = strArr.length - 1;

    let ans: number | string = -1
    while (i <= j) {
        let mid = Math.floor(i + (j - i) / 2);
        if (target == strArr[mid]) {
            return strArr[mid]
        }
        else if (target > strArr[mid]) {
            i = mid + 1
        }
        // if element is greater than target. it may be a possible solution
        else {
            ans = strArr[mid]
            j = mid - 1
        }
    }
    return ans
}
// let nums = ['a', 'c', 'f', 'j', 'k', 'p', 'w']
// let target = "b"
// console.log(nextAlphabet(nums, target))




// ✅ 🔴 ⚪️ --------------- 11. position in infinite sorted array -----------------
function infinteArraySerach(nums: number[], target: number) {
    let start = 0
    let end = 1
    while (target > nums[end]) {
        let temp = end + 1    // this is my new start
        // double the size
        // end = previous end + sizeofbox * 2
        end = end + (end - start + 1) * 2
        start = temp
    }
    // start -> 0 -> 2 -> 6 -> 14
    // end -> 1 -> 5 -> 13 -> 32

    return binarySearchHelper(nums, target, start, end)
}
// let nums = [3, 5, 7, 9, 10, 90, 100, 130, 140, 160, 170, 200, 250, 310, 320, 400, 410, 420, 500, 550, 546, 588, 635, 645, 689, 700, 712, 738, 823, 888, 889, 934, 950, 960, 990, 1002, 1004, 1130, 1345, 1450, 1700, 1884, 1900, 2100, 2203, 2400]
// let target = 645
// console.log(infinteArraySerach(nums, target))





// ✅ 🔴 ⚪️ --------------- 12. Index of First Occurance in Sorted Infinite Array -----------------
// infinte array logic + first occurance logic
function findFirstIndex(nums: number[], target: number) {
    let start = 0
    let end = 1
    while (target > nums[end]) {
        let temp = end + 1
        end = end + (end - start + 1) * 2
        start = temp
    }

    let ans = -1
    // binary search logic
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (target == nums[mid]) {
            ans = mid
            end = mid - 1
        }
        else if (target > nums[mid]) {
            start = mid + 1
        }
        else {
            end = mid - 1
        }
    }
    return ans
}
// let nums = [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]
// let target = 1
// console.log(findFirstIndex(nums, target))





// ✅ 🔴 ⚪️ 🔥 ---------------- 13. Minimum Difference Element in a Sorted Array -----------------
function minDiffElement(nums: number[], target: number) {
    let str = 0
    let end = nums.length - 1

    if (target < nums[0]) {
        return nums[0]
    }
    if (target > nums[nums.length - 1]) {
        return nums[nums.length - 1]
    }

    while (str <= end) {
        let mid = Math.floor(str + (end - str) / 2)
        if (target == nums[mid]) {
            return target
        }
        else if (target > nums[mid]) {
            str = mid + 1
        }
        else if (target < nums[mid]) {
            end = mid - 1
        }
    }
    /* 👉 if don't find the value with binary search. 
        at the end we get neighbour (start and end) of 
        that element. this the feature of binary search.

        a[str] is the ceiling of target
        a[end] is the floor of target
    */

    // Return the element whose difference with target is smaller.
    if (Math.abs(target - nums[str]) < Math.abs(target - nums[end])) {
        return nums[str]
    }
    else {
        return nums[end]
    }
}
// let nums = [2, 5, 9, 13, 20, 25]
// let target = 4
// console.log(minDiffElement(nums, target))
