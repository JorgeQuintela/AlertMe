// romanToInt('MCMXCIV');
// longestCommonPrefix(['dog', 'doggy', 'doctor']);
// twoSum([0, 0, 3, 4], 0);
// reverseVowels('holaile');
// lengthOfLongestSubstring('aw');
// diagonalDifference()
// magicSquare([
//   [9, 1, 8],
//   [7, 9, 3],
//   [2, 9, 9],
// ]);
// climbingLeaderboard([100, 100, 50, 40, 40, 20, 10], [5, 25, 50, 120]);
// hourglassSum([
//   [-1, -1, 0, -9, -2, -2],
//   [-2, -1, -6, -8, -2, -5],
//   [-1, -1, -1, -2, -3, -4],
//   [-1, -9, -2, -4, -4, -5],
//   [-7, -3, -3, -2, -9, -9],
//   [-1, -3, -1, -2, -4, -5],
// ]);
// pickingNumbers([
//   4, 97, 5, 97, 97, 4, 97, 4, 97, 97, 97, 97, 4, 4, 5, 5, 97, 5, 97, 99, 4,
//   97, 5, 97, 97, 97, 5, 5, 97, 4, 5, 97, 97, 5, 97, 4, 97, 5, 4, 4, 97, 5,
//   5, 5, 4, 97, 97, 4, 97, 5, 4, 4, 97, 97, 97, 5, 5, 97, 4, 97, 97, 5, 4,
//   97, 97, 4, 97, 97, 97, 5, 4, 4, 97, 4, 4, 97, 5, 97, 97, 97, 97, 4, 97, 5,
//   97, 5, 4, 97, 4, 5, 97, 97, 5, 97, 5, 97, 5, 97, 97, 97,
// ]);
// designerPdfViewer(
//   [
//     1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
//     5, 7,
//   ],
//   'zaba',
// );
// nonDivisibleSubset(
//   9,
//   [422346306, 940894801, 696810740, 862741861, 85835055, 313720373],
// );

var romanToInt = function (s) {
  var solution = 0;
  var symbolsToNr = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};

  for (var i = 0; i < s.length; i++) {
    var letter = s.substring(i, i + 1);
    var worth = symbolsToNr[letter];
    solution = solution + worth;

    if (i >= 0 && i < s.length - 1) {
      var nextLetter = s.substring(i + 1, i + 2);
      if (
        (letter == 'I' && (nextLetter == 'V' || nextLetter == 'X')) ||
        (letter == 'X' && (nextLetter == 'L' || nextLetter == 'C')) ||
        (letter == 'C' && (nextLetter == 'D' || nextLetter == 'M'))
      ) {
        solution = solution - worth - worth;
      }
    }
  }

  return solution;
};

var longestCommonPrefix = function (strs) {
  var prefix = '';
  for (var i = 0; i < strs[0].length; i++) {
    if (checkSameLetter(i, strs)) {
      prefix = prefix + strs[0].substring(i, i + 1);
    } else {
      break;
    }
  }

  function checkSameLetter(position, strs) {
    var letter = strs[0].substring(position, position + 1);
    for (var i = 1; i < strs.length; i++) {
      if (strs[i].length <= position) {
        return false;
      }
      if (letter != strs[i].substring(position, position + 1)) {
        return false;
      }
    }
    return true;
  }

  return prefix;
};

var twoSum = function (nums, target) {
  var arr = {};

  for (var i = 0; i < nums.length; i++) {
    arr[nums[i]] = i;
  }
  for (var i = 0; i < nums.length; i++) {
    if (arr[target - nums[i]] && arr[target - nums[i]] != i) {
      var ans = [i, arr[target - nums[i]]];
      return [i, arr[target - nums[i]]];
    }
  }
};

var reverseVowels = function (s) {
  var vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];
  var result = s;

  var z = s.length - 1;
  for (var i = 0; i < s.length; i++) {
    if (vowels.includes(s.substring(i, i + 1))) {
      for (; z > 0; ) {
        if (vowels.includes(s.substring(z, z + 1))) {
          if (i >= z) {
            return result;
          }
          result =
            result.substring(0, i) +
            s.substring(z, z + 1) +
            result.substring(i + 1, z) +
            s.substring(i, i + 1) +
            result.substring(z + 1);
          z--;
          break;
        }
        z--;
      }
    }
  }
  return result;
};

var lengthOfLongestSubstring = function (s) {
  var result = '';

  for (var i = 0; i < s.length; i++) {
    var resultLoop = s.substring(i, i + 1);

    for (var z = i + 1; z < s.length; z++) {
      if (!resultLoop.includes(s.substring(z, z + 1))) {
        resultLoop = resultLoop + s.substring(z, z + 1);
      } else {
        break;
      }
    }
    if (result.length < resultLoop.length) {
      result = resultLoop;
    }
  }
  console.log('lengthOfLongestSubstring: ' + result);
  return result;
};

function diagonalDifference(arr: number[][]): number {
  // Write your code here
  let diag1 = arr[0][0] + arr[1][1] + arr[2][2];
  let diag2 = arr[2][0] + arr[1][1] + arr[0][2];
  return Math.abs(diag1 - diag2);
}

function magicSquare(square: number[][]) {
  var perm = [
    [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2],
    ],
    [
      [6, 1, 8],
      [7, 5, 3],
      [2, 9, 4],
    ],
    [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ],
    [
      [2, 9, 4],
      [7, 5, 3],
      [6, 1, 8],
    ],
    [
      [8, 3, 4],
      [1, 5, 9],
      [6, 7, 2],
    ],
    [
      [4, 3, 8],
      [9, 5, 1],
      [2, 7, 6],
    ],
    [
      [6, 7, 2],
      [1, 5, 9],
      [8, 3, 4],
    ],
    [
      [2, 7, 6],
      [9, 5, 1],
      [4, 3, 8],
    ],
  ];
  var min = 10000;
  for (var i = 0; i < 8; i++) {
    var sum = 0;
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        sum += Math.abs(perm[i][x][y] - square[x][y]);
      }
    }
    if (sum < min) {
      min = sum;
    }
  }
  console.log(min);
}

function climbingLeaderboard(ranked: number[], player: number[]): number[] {
  // Write your code here

  var result: number[] = [];

  ranked = [...new Set(ranked)]; // remove dupes
  var ranked2: number[] = [];
  for (var i = 0; i < ranked.length; i++) {
    ranked2[ranked[i]] = i + 1;
  }
  var currPlayerPos = player.length - 1;

  var ranked2Iter = ranked[0];
  while (currPlayerPos >= 0) {
    if (ranked2[ranked2Iter]) {
      if (player[currPlayerPos] >= ranked2Iter) {
        result.unshift(ranked2[ranked2Iter]);
        currPlayerPos--;
        ranked2Iter++;
      }
    } else if (ranked2Iter <= 0) {
      result.unshift(ranked.length + 1);
      currPlayerPos--;
    }
    ranked2Iter--;
  }
  /*for (var i=0; i<player.length; i++) {
        for (var q=0; q<ranked.length; q++) {
            if (player[i]>=ranked[q]) {
                result.push(q+1)
                break;
            } else if (q==ranked.length-1) {
                result.push(ranked.length+1) 
            }
        }
        
    }*/
  return result;
}

function hourglassSum(arr: number[][]): number {
  // Write your code here
  let max: number = -99;

  var row = 1;
  var column = 1;
  while (row < 5 && column < 5) {
    /*if (arr[row-1][column-1] && arr[row-1][column] && arr[row-1][column+1]
        && arr[row][column]
        && arr[row+1][column-1] && arr[row+1][column] && arr[row+1][column+1]) {*/
    var sum =
      arr[row - 1][column - 1] +
      arr[row - 1][column] +
      arr[row - 1][column + 1] +
      arr[row][column] +
      arr[row + 1][column - 1] +
      arr[row + 1][column] +
      arr[row + 1][column + 1];

    if (sum > max) {
      max = sum;
    }
    //}

    column++;
    if (column == 5) {
      row++;
      column = 1;
    }
  }
  return max;
}

function pickingNumbers(a: number[]): number {
  // Write your code here
  var max: number = 0;

  var occurrences: any[] = [];
  for (var i = 0; i < a.length; i++) {
    if (occurrences[a[i]]) {
      occurrences[a[i]]++;
    } else {
      occurrences[a[i]] = 1;
    }
  }
  occurrences.forEach(function (currentValue, index, arr) {
    var total: number = 0;
    if (occurrences[index - 1]) {
      total = currentValue + occurrences[index - 1];
      if (total > max) {
        max = total;
      }
    }
    if (occurrences[index + 1]) {
      total = currentValue + occurrences[index + 1];
      if (total > max) {
        max = total;
      }
    }
    total = currentValue;
    if (total > max) {
      max = total;
    }
  });
  return max;
}

function designerPdfViewer(h: number[], word: string): number {
  // Write your code here
  var mmtotal: number = 0;
  word = word.replace(' ', '');

  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var alphabetValues: {[key: string]: number} = {};
  var maxHeight: number = 0;
  for (var i = 0; i < h.length; i++) {
    alphabetValues[alphabet.substring(i, i + 1)] = h[i];
  }
  for (var i = 0; i < word.length; i++) {
    if (alphabetValues[word.substring(i, i + 1)] > maxHeight) {
      maxHeight = alphabetValues[word.substring(i, i + 1)];
    }
  }

  return maxHeight * word.length;
}

function nonDivisibleSubset1(k: number, s: number[]): number {
  // Write your code here

  function compatible(kk: number, ss: number[]) {
    for (var i = 1; i < ss.length; i++) {
      if ((ss[i] + kk) % k == 0) {
        return false;
      }
    }
    return true;
  }

  var possibleArrays: any[][] = [];

  var i = 0;
  var ii = 0;
  var biggestArray: number = 1;
  while (i < s.length) {
    if (i != ii) {
      // so doesnt compare with itself
      if ((s[i] + s[ii]) % k != 0) {
        if (!possibleArrays[i]) {
          possibleArrays[i] = [s[i]];
          possibleArrays[i].push(s[ii]);
        } else if (compatible(s[ii], possibleArrays[i])) {
          possibleArrays[i].push(s[ii]);
        }
      }
    }

    ii++;
    if (ii == s.length) {
      if (possibleArrays[i] && possibleArrays[i].length > biggestArray) {
        biggestArray = possibleArrays[i].length;
      }
      i++;
      ii = 0;
    }
  }
  console.log('nonDivisibleSubset: ' + biggestArray);
  return biggestArray;
}

function nonDivisibleSubset(k: number, s: number[]): number {
  var count: number[] = [];
  var result: number;

  for (var i = 0; i < s.length; i++) {
    count[i] = 0;
  }
  for (var i = 0; i < s.length; i++) {
    count[s[i] % k] += 1;
  }
  result = Math.min(count[0], 1);

  if (k % 2 == 0) {
    result += Math.min(count[Math.floor(k / 2)], 1);
  }

  for (var i = 1; i < Math.floor(k / 2 + 1); i++) {
    if (i != k - i) {
      result += Math.max(count[i], count[k - i]);
    }
  }
  console.log('nonDivisibleSubset: ' + result);
  return result;
}
