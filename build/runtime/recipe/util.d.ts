export declare function compareNulls<T>(o1: T | null, o2: T | null): 1 | 0 | -1;
export declare function compareStrings(s1: string | null, s2: string | null): number;
export declare function compareNumbers(n1: number, n2: number): number;
export declare function compareBools(b1: boolean | null, b2: boolean | null): number;
export declare function compareArrays<a>(a1: a[], a2: a[], compare: (first: a, second: a) => number): number;
export declare function compareObjects<a>(o1: {
    [index: string]: a;
} | null, o2: {
    [index: string]: a;
} | null, compare: (first: a, second: a) => number): number;
export declare type Comparable = {
    _compareTo: (other: Comparable) => number;
};
export declare function compareComparables(o1: Comparable | null, o2: Comparable | null): number;
