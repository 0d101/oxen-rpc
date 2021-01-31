const RPCSNODE_METHODS = require("../constants/rpcsnode-methods");
const { RPCSNode } = require("../index");

describe("RPCSnode client class", () => {
  const client = new RPCSNode({
    camelCase: false,
    debug: false,
  });

  Object.keys(RPCSNODE_METHODS).forEach((method) => {
    describe(`#${method}`, () => {
      it("should return something", () => {
        return client[method]();
      });
    });
  });
});
