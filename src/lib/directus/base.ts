import { createDirectus, rest, staticToken } from '@directus/sdk';
import Queue from 'p-queue';
import type { Schema } from './schema';

export type Fetch = typeof fetch;
export type Directus = ReturnType<typeof getDirectusInternal>;

const fetchRetry = async (fetch: Fetch, count: number, ...args: Parameters<Fetch>) => {
  const response = await fetch(...args);
  if (count > 2 || response.status !== 429) {
    return response;
  }
  console.warn(`[429] Too Many Requests (Attempt ${count + 1})`);
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  return fetchRetry(fetch, count + 1, ...args);
};

const queue = new Queue({ intervalCap: 10, interval: 500, carryoverIntervalCount: true });

export const getDirectusInternal = (fetch: Fetch, url: string, token: string) => {
  return createDirectus<Schema>(url, {
    globals: {
      fetch: (...args) => queue.add(() => fetchRetry(fetch, 0, ...args)),
    },
  })
    .with(staticToken(token))
    .with(rest());
};
