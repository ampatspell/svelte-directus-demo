<script lang="ts">
  let { data } = $props();

  let hello = $derived(data.hello);
</script>

<div class="hello">
  <div class="message">{hello.message}</div>
  <div class="install">{data.install.content}</div>
</div>

<style lang="scss">
  .hello {
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 100px;
    > .install {
      white-space: pre-wrap;
    }
  }
</style>
