import { ProblemsObject, ReviewModel } from './interfaces'

export type Order = 'asc' | 'desc'
export const totalProblems = 2436

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

/**
 * Get string format of current date
 * @returns str
 */
export const getCurrentDateString = () => {
  const date = new Date()
  return date.toLocaleDateString("en-US",
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
}

// Sort by second column value for 2D arra
const compareSecondColumn = (a: any, b: any) => {
  if (a[1] === b[1]) {
    return 0;
  }
  else {
    return (a[1] < b[1]) ? -1 : 1;
  }
}

/**
 * Randomly pick a problem from problem pool or review pool
 * @param data - all problems
 * @param reviewEnabled - flag for enable review mode
 * @param review - review pool
 * @returns - random problem
 */
export const pickProblem = (data: ProblemsObject, reviewEnabled?: boolean, review?: ReviewModel) => {
  if (reviewEnabled && review) {
    // Convert review object to a 2D array
    let sorted: number[][] = []
    for (const key in review) {
      sorted.push([parseInt(key), review[key]])
    }

    // Sort the review array by reviewed count ASCE
    sorted.sort(compareSecondColumn)
    const max = sorted[sorted.length - 1][1]

    // Calculate weight so least reviewed problems get most weight
    for (let i = 0; i < sorted.length; i++) {
      sorted[i][1] = max - sorted[i][1]
    }

    // Calculate prefix sum
    const prefixSum = [sorted[0][0]]
    let total = sorted[0][0]
    for (let i = 1; i < sorted.length; i++) {
      total += sorted[i][1]
      prefixSum[i] = total
    }

    // Random pick with weight
    // ref: https://leetcode.com/problems/random-pick-with-weight/
    const pick = Math.random() * total
    let l = 0, r = prefixSum.length
    while (l < r) {
      const m = l + (r - l) / 2
      if (prefixSum[m] < pick) {
        l = m + 1
      } else {
        r = m
      }
    }

    // return problem id
    return sorted[l][0]
  }

  // random pick from all problems
  return Math.round(totalProblems * Math.random())
}

/**
 * Validate user input. Return problem id if valid
 * @param value - user input
 * @returns { pid, err } - problem id and error message
 */
export const getPidfromIput = (value: string) => {
  if (!value) {
    return { pid: null, err: 'Error: no input value. Input must be a number.' }
  }

  const validId = new RegExp('^[1-9][0-9]*$')
  const isValid = validId.test(value)
  const pid = isValid ? parseInt(value) : -1

  if (!isValid || pid <= 0 || pid > 2436) {
    return { pid: null, err: 'Error: invalid input.' }
  }
  return { pid, err: '' }
}
