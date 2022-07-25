<script>
  import TextInput from "./TextInput.svelte";

  export let bill;
</script>

<TextInput class="bill" inputName="Bill" bind:value={bill} />
