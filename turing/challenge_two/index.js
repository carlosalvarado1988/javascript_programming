/* 
  a digit-only keyboard contains all 10 digits from 0 to 9. They all exists in one line.

  given a string of 10 digits illustrating how the keys are positioned. To type a digit you start from index zero
  to the index of the target digit.
  it takes |a - b| miliseconds to move from index a to index b.

  write a function to calculate the number of miliseconds meeded to type a number with one finger.

  example1: 
  input digits = "0123456789", 
  num="210"
  output = 4

  example2: 
  input digits = "8459761203", 
  num="5439"
  output = 4

*/
export function numberGenerator(digits, num) {
  let milisecons = 0;
  let initial = 0;

  for (let i = 0; i < num.length; i++) {
    let digit = num[i];
    let final = digits.indexOf(digit);

    milisecons += Math.abs(initial - final);
    initial = final;
  }

  return milisecons;
  // THE PROBLEM was i assumed i needed to start FROM 0 EACH TIME.
  // // i need two pointers
  // milisecons += 1;
  // for (let j = 0; digits[j] != match; j++) {
  //   //   const a = digits[j];
  //   //   const b = digits[++j];

  //   const a = j - 1 < 0 ? 0 : j - 1;
  //   const b = j;
  //   //   if (b <= limit) {
  //   const abs = Math.abs(a - b);
  //   milisecons += abs;
  //   //   }
  // }
}

////////////////////// ******************************** ////////////////////////////

/*
    Rearrange the string
    you are given a string str consisting of letters and numbers
    you need to find a combination of the string where one letter is not adjacent to another
    letter and filled by number.
    return the string in ascending order with above combinations or return blank string if it is not possible
    to create the result.

    rules: 
    * if letters and numbers are equally distributed, number will get first preference
    * higher character count will get preference
    
    example 1: 
    input: str = 'z3b1a2'
    output: '1a2b3z'
    explanation: no two adjacent characters have the same type in "1a2b3z"

    example 2" 
    input: str = '156'
    output: '516'
    explanation: no two adjacent characters have the same type in "516"
    

    constrains:
    1 <= str.length <= 500
    str consists of only letters and/or numbers
*/
export function rearrangeString(s) {
  let numbers = [];
  let letters = [];

  // separate numbers and letter
  for (let char of s) {
    if (!!parseInt(char)) {
      numbers.push(parseInt(char));
    } else {
      letters.push(char);
    }
  }
  // determine its not possible
  // check if the difference in letters and numbers
  // allow for an adjacent interpolation
  // if the diff is greater that 2, its not possible
  // return blank
  if (Math.abs(numbers.length - letters.length) >= 2) return "";

  let output = "";
  numbers.sort();
  letters.sort();

  // merge into output
  // find the shortest length to iterate
  let n = Math.min(numbers.length, letters.length);

  for (let i = 0; i < n; i++) {
    if (letters.length > numbers.length) {
      output += letters[i] + numbers[i];
    } else {
      output += numbers[i] + letra;
    }
  }

  // after the shortes length was completed for both arrays.
  // find the extra element to add it
  // remember can only have 1 extra element of difference, if not is not possible to keep adjacents
  if (numbers.length != letters.length) {
    // n + 1 for the largest list, n would match the pending element
    output += numbers.length == n + 1 ? numbers[n] : letters[n];
  }

  return output;
}

// REFINEMENT 2
export function rearrangeString2(s) {
  let numbers = [];
  let letters = [];

  // separate numbers and letter
  for (let char of s) {
    if (!!parseInt(char)) {
      numbers.push(parseInt(char));
    } else {
      letters.push(char);
    }
  }

  // determine its not possible
  // check if the difference in letters and numbers
  // allow for an adjacent interpolation
  // if the diff is greater that 2, its not possible
  // return blank
  if (Math.abs(numbers.length - letters.length) >= 2) return "";

  let output = "";
  numbers.sort(); // asc order, desc order include: (a, b) => b - a
  letters.sort();

  // merge into output
  // higher length (character count) will get preference
  // if equal, numbers will have preference

  if (numbers.length >= letters.length) {
    // numbers first
    numbers.forEach((num, idx) => {
      let adjLetter = letters[idx];
      output += `${num}`;
      if (adjLetter) {
        output += `${adjLetter}`;
      }
    });
  } else {
    // letter first
    letters.forEach((char, idx) => {
      let adjNumber = numbers[idx];
      output += `${char}`;
      if (adjNumber) {
        output += `${adjNumber}`;
      }
    });
  }

  return output;
}

// REFINEMENT 3
export function rearrangeString3(s) {
  let numbers = [];
  let letters = [];

  // separate numbers and letter
  for (let char of s) {
    if (!!parseInt(char)) {
      numbers.push(parseInt(char));
    } else {
      letters.push(char);
    }
  }

  // handle not possible scenario
  if (Math.abs(numbers.length - letters.length) >= 2) return "";

  // private funct to create adj, DRY
  const getAdjacentString = (greaterlist, smallerlist) => {
    greaterlist.sort();
    smallerlist.sort();
    let adjacentString = "";
    greaterlist.forEach((item, index) => {
      let adjValue = smallerlist[index];
      adjacentString += `${item}`;
      if (adjValue) {
        adjacentString += `${adjValue}`;
      }
    });
    return adjacentString;
  };

  // higher length (character count) will get preference
  // if equal, numbers will have preference
  return numbers.length >= letters.length
    ? getAdjacentString(numbers, letters)
    : getAdjacentString(letters, numbers);
}
