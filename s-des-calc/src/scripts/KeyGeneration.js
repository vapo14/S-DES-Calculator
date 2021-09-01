const { P10, P8, merge, split, leftShift } = require("./HelperFunctions");

const generateKeys = (key) => {
  var finalKeys = { key1: "", key2: "" };
  var p10 = P10(key);
  console.log("p10: ", p10);
  var split1 = split(p10);
  console.log("split1: ", split1);
  var merge1 = merge(
    leftShift(split1.leftHalf, 1),
    leftShift(split1.rightHalf, 1)
  );
  console.log("After leftshift and merge: ", merge1);
  var p8 = P8(merge1);
  console.log("After first P8: ", p8);
  finalKeys.key1 = p8;
  var merge2 = merge(
    leftShift(leftShift(split1.leftHalf, 1), 2),
    leftShift(leftShift(split1.rightHalf, 1), 2)
  );
  console.log("After left shift 2 merge: ", merge2);
  var P8_2 = P8(merge2);
  finalKeys.key2 = P8_2;
  console.log("Final keys: ", finalKeys);
  return finalKeys;
};

module.exports = { generateKeys };
