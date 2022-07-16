<script>
  import TextInput from "./TextInput.svelte";
  import dollarImage from "../assets/images/icon-dollar.svg";

  export let bill;
</script>

<TextInput inputPlaceholder={dollarImage} inputName="Bill" bind:value={bill} />
