const validatePlaintext = (plaintext) => {
  var isValid = false;
  let regex = /([01]){8}/g;
  isValid = plaintext.match(regex) ? true : false;
  return isValid;
};

const validateKey = (key) => {
  var isValid = false;
  let regex = /([01]){10}/g;
  isValid = key.match(regex) ? true : false;
  return isValid;
};

module.exports = { validatePlaintext, validateKey };
