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

const SDES = (plaintext, keys, mode) => {
  //SWITCH KEYS
  if (mode === "DECRYPT") {
    var temp = keys.key1;
    keys.key1 = keys.key2;
    keys.key2 = temp;
  }
  var ciphertext = {};
  var html = "<h2>Ciphertext Generation</h2>";
  html += "<br/>";
  var initialPermutation = IP(plaintext);
  console.log("Initial permutation: ", initialPermutation);
  html +=
    "<h3>Initial permutation of <i>" +
    plaintext +
    ":</i> </h3> <p>" +
    initialPermutation +
    "</p>";
  html += "<br/>";

  var split1 = split(initialPermutation);
  console.log("First split: ", split1);
  html +=
    "<h3>First split: </h3> <p><b style='margin: 10px'>Left Half:</b> " +
    split1.leftHalf +
    "<b style='margin: 10px'>Right Half: </b>" +
    split1.rightHalf +
    "</p>";
  html += "<br/>";

  var expandedRight = ExpandPermutate(split1.rightHalf);
  console.log("Expanded right: ", expandedRight);
  html +=
    "<h3>Expand and Permutate Right Half <i>" +
    split1.rightHalf +
    ":</i></h3><p>" +
    expandedRight +
    "</p>";
  html += "<br/>";

  var expandedxor = XOR(expandedRight, keys.key1);
  console.log("After XOR: ", expandedxor);
  html += "<h3>XOR on Expanded Right Half</h3><p>" + expandedxor + "</p>";
  html += "<br/>";

  var split2 = split(expandedxor);
  console.log("split before sboxes: ", split2);
  html +=
    "<h3>Split for SBoxes: </h3> <p><b style='margin: 10px'>Left Half:</b> " +
    split2.leftHalf +
    "<b style='margin: 10px'>Right Half: </b>" +
    split2.rightHalf +
    "</p>";
  html += "<br/>";

  var s0 = S0Box(split2.leftHalf);
  console.log("S0 box half: ", s0);
  html += "<h3>S0 Box Result:</h3><p>" + s0 + "</p><br/>";

  var s1 = S1Box(split2.rightHalf);
  console.log("S1 box half: ", s1);
  html += "<h3>S1 Box Result:</h3><p>" + s0 + "</p><br/>";

  var mergeP4 = merge(s0, s1);
  mergeP4 = P4(mergeP4);
  console.log("After P4: ", mergeP4);
  html += "<h3>Merge and P4 permutation</h3><p>" + mergeP4 + "</p> <br/>";

  var xorWithLeft = XOR(mergeP4, split1.leftHalf);
  console.log("xor with left: ", xorWithLeft);
  html += "<h3>XOR with Left Half and P4:</h3><p>" + xorWithLeft + "</p> <br/>";

  var expand2 = ExpandPermutate(xorWithLeft);
  console.log("expand: ", expand2);
  html += "<h3>Expand and Permutate</h3><p>" + expand2 + "</p> <br/>";

  var xorWithKey2 = XOR(expand2, keys.key2);
  console.log("xor key2: ", xorWithKey2);
  html += "<h3>XOR with Key 2 and P4:</h3><p>" + xorWithKey2 + "</p> <br/>";

  var split3 = split(xorWithKey2);
  html +=
    "<h3>Split for SBoxes: </h3> <p><b style='margin: 10px'>Left Half:</b> " +
    split3.leftHalf +
    "<b style='margin: 10px'>Right Half: </b>" +
    split3.rightHalf +
    "</p>";
  html += "<br/>";

  var s0_2 = S0Box(split3.leftHalf);
  html += "<h3>S0 Box Result:</h3><p>" + s0_2 + "</p><br/>";

  var s1_2 = S1Box(split3.rightHalf);
  html += "<h3>S1 Box Result:</h3><p>" + s1_2 + "</p><br/>";

  var merge3 = merge(s0_2, s1_2);
  var finalp4 = P4(merge3);
  html += "<h3>Merge for P4 permutation</h3><p>" + finalp4 + "</p> <br/>";

  var finalxor = XOR(finalp4, split1.rightHalf);
  html += "<h3>Final XOR: </h3><p>" + finalxor + "</p> <br/>";

  var finalPerm = merge(finalxor, xorWithLeft);
  finalPerm = FinalPermutation(finalPerm);
  html +=
    "<h3>Final Permutation</h3><p>" +
    finalPerm +
    "</p> <hr style='width: 50%; margin-top: 50px; margin-bottom: 50px'>";

  console.log("Ciphertext: ", finalPerm);

  ciphertext = { ciphertext: finalPerm, html };

  return ciphertext;
};

module.exports = { SDES };
