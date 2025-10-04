import { getDirectus } from '$lib/directus/directus';
import { CollectionNames } from '$lib/directus/schema';
import { readSingleton } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectus(fetch);
  return {
    hello: await directus.request(readSingleton(CollectionNames.hello)),
    install: await directus.request(readSingleton(CollectionNames.install)),
  };
};
