// Two Sums
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
export function twoSum(nums, target) {
    let res = [];
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            res = [map.get(comp), i];
        }
        map.set(nums[i], i)
    }
    return res;
};


// Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// 1 Open brackets must be closed by the same type of brackets.
// 2 Open brackets must be closed in the correct order.
// 3 Every close bracket has a corresponding open bracket of the same type.
export function isValid(s) {
    const mapping = {
        ")": "(",
        "}": "{",
        "]": "["
    }
    let res = true;
    const stack = []

    for (const char of s) {
        if (Object.values(mapping).includes(char)) {
            stack.push(char);
        } else if (mapping.hasOwnProperty(char)) {
            if (!stack.length || mapping[char] !== stack.pop()) {
                res = false;
            }
        }
    }
    return res;
};


// Merge Intervals
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
export function merge(intervals) {
    let prev = intervals[0];
    const merged = [];

    for (let i = 1; i < intervals.length; i++) {
        let current = intervals[i];
        if (current[0] <= prev[1]) {
            prev[1] = Math.max(current[1], prev[1]);
        } else {
            merged.push(prev);
            prev = current;
        }
    }
    merged.push(prev);
    return merged;
};


// Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without duplicate characters.
export function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let set = new Set();
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left])
            left++;
        }
        set.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
};


// Binary Tree Level Order Traversal
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

export function levelOrder(root) {
    let queue = [root];
    let res = [];

    while(queue.length && root) {
        let valLevel = [];
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let curNode = queue.shift();
            valLevel.push(curNode.val);
            if (curNode.left) queue.push(curNode.left);
            if (curNode.right) queue.push(curNode.right);
        }
        res.push(valLevel);
    }
    return res;
};


// Valid Anagram 
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
export function isAnagram(s, t) {
    let res = true;
    if (s.length !== t.length) {
        res = false;
    } else {
        let map = new Map();
        for ( let char of s) {
            map.set(char, (map.get(char) || 0) + 1);
        }
        for (let char of t) {
            if (!map.has(char) || map.get(char) == 0) {
                res = false;
            }
            if (res) {
                map.set(char, map.get(char) - 1);
            }
        }
    }
    return res;
};


// Search in a 2D Matrix 
// You are given an m x n integer matrix matrix with the following two properties:
//   Each row is sorted in non-decreasing order.
//   The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.
// You must write a solution in O(log(m * n)) time complexity.
export function searchMatrix(matrix, target) {
    const [rows, cols] = [matrix.length, matrix[0].length];
    let [left, right] = [0, rows * cols - 1];
    let res = false;

    while (left <= right && !res) {
        let mid = (left + right) >> 1;
        const [row, col] = [Math.floor(mid / cols), mid % cols];
        const guess = matrix[row][col];

        if (guess == target) {
            res = true;
        }
        if (guess > target) {
            right = mid - 1;
        }
        if (guess < target) {
            left = mid + 1;
        }
    }
    return res;
};

// Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.
export function hasCycle(head) {
    let cur = head;
    let prev = head;
    let res = false;

    while (cur && cur.next && !res) {
        cur = cur.next.next;
        prev = prev.next;
        res = cur === prev ? true : false;
    }
    return res;
};

// Valid Palindrome 
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.
export function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g,'');
    let left = 0;
    let right = s.length - 1;
    let res = true;

    while (left < right) {
        if (s[left] !== s[right]) {
            res = false;
        }
        left++;
        right--;
    }
    return res;
} 

// You are given an array A of integers. Find the maximum number of non-intersecting segments of length 2 (two adjacent elements), such that segments have an equal sum.
// For example, given A = [10, 1, 3, 1, 2, 2, 1, 0, 4], there are three non-intersecting segments, each whose sum is equal to 4: (1, 3), (2, 2), (0,4). Another three non-intersecting segments are: (3, 1), (2, 2), (0,4).
export function maxNumberOfNonIntersrctingSegments(array) {
    const map = new Map();
    for (let i = 0; i < array.length - 1; i++) {
        let sum = array[i] + array[i + 1];
        map.set(sum, (map.get(sum) || 0) + 1);
        if (array[i + 1] === array[i - 1]) {
            map.set(sum, (map.get(sum) || 0) - 1);
        }
    }
    return Math.max(...map.values());
}

// const executeFunc = limitFunc(console.log, 3)

// executeFunc("Hello, World!") // => Hello, World!
// executeFunc("Hello, World!") // => Hello, World!
// executeFunc("Hello, World!") // => Hello, World!
// executeFunc("Hello, World!") // => Throw new Error
export const limitFunc = (func, limit) => {
    let count = 0;
    return (...params) => {
        if (count < limit) {
            count++;
            return func(...params);
        } else {
            return "Error";
        }
    }
}

export const func = (arr1, arr2) => {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const intersection = arr1.filter(x => set2.has(x));
    const onlyFirst = arr1.filter(x => !set2.has(x));
    const onlySecond = arr2.filter(x => !set1.has(x));

    return {
        onlyFirst,
        onlySecond,
        intersection,
    };
};

// // Example
// const q = queue();
// q.push(10);
// q.push(20);
// q.push(30);
export const queue = () => {
    let head = null;
    let tail = null;
    let size = 0;

    // Node structure
    const createNode = (value) => ({value, next: null});

    const push = (value) => {
        const node = createNode(value);
        if (tail) {
            tail.next = node;
        }
        tail = node;
        if (!head) {
            head = node;
        }
        size++;
    };

    const pop = () => {
        if (!head) return undefined; // empty queue
        const value = head.value;
        head = head.next;
        if (!head) { // queue became empty
            tail = null;
        }
        size--;
        return value;
    };

    const peek = () => (head ? head.value : undefined);

    return {
        get head() {
            return head ? head.value : null;
        },
        get tail() {
            return tail ? tail.value : null;
        },
        get size() {
            return size;
        },
        push,
        pop,
        peek
    };
};

//sleep function
export const sleep = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Limit")
            resolve();
        }, 500)
    })
};