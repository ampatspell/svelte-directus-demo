import { PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN } from '$env/static/public';
import { getDirectusInternal, type Directus, type Fetch } from './base';

export { type Directus };

export const getDirectus = (fetch: Fetch) => {
  return getDirectusInternal(fetch, PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN);
};
