export function numberGenerator(digits, num) {
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

  //   const digits2 = new Array(digits.map((d) => d)).sort();
  //   const digits2 = digits.split("").sort();

  // 0123456789 - 210
  //   8459761203 - 5439

  let milisecons = 0;
  let initial = 0;

  for (let i = 0; i < num.length; i++) {
    let digit = num[i];
    let final = digits.indexOf(digit);

    milisecons += Math.abs(initial - final);
    initial = final;
  }

  return milisecons;

  // THE PROBLEM WAS NOT STARTIGN FROM 0 EACH TIME.

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
  if (Math.abs(numbers.length - letters.length) >= 2) return "";

  let output = "";
  numbers.sort();
  letters.sort(); // convert to ASCI number to compare

  // merge into output
  let n = Math.min(numbers.length, letters.length);

  for (let i = 0; i < n; i++) {
    let letra = letters[i];
    let number = numbers[i];
    let union = "";
    if (letters.length > numbers.length) {
      union += letra + number;
    } else {
      union += number + letra;
    }
    output += union;
  }

  if (numbers.length != letters.length) {
    output += numbers.length == n + 1 ? numbers[n] : letters[n];
  }

  return output;
}

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

  // determine its not possible
  // check if the difference in letters and numbers
  // allow for an adjacent interpolation
  // if the diff is greater that 2, its not possible
  // return blank
  if (Math.abs(numbers.length - letters.length) >= 2) return "";

  // merge into output

  const getAdjacentList = (greaterlist, smallerlist) => {
    greaterlist.sort();
    smallerlist.sort();
    let value = "";
    greaterlist.forEach((v, index) => {
      let adjValue = smallerlist[index];
      value += `${v}`;
      if (adjValue) {
        value += `${adjValue}`;
      }
    });
    return value;
  };

  // higher length (character count) will get preference
  // if equal, numbers will have preference
  return numbers.length >= letters.length
    ? getAdjacentList(numbers, letters)
    : getAdjacentList(letters, numbers);
}
