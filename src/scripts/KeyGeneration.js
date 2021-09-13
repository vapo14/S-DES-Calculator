const { P10, P8, merge, split, leftShift } = require("./HelperFunctions");

const generateKeys = (key) => {
  var html = "<h2>Key Generation</h2>";
  html += "<br/>";
  var finalKeys = { key1: "", key2: "", html };
  var p10 = P10(key);
  console.log("p10: ", p10);
  html += "<h3>P10 permutation of <i>" + key + "</i>: </h3> <p>" + p10 + "</p>";
  html += "<br/><br/>";
  var split1 = split(p10);
  console.log("split1: ", split1);
  html +=
    "<h3>First split: </h3> <p><b style='margin: 10px'>Left Half:</b> " +
    split1.leftHalf +
    "<b style='margin: 10px'>Right Half: </b>" +
    split1.rightHalf +
    "</p>";
  html += "<br/><br/>";

  var merge1 = merge(
    leftShift(split1.leftHalf, 1),
    leftShift(split1.rightHalf, 1)
  );
  html +=
    "<h3>Left Shift of both halves: </h3> <p><b style='margin: 10px'>Left Half:</b>" +
    leftShift(split1.leftHalf, 1) +
    "<b style='margin: 10px'>Right Half: </b>" +
    leftShift(split1.rightHalf, 1) +
    "</p>";
  console.log("After leftshift and merge: ", merge1);
  html += "<br/><br/>";

  html += "<h4>Merge both halves: </h4>" + merge1;
  var p8 = P8(merge1);
  html += "<br/><br/>";
  console.log("After first P8: ", p8);
  html += "<h3>P8 permutation of " + merge1 + ": </h3> <p>" + p8 + "</p>";
  finalKeys.key1 = p8;
  var merge2 = merge(
    leftShift(leftShift(split1.leftHalf, 1), 2),
    leftShift(leftShift(split1.rightHalf, 1), 2)
  );
  html += "<br/><br/>";

  html +=
    "<h3>Left Shift by 2: </h3> <p><b style='margin: 10px'>Left Half:</b> " +
    leftShift(leftShift(split1.leftHalf, 1), 2) +
    "<b style='margin: 10px'>Right Half: </b>" +
    leftShift(leftShift(split1.rightHalf, 1), 2) +
    "</p>";
  html += "<br/><br/>";
  console.log("After left shift 2 merge: ", merge2);
  var P8_2 = P8(merge2);
  html += "<h3>Merge again: </h3> <p>" + merge2 + "</p>";
  html += "<br/><br/>";
  html += "<h3>P8 again: </h3> <p>" + P8_2 + "</p>";
  html += "<br/><br/>";
  finalKeys.key2 = P8_2;
  console.log("Final keys: ", finalKeys);
  html +=
    "<h3>Final keys: </h3> <p><b style='margin: 10px'>Key 1:</b> " +
    finalKeys.key1 +
    "<b style='margin: 10px'>Key 2: </b>" +
    finalKeys.key2 +
    "</p><hr style='width: 50%; margin-top: 50px; margin-bottom: 50px'>";
  finalKeys.html = html;
  return finalKeys;
};

module.exports = { generateKeys };
