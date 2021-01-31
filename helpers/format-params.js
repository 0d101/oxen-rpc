module.exports = {
  simpleTypeToArray(param) {
    if (!Array.isArray(param)) return [param];
    return param;
  }
};
