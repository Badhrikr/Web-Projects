<script>
  import TextInput from "./TextInput.svelte";

  export let bill;
</script>

<TextInput
  inputPlaceholder="src\assets\images\icon-dollar.svg"
  inputName="Bill"
  bind:value={bill}
/>
