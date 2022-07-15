<script>
  export let inputPlaceholder;
  export let inputName;
  export let value;
</script>

<h1>{inputName}</h1>
<label class="input__holder" class:margin-none={value == 0} for="input-val">
  <div class="image-wrapper">
    <img src={inputPlaceholder} alt="" />
  </div>
  <input
    type="number"
    id="input-val"
    on:focus={() => (value = "")}
    min="0"
    bind:value
  />
</label>
{#if value == 0}
  <p class="info">{inputName} can't be Zero</p>
{/if}

<style>
  h1 {
    margin-bottom: 0.5em;
    font-size: 1rem;
    color: var(--ft-clr-300);
  }

  .input__holder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5em;
    padding: 0.2em 0.5em;
    font-size: 25px;
    background-color: var(--input-bg);
    border-radius: 5px;
  }

  .margin-none {
    margin-bottom: 0.75em;
  }

  .input__holder:where(:hover, :focus) {
    outline: 2px solid var(--clr-primary-400);
  }

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    color: var(--clr-primary-400);
    text-align: right;
    caret-color: var(--clr-primary-400);
  }

  input:focus {
    outline: none;
  }

  .image-wrapper {
    width: 15px;
    height: 15px;
  }

  .info {
    margin-bottom: 0.75em;
    color: rgb(255, 0, 0, 0.5);
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
