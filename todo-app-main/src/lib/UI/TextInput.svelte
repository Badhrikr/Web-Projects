<script>
  export let type;
  export let value;
</script>

<input {type} {value} placeholder="Create a new todo..." on:input on:focus />

<style>
  input[type="text"] {
    width: 100%;
    padding-left: 1em;
    color: var(--ft-clr-400);
    font-size: 0.8rem;
    background-color: transparent;
    border: none;
    outline: none;
  }

  input[type="checkbox"] {
    width: 20px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: none;
  }

  input:checked {
    background: linear-gradient(90deg, var(--clr-bg-start), var(--clr-bg-end));
  }
</style>
