import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  return {
    visualEditingEnabled: event.url.searchParams.get('visual-editing') === 'true'
  };
};
