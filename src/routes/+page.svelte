<script lang="ts">
  let { data } = $props();

  let hello = $derived(data.hello);
</script>

<div class="hello">{hello.message}</div>

<style lang="scss">
  .hello {
    padding: 50px;
  }
</style>
