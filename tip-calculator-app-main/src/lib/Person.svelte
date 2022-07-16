<script>
  import TextInput from "./TextInput.svelte";
  import personImage from "../assets/images/icon-person.svg";

  export let totalPerson;
</script>

<TextInput
  inputPlaceholder={personImage}
  inputName="Number of People"
  bind:value={totalPerson}
/>
