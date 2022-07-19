<script>
  export let type;
  export let placeholder;
  export let value;
  export let valid = true;
  export let validityMessage = "";

  let touched = false;
</script>

<input
  class:invalid={!valid && touched}
  class:valid
  {type}
  {placeholder}
  {value}
  on:blur={() => (touched = true)}
  on:input
/>
{#if validityMessage && !valid && touched}
  <p class="error-message">{validityMessage}</p>
{/if}

<style>
  input {
    width: 100%;
    margin-bottom: 1em;
    padding: 1em;
    font-weight: 600;
    border: 1px solid var(--ft-clr-neutral);
    border-radius: 5px;
  }

  .invalid,
  .valid {
    margin-bottom: 0.5em;
    background-image: url(../../assets/images/icon-error.svg);
    background-repeat: no-repeat;
    background-position: top 50% right 0.5em;
    background-size: 15px;
    border: 1px solid var(--clr-bg);
  }

  .valid {
    background-image: url(../../assets/images/icon-valid.svg);
    border: 1px solid var(--clr-primary-300);
  }

  input:focus {
    outline: none;
  }

  .error-message {
    margin-bottom: 0.5em;
    color: var(--clr-bg);
  }

  @media (min-width: 50em) {
    input {
      padding-left: 2em;
    }

    input[type="submit"] {
      padding: 1em;
    }
  }
</style>
