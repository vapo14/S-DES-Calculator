// helper functions

// P10 permutation
const P10 = (key) => {
  var permutation = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
  var tempString = "";
  for (let i = 0; i < key.length; i++) {
    tempString += key[permutation[i] - 1];
  }
  return tempString;
};

// split
const split = (key) => {
  var splitKeys = { leftHalf: "", rightHalf: "" };
  for (let i = 0; i < key.length; i++) {
    if (i < key.length / 2) splitKeys.leftHalf += key[i];
    else splitKeys.rightHalf += key[i];
  }
  return splitKeys;
};

// left shift
const leftShift = (key, offset) => {
  var temp = "";
  for (var i = offset; i < key.length + offset; i++) {
    if (i < key.length) {
      temp += key[i];
    } else {
      temp += key[i - key.length];
    }
  }
  return temp;
};

// merge
const merge = (key1, key2) => {
  return (key1 += key2);
};

// P8
const P8 = (key) => {
  var temp = "";
  var permutation = [6, 3, 7, 4, 8, 5, 10, 9];
  for (var i = 0; i < permutation.length; i++) {
    temp += key[permutation[i] - 1];
  }
  return temp;
};

// initial permutation
const IP = (plaintext) => {
  var temp = "";
  var permutation = [2, 6, 3, 1, 4, 8, 5, 7];
  for (var i = 0; i < plaintext.length; i++) {
    temp += plaintext[permutation[i] - 1];
  }
  return temp;
};

// Expand and Permutate
const ExpandPermutate = (key) => {
  var temp = "";
  var permutation = [4, 1, 2, 3, 2, 3, 4, 1];
  for (var i = 0; i < 8; i++) {
    temp += key[permutation[i] - 1];
  }
  return temp;
};

// XOR
const XOR = (key1, key2) => {
  var temp = "";
  for (var i = 0; i < key1.length; i++) {
    temp += Math.abs(parseInt(key1[i]) - parseInt(key2[i]));
  }
  return temp;
};

// S0 Box
const S0Box = (key) => {
  var temp = "";
  var row = "";
  var column = "";
  var bin = {};
  bin["00"] = 0;
  bin["01"] = 1;
  bin["10"] = 2;
  bin["11"] = 3;
  var SBox = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2],
  ];
  row += key[0];
  row += key[key.length - 1];
  column += key[1];
  column += key[key.length - 2];
  temp = (SBox[bin[row]][bin[column]] >>> 0).toString(2);
  return temp;
};

// S1 Box
const S1Box = (key) => {
  var temp = "";
  var row = "";
  var column = "";
  var bin = {};
  bin["00"] = 0;
  bin["01"] = 1;
  bin["10"] = 2;
  bin["11"] = 3;
  var SBox = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3],
  ];
  row += key[0];
  row += key[key.length - 1];
  column += key[1];
  column += key[key.length - 2];
  temp = SBox[bin[row]][bin[column]].toString(2);
  temp = temp === "0" ? temp + "0" : temp;
  return temp;
};

// P4
const P4 = (key) => {
  var temp = "";
  var permutation = [2, 4, 3, 1];
  for (var i = 0; i < key.length; i++) {
    temp += key[permutation[i] - 1];
  }
  return temp;
};

// Final Permutation
const FinalPermutation = (key) => {
  var temp = "";
  var permutation = [4, 1, 3, 5, 7, 2, 8, 6];
  for (var i = 0; i < key.length; i++) {
    temp += key[permutation[i] - 1];
  }
  return temp;
};

module.exports = {
  P10,
  P8,
  merge,
  split,
  leftShift,
  IP,
  ExpandPermutate,
  XOR,
  S0Box,
  S1Box,
  P4,
  FinalPermutation,
};
