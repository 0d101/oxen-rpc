const RPCWALLET_METHODS = require("../constants/rpcwallet-methods");
const { RPCWallet } = require("../index");

describe("RPCWallet client class", () => {
  const client = new RPCWallet({
    camelCase: false,
    debug: false,
  });

  Object.keys(RPCWALLET_METHODS).forEach((method) => {
    describe(`#${method}`, () => {
      it("should return something", () => {
        return client[method]();
      });
    });
  });
});
