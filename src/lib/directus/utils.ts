import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import type { DirectusFile } from '@directus/sdk';
import { page } from '$app/state';
import { setAttr as baseSetAttr } from '@directus/visual-editing';

export function resolveAssetURL(fileOrString: string | DirectusFile | null | undefined): string {
  if (!fileOrString) {
    return '';
  } else if (typeof fileOrString === 'string') {
    return `${PUBLIC_DIRECTUS_URL}/assets/${fileOrString}`;
  }
  return `${PUBLIC_DIRECTUS_URL}/assets/${fileOrString.id}`;
}

interface SetAttrOptions {
  collection: string;
  item: string | number;
  fields?: string | string[];
  mode?: 'modal' | 'popover' | 'drawer';
}

export const setAttr = (opts: SetAttrOptions) => {
  if (page.data.visualEditingEnabled) {
    return baseSetAttr({
      ...opts
    });
  }
  return undefined;
};
