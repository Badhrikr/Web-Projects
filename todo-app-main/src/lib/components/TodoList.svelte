<script>
  import TextInput from "../UI/TextInput.svelte";
  import TodoListItems from "./TodoListItems.svelte";

  let value = "";
  let todoText = "";
  let todos = [
    {
      id: Math.random(),
      text: "Complete online JavaScript course",
    },
    {
      id: Math.random(),
      text: "Jog around the park 3x",
    },
    {
      id: Math.random(),
      text: "10 minutes meditation",
    },
    {
      id: Math.random(),
      text: "Read for 1 hour",
    },
    {
      id: Math.random(),
      text: "Pick up groceries",
    },
    {
      id: Math.random(),
      text: "Complete Todo App on Frontend Mentor",
    },
  ];

  function getText(event) {
    todoText = event.target.value;
  }

  function addItem() {
    todos = [
      ...todos,
      {
        id: Math.random(),
        text: todoText,
      },
    ];
    value = null;
  }

  function clear() {
    todos = [];
  }
</script>

<div class="container">
  <TextInput type="checkbox" value="" />
  <TextInput
    type="text"
    {value}
    on:input={getText}
    on:focus={() => (value = "")}
  />
  <button on:click={addItem}>Go</button>
</div>

<div class="wrapper">
  {#each todos as todo, i}
    <TodoListItems todoText={todo.text} />
  {/each}

  {#if todos.length > 0}
    <div class="listinfo">
      <p class="items-count">5 items left</p>
      <button on:click={clear}>Clear Completed</button>
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: start;
    background-color: var(--clr-bg-container);
    width: 100%;
    margin-bottom: 1em;
    padding: 0.65em 1em;
    border-radius: 5px;
  }

  button {
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .wrapper {
    border-radius: 5px;
    overflow: hidden;
  }

  .listinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 1.5em;
    color: var(--ft-clr-300);
    font-size: 0.8rem;
    background-color: var(--clr-bg-container);
  }
</style>
