<script>
  export let type;
  export let value;
</script>

<input {type} {value} placeholder="Create a new todo..." on:input on:focus />

<style>
  input[type="text"] {
    width: 100%;
    padding-left: 0.6em;
    color: var(--ft-clr-400);
    font-size: 0.8rem;
    background-color: transparent;
    border: none;
    outline: none;
  }

  @media (min-width: 50em) {
    input[type="text"] {
      font-size: 1.175rem;
    }
  }
</style>
