const {
  IP,
  split,
  ExpandPermutate,
  XOR,
  S0Box,
  S1Box,
  P4,
  merge,
  FinalPermutation,
} = require("./HelperFunctions");

const SDES = (plaintext, keys) => {
  var initialPermutation = IP(plaintext);
  console.log("Initial permutation: ", initialPermutation);

  var split1 = split(initialPermutation);
  console.log("First split: ", split1);

  var expandedRight = ExpandPermutate(split1.rightHalf);
  console.log("Expanded right: ", expandedRight);

  var expandedxor = XOR(expandedRight, keys.key1);
  console.log("After XOR: ", expandedxor);

  var split2 = split(expandedxor);
  console.log("split before sboxes: ", split2);

  var s0 = S0Box(split2.leftHalf);
  console.log("S0 box half: ", s0);

  var s1 = S1Box(split2.rightHalf);
  console.log("S1 box half: ", s1);

  var mergeP4 = merge(s0, s1);
  mergeP4 = P4(mergeP4);
  console.log("After P4: ", mergeP4);

  var xorWithLeft = XOR(mergeP4, split1.leftHalf);
  console.log("xor with left: ", xorWithLeft);

  var expand2 = ExpandPermutate(xorWithLeft);
  console.log("expand: ", expand2);

  var xorWithKey2 = XOR(expand2, keys.key2);
  console.log("xor key2: ", xorWithKey2);

  var split3 = split(xorWithKey2);
  var s0_2 = S0Box(split3.leftHalf);
  var s1_2 = S1Box(split3.rightHalf);
  var merge3 = merge(s0_2, s1_2);
  var finalp4 = P4(merge3);
  var finalxor = XOR(finalp4, split1.rightHalf);
  var finalPerm = merge(finalxor, xorWithLeft);
  finalPerm = FinalPermutation(finalPerm);
  console.log("Ciphertext: ", finalPerm);
  return finalPerm;
};

module.exports = { SDES };
