<script>
  import TextInput from "./TextInput.svelte";

  export let totalPerson;
</script>

<TextInput
  class="person"
  inputName="Number of People"
  bind:value={totalPerson}
/>
