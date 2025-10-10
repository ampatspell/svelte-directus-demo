<script lang="ts">
  import { resolve } from '$app/paths';

  let { data } = $props();

  let hello = $derived(data.hello);
</script>

<div class="hello">
  <div class="message">{hello.message}</div>
  <div class="install"><a href={resolve('/install')}>Install instructions</a></div>
</div>

<style lang="scss">
  .hello {
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    > .message {
      font-weight: 600;
    }
    > .install {
      :global(a) {
        text-decoration-color: #ccc;
      }
    }
  }
</style>
