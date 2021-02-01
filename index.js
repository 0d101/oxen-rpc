const _camelcase = require("lodash.camelcase");
const fetch = require("node-fetch");

const {
  DEFAULT_DAEMON_ADDR,
  DEFAULT_SNODE_ADDR,
  DEFAULT_WALLET_ADDR,
} = require("./constants/addresses");
const RPCDAEMON_METHODS = require("./constants/rpcdaemon-methods");
const RPCSNODE_METHODS = require("./constants/rpcsnode-methods");
const RPCWALLET_METHODS = require("./constants/rpcwallet-methods");

const DEFAULT_OPTIONS = {
  address: undefined,
  camelCase: false,
  checkInputIntegrity: false,
  checkOutputIntegrity: false,
  debug: false,
};
const DEFAULT_METHOD_DEFINITION = {
  input: null,
  output: null,
  formatInput: (_) => _, // noop
};

class RPCTypeError extends Error {}
class RPCResponseError extends Error {
  constructor(response, errors = undefined) {
    super();
    if (errors) {
      this.list = errors;
      this.length = errors.length;
    }
    this.response = response.error ? response.error : response;
  }
}

class RPCCaller {
  constructor(methods, defaultAddress, options = DEFAULT_OPTIONS) {
    this.methods = methods;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options, {
      address: options.address || defaultAddress,
    });

    const sanitizeMethodName = (methodName) => {
      return options.camelCase ? _camelcase(methodName) : methodName;
    };

    Object.keys(this.methods).forEach((methodName) => {
      const definition = Object.assign(
        {},
        DEFAULT_METHOD_DEFINITION,
        this.methods[methodName]
      );

      this[sanitizeMethodName(methodName)] = (params) => {
        const formattedParams = definition.formatInput(params);

        this.__debug("start req:", methodName);
        this.__debug("params:", formattedParams);
        const call = this.call(methodName, formattedParams);

        if (this.options.checkOutputIntegrity) {
          return call.then((response) => {
            if (response.error) {
              return Promise.reject(new RPCResponseError(response));
            }

            const attendedOutput = definition.output;

            if (response.result && typeof response.result === "object") {
              let errors = [];
              Object.keys(response.result).forEach((key) => {
                const data = response.result[key];
                const expectType =
                  typeof attendedOutput[key] === "function"
                    ? typeof attendedOutput[key]()
                    : typeof attendedOutput[key];

                if (typeof data !== expectType) {
                  errors.push(
                    new RPCTypeError(
                      `key ${key}: expecting ${expectType}, received ${typeof data}`
                    )
                  );
                }
              });

              if (errors.length) {
                return Promise.reject(new RPCResponseError(response, errors));
              }
            }

            return response;
          });
        } else {
          return call;
        }
      };
    });
  }

  get address() {
    return this.options.address;
  }

  call(method, params) {
    return fetch(this.address, {
      method: "post",
      body: JSON.stringify({
        method,
        params,
      }),
    }).then((response) => response.json());
  }

  __debug(...messages) {
    if (this.options.debug) {
      console.log(...messages);
    }
  }
}

class RPCDaemon extends RPCCaller {
  constructor(options) {
    super(RPCDAEMON_METHODS, DEFAULT_DAEMON_ADDR, options);
  }
}

class RPCSNode extends RPCCaller {
  constructor(options) {
    super(RPCSNODE_METHODS, DEFAULT_SNODE_ADDR, options);
  }
}

class RPCWallet extends RPCCaller {
  constructor(options) {
    super(RPCWALLET_METHODS, DEFAULT_WALLET_ADDR, options);
  }
}

module.exports = { RPCDaemon, RPCSNode, RPCWallet };
