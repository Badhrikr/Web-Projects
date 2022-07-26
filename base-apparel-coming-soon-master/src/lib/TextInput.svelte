<script>
  import src from "../assets/images/icon-arrow.svg";

  let email = "";
  let touched = false;
  let emailValid = true;
  $: emailValid = isEmailValid(email);

  function isEmailValid(val) {
    return new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    ).test(val);
  }
</script>

<form novalidate class="form-center" on:submit|preventDefault>
  <input
    type="email"
    placeholder="Email Address"
    class:invalid={!emailValid && touched}
    bind:value={email}
    on:blur={() => (touched = true)}
  />
  <button type="submit"><img {src} alt="" /></button>
</form>

{#if !emailValid && touched}
  <p class="validity-message">Please provide a Email</p>
{/if}

<style>
  .form-center {
    --padding: 1em 1.7em;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: var(--padding);
    color: var(--clr-bg);
    font-size: 0.8rem;
    background-color: transparent;
    border-radius: 100vmax;
    border: 1px solid var(--clr-bg);
    outline: none;
  }

  .invalid {
    background-image: url(../assets/images/icon-error.svg);
    background-repeat: no-repeat;
    background-position: top 50% right 5.3em;
    border: 1px solid red;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    height: 100%;
    padding: var(--padding);
    background-image: linear-gradient(
      135deg,
      var(--clr-bg2-start),
      var(--clr-bg2-end)
    );
    border: none;
    border-radius: 100vmax;
    cursor: pointer;
  }

  .validity-message {
    margin-top: 0.5em;
    margin-left: 1.5em;
    margin-right: auto;
    color: red;
  }

  @media (min-width: 50em) {
    input {
      padding: 1em 2em;
      font-size: 1rem;
    }

    button {
      padding: 1em 2.8em;
    }
  }

  .invalid {
    background-position: top 50% right 7em;
    background-size: 20px;
  }
</style>
