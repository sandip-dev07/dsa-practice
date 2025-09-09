import { fetcher } from "./fetcher";
import type { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
  fetcher,
  dedupingInterval: 12000, // 12 seconds
  errorRetryCount: 2,
  errorRetryInterval: 3000,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  keepPreviousData: true,
  loadingTimeout: 10000,
  // Error handling
  onError: (error: Error, key) => {
    console.error(`SWR Error on ${key}:`, error);
  },
};
