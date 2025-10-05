<script lang="ts">
  import { render } from './remark.svelte';
  import './markdown.scss';
  import './code.scss';

  let { content }: { content: string | null | undefined } = $props();

  let markdown = $derived(await render(content));
</script>

<div class="markdown">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html markdown}
</div>
