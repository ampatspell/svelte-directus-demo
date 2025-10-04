<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="dark">
  {@render children()}
</div>

<style lang="scss">
  .dark {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--dark-white-color);
    font-family: var(--dark-font-family);
    font-size: var(--dark-font-size);
    font-weight: var(--dark-font-weight);
    cursor: default;
  }
</style>
