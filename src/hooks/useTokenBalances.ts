import {
  TokenBalancesParams,
  UseTokenBalancesConfig,
} from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchBalances } from "../utils/duneApi.ts";
import { useGetApiKey } from "../providers/";

const defaultConfig = {
  queryOptions: {
    refetchOnWindowFocus: true,
    staleTime: 1000,
    refetchInterval: 1000,
  },
};

export const useTokenBalances = (
  walletAddress: string,
  params: TokenBalancesParams,
  config: UseTokenBalancesConfig = defaultConfig
) => {
  const apiKey = useGetApiKey();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["duneTokenBalances", walletAddress, params],
    queryFn: async () => {
      return await fetchBalances(walletAddress, params, apiKey);
    },
    enabled: !!walletAddress,
    refetchOnWindowFocus: config?.queryOptions?.refetchOnWindowFocus,
    staleTime: config?.queryOptions?.staleTime,
    refetchInterval: config?.queryOptions?.refetchInterval,
  });

  return { data, error, isLoading, refetch };
};
