<script lang="ts">
  import Markdown from '$lib/components/markdown/markdown.svelte';

  let { data } = $props();

  let content = $derived(data.install.content);
</script>

<div class="install">
  <Markdown {content} />
</div>

<style lang="scss">
  .install {
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 100px;
  }
</style>
