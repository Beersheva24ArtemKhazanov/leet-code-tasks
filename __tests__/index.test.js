import { twoSum, isValid, merge, lengthOfLongestSubstring, levelOrder, isAnagram, searchMatrix, hasCycle, isPalindrome,     maxNumberOfNonIntersrctingSegments, limitFunc } from "../index.js";
import { describe, expect, test } from '@jest/globals';

class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

describe('leetCode Tests', () => {
    function arrayToTree(arr) {
        let root = null;
        if (arr.length) {
            root = new TreeNode(arr[0]);
            const queue = [root];
            let i = 1;
            while (queue.length && i < arr.length) {
                const current = queue.shift();
                if (arr[i] !== null && arr[i] !== undefined) {
                    current.left = new TreeNode(arr[i]);
                    queue.push(current.left);
                }
                i++;
                if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
                    current.right = new TreeNode(arr[i]);
                    queue.push(current.right);
                }
                i++;
            }
        }
        return root;
    }

function arrayToCyclicLinkedList(arr, pos) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    let cycleEntry = pos === 0 ? head : null;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
        if (i === pos) cycleEntry = current;
    }

    if (pos >= 0) current.next = cycleEntry;
    return head;
}

    test('Two Sums test', () => {
        expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
        expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
        expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });

    test('Valid Parentheses test', () => {
        expect(isValid("()")).toBeTruthy();
        expect(isValid("()[]{}")).toBeTruthy();
        expect(isValid("(]")).toBeFalsy();
        expect(isValid("([])")).toBeTruthy();
    });

    test('Merge Intervals test', () => {
        expect(merge([[1, 3], [2, 6], [8, 10], [15, 18]])).toEqual([[1, 6], [8, 10], [15, 18]]);
        expect(merge([[1, 4], [4, 5]])).toEqual([[1, 5]]);
    });

    test('Longest Substring Without Repeating Characters test', () => {
        expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
        expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
        expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
    });

    test('Binary Tree Level Order Traversal test', () => {
        expect(levelOrder(arrayToTree([3, 9, 20, null, null, 15, 7]))).toEqual([[3], [9, 20], [15, 7]]);
        expect(levelOrder(arrayToTree([1]))).toEqual([[1]]);
        expect(levelOrder(arrayToTree([]))).toEqual([]);
    });

    test('Valid Anagram test', () => {
        expect(isAnagram("anagram", "nagaram")).toBeTruthy();
        expect(isAnagram("rat", "car")).toBeFalsy();
    });

    test('Search a 2D Matrix test', () => {
        const matrix = [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60]
        ]
        expect(searchMatrix(matrix, 3)).toBeTruthy();
        expect(searchMatrix(matrix, 13)).toBeFalsy();
    });

    test('Linked List Cycle test', () => {
        expect(hasCycle(arrayToCyclicLinkedList([3, 2, 0, -4], 1))).toBeTruthy();
        expect(hasCycle(arrayToCyclicLinkedList([1, 2], 0))).toBeTruthy();
        expect(hasCycle(arrayToCyclicLinkedList([1], -1))).toBeFalsy();
    });

    test('Valid Palindrome test', () => {
        expect(isPalindrome("A man, a plan, a canal: Panama")).toBeTruthy();
        expect(isPalindrome("race a car")).toBeFalsy();
        expect(isPalindrome(" ")).toBeTruthy();
    });
    test('Max Number Of Non-Intersecting segments test', () => {
        expect(maxNumberOfNonIntersrctingSegments([10, 1, 3, 1, 2, 2, 1, 0, 4])).toBe(3);
        expect(maxNumberOfNonIntersrctingSegments([5, 3, 1, 3, 2, 3])).toBe(1);
        expect(maxNumberOfNonIntersrctingSegments([9, 9, 9, 9, 9])).toBe(1);
        expect(maxNumberOfNonIntersrctingSegments([1, 5, 2, 4, 3, 3])).toBe(3);
    });

    test('Limit Function Test', () => {
        const executeFunc = limitFunc((a) => a, 3);
        const expected = ["Hello, World!", "Hello, World!", "Hello, World!", "Error"];
        const actual = [];
        actual.push(executeFunc("Hello, World!"));
        actual.push(executeFunc("Hello, World!"));
        actual.push(executeFunc("Hello, World!"));
        actual.push(executeFunc("Hello, World!"));
        expect(actual).toEqual(expected);
    });
});
