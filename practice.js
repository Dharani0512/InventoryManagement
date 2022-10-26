const mutiply = (x) => {
  return (y) => {
    console.log(x * y);
    return (z) => {
      console.log(x * y * z, "cube");
    };
  };
};

const mutiplyByTwo = mutiply(2);
const cube = mutiplyByTwo(2)(3);
console.log(cube);
