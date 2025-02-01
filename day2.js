const input = [
  1, 12, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 1, 19, 5, 23, 2,
  9, 23, 27, 1, 5, 27, 31, 1, 5, 31, 35, 1, 35, 13, 39, 1, 39, 9, 43, 1, 5, 43,
  47, 1, 47, 6, 51, 1, 51, 13, 55, 1, 55, 9, 59, 1, 59, 13, 63, 2, 63, 13, 67,
  1, 67, 10, 71, 1, 71, 6, 75, 2, 10, 75, 79, 2, 10, 79, 83, 1, 5, 83, 87, 2, 6,
  87, 91, 1, 91, 6, 95, 1, 95, 13, 99, 2, 99, 13, 103, 1, 103, 9, 107, 1, 10,
  107, 111, 2, 111, 13, 115, 1, 10, 115, 119, 1, 10, 119, 123, 2, 13, 123, 127,
  2, 6, 127, 131, 1, 13, 131, 135, 1, 135, 2, 139, 1, 139, 6, 0, 99, 2, 0, 14,
  0,
];

const input2 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];

const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const gravityAssist = function (input) {
  const incode = [...input];
  const opcode = { 1: add, 2: mul };

  let pointer = 0;

  while (incode[pointer] !== 99) {
    const value1 = incode[incode[pointer + 1]];
    const value2 = incode[incode[pointer + 2]];
    const desPosition = incode[pointer + 3];

    incode[desPosition] = opcode[incode[pointer]](value1, value2);
    pointer += 4;
  }

  return incode[0];
};

console.log(gravityAssist(input));

// part2

const getNounAndVerb = (input,result) => {
  for (let i = 1; i <= input.length; i++) {
    for (let j = 1; j <= input.length; j++) {
      input[1] = i;
      input[2] = j;
      if (gravityAssist(input) === result) {
        return [i, j];
      }
    }
  }
};


console.log(getNounAndVerb(input, 19690720));