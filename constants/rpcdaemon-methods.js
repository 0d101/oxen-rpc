const { simpleTypeToArray } = require("../helpers/format-params");

const COMMON_STRUCT_BLOCKHEADER = {
  block_size: Number,
  depth: Number,
  difficulty: Number,
  hash: String,
  height: Number,
  major_version: Number,
  minor_version: Number,
  nonce: Number,
  num_txes: Number,
  orphan_status: Boolean,
  reward: Number,
  timestamp: Number
};

module.exports = {
  /**
   * @description Look up how many blocks are in the longest chain known to the node.
   */
  get_block_count: {
    output: {
      count: Number,
      status: String
    }
  },
  /**
   * @description Look up a block's hash by its height.
   */
  on_get_block_hash: {
    input: [Number],
    output: String,
    formatInput: simpleTypeToArray
  },
  /**
   * @description Get a block template on which mining a new block.
   */
  get_block_template: {
    input: {
      wallet_address: String,
      reserve_size: Number
    },
    output: {
      blocktemplate_blob: String,
      blockhashing_blob: String,
      difficulty: Number,
      expected_reward: Number,
      height: Number,
      prev_hash: Number,
      reserved_offset: Number,
      status: String,
      untrusted: Boolean
    }
  },
  /**
   * @description Submit a mined block to the network.
   */
  submit_block: {
    input: [String], // @todo: check blob data integrity ?
    output: {
      status: String
    }
  },
  /**
   * @description get_last_block_header
   */
  get_last_block_header: {
    output: {
      block_header: COMMON_STRUCT_BLOCKHEADER,
      status: String,
      untrusted: Boolean
    }
  },
  get_block_header_by_hash: {
    input: {
      hash: String
    },
    output: {
      block_header: COMMON_STRUCT_BLOCKHEADER,
      status: String,
      untrusted: Boolean
    }
  },
  get_block_header_by_height: {
    input: {
      height: Number
    },
    output: {
      block_header: COMMON_STRUCT_BLOCKHEADER,
      status: String,
      untrusted: Boolean
    }
  },
  get_block_headers_range: {
    input: {
      start_height: Number,
      end_height: Number
    },
    output: {
      headers: [COMMON_STRUCT_BLOCKHEADER],
      status: String,
      untrusted: Boolean
    }
  },
  get_block: {
    input: {
      height: Number,
      hash: String
    },
    output: {
      blob: String,
      block_header: COMMON_STRUCT_BLOCKHEADER,
      json: String,
      miner_tx_hash: String,
      tx_hashes: [String],
      status: String,
      untrusted: Boolean
    }
  },
  get_connections: {
    output: {
      connections: [
        {
          address: String,
          avg_download: Number,
          avg_upload: Number,
          connection_id: String,
          current_download: Number,
          current_upload: Number,
          height: Number,
          host: String,
          incoming: Boolean,
          ip: String,
          live_time: Number,
          local_ip: Boolean,
          localhost: Boolean,
          peer_id: String,
          port: Number,
          recv_count: Number,
          recv_idle_time: Number,
          send_count: Number,
          send_idle_time: Number,
          state: String,
          support_flags: Number
        }
      ]
    }
  },
  get_info: {},
  hard_fork_info: {},
  set_bans: {},
  get_bans: {},
  flush_txpool: {},
  get_output_histogram: {},
  get_coinbase_tx_sum: {},
  get_fee_estimate: {},
  get_alternate_chains: {},
  relay_tx: {},
  sync_info: {},
  get_txpool_backlog: {},
  get_output_distribution: {},
  get_version: {}
};
