import { createDirectus, rest, staticToken } from '@directus/sdk';
import Queue from 'p-queue';
import { PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN } from '$env/static/public';
import type { Schema } from './schema';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
const fetchRetry = async (fetch: Function, count: number, ...args: any[]) => {
  const response = await fetch(...args);
  if (count > 2 || response.status !== 429) {
    return response;
  }
  console.warn(`[429] Too Many Requests (Attempt ${count + 1})`);
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  return fetchRetry(fetch, count + 1, ...args);
};

const queue = new Queue({ intervalCap: 10, interval: 500, carryoverIntervalCount: true });

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getDirectus = (fetch: Function) => {
  return createDirectus<Schema>(PUBLIC_DIRECTUS_URL, {
    globals: {
      fetch: (...args) => queue.add(() => fetchRetry(fetch, 0, ...args))
    }
  })
    .with(staticToken(PUBLIC_DIRECTUS_TOKEN))
    .with(rest());
};
