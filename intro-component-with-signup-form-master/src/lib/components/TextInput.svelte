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

  input[type="submit"] {
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    background-color: var(--clr-primary-300);
    border: none;
    box-shadow: 0 4px 0 hsl(154, 59%, 41%);
    transition: all 0.4s ease-in-out;
    background-image: none;
  }

  input[type="submit"]:hover {
    cursor: pointer;
    transform: translateY(5px);
    box-shadow: none;
  }

  .error-message {
    margin-bottom: 0.5em;
    color: var(--clr-bg);
  }
</style>
