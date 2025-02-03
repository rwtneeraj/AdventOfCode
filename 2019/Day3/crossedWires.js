// ...........
// .+-----+...
// .|.....|...
// .|..+--X-+.
// .|..|..|.|.
// .|.-X--+.|.
// .|..|....|.
// .|.......|.
// .o-------+.
// ...........

const [line1, line2] = Deno.readTextFileSync("../inputs/day3.txt").split("\n");
const wire1 = line1.split(",");
const wire2 = line2.split(",");
const allStepsOFWire1 = [];
const allStepsOFWire2 = [];

const areArrayEqual = (array1, array2) =>
  array1.every((element, index) => element === array2[index]);

const rightControl = (step, stepsOfWire) => {
  for (let i = 0; i < step; i++) {
    const [x, y] = stepsOfWire.at(-1) || [0, 0];
    stepsOfWire.push([x + 1, y]);
  }
};

const upControl = (step, stepsOfWire) => {
  for (let i = 0; i < step; i++) {
    const [x, y] = stepsOfWire.at(-1) || [0, 0];
    stepsOfWire.push([x, y + 1]);
  }
};

const leftControl = (step, stepsOfWire) => {
  for (let i = 0; i < step; i++) {
    const [x, y] = stepsOfWire.at(-1) || [0, 0];
    stepsOfWire.push([x - 1, y]);
  }
};

const downControl = (step, stepsOfWire) => {
  for (let i = 0; i < step; i++) {
    const [x, y] = stepsOfWire.at(-1) || [0, 0];
    stepsOfWire.push([x, y - 1]);
  }
};

const wireControl = (path, stepsOfWire) => {
  const [turn, step] = [path[0], path.slice(1)];
  const directions = {
    R: rightControl,
    U: upControl,
    L: leftControl,
    D: downControl,
  };

  return directions[turn](step, stepsOfWire);
};

const intersectCordinates = (intersection, wire1, wire2) => {
  for (let i = 0; i < wire1.length; i++) {
    for (let j = 0; j < wire2.length; j++) {
      if (areArrayEqual(wire1[i], wire2[j])) {
        intersection.push(wire1[i]);
      }
    }
  }
  return intersection;
};

const distance = (intersection, [centerX, centerY]) => {
  return intersection.map(
    ([x, y]) => Math.abs(centerX - x) + Math.abs(centerY - y)
  );
};

const nearDistancePath = (distances) => {
  const sortedDistance = distances.sort((a, b) => a - b);
  return sortedDistance[0];
};

wire1.forEach((control) => wireControl(control, allStepsOFWire1));
wire2.forEach((control) => wireControl(control, allStepsOFWire2));

const intersections = intersectCordinates([], allStepsOFWire1, allStepsOFWire2);
const allDistance = distance(intersections, [0, 0]);
console.log(nearDistancePath(allDistance));
