<script>
  import TextInput from "./TextInput.svelte";

  export let totalPerson;
</script>

<TextInput
  inputPlaceholder="src\assets\images\icon-person.svg"
  inputName="Number of People"
  bind:value={totalPerson}
/>
