type TokenBalance = {
  chain: string;
  chain_id: number;
  address: string;
  amount: string;
  symbol?: string;
  decimals?: number;
  price_usd?: number;
  value_usd?: number;
};

export type BalanceData = {
  request_time: string;
  response_time: string;
  wallet_address: string;
  balances: TokenBalance[];
};
