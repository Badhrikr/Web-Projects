<script>
  export let disabled = false;
</script>

<button {disabled} class:disable={disabled}>Claim your free trial</button>

<style>
  button {
    width: 100%;
    margin-bottom: 1em;
    padding: 1em;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    background-color: var(--clr-primary-300);
    border-radius: 5px;
    border: none;
    box-shadow: 0 4px 0 hsl(154, 59%, 41%);
    transition: all 0.4s ease-in-out;
  }

  button:hover {
    cursor: pointer;
    transform: translateY(5px);
    box-shadow: none;
  }

  .disable {
    background-color: var(--clr-bg);
    box-shadow: 0 4px 0 rgb(214, 110, 110);
  }
</style>
