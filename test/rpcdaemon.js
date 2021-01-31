const RPCDAEMON_METHODS = require("../constants/rpcdaemon-methods");
const { RPCDaemon } = require("../index");

describe("RPCDaemon client class", () => {
  const client = new RPCDaemon({
    camelCase: false,
    debug: false,
  });

  Object.keys(RPCDAEMON_METHODS).forEach((method) => {
    describe(`#${method}`, () => {
      it("should return something", () => {
        return client[method]();
      });
    });
  });
});
