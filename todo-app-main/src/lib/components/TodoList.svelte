<script>
  import CustomCheckbox from "../UI/CustomCheckbox.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import TodoListItems from "./TodoListItems.svelte";

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
  let value = "";
  let todoText = "";
  let todoTextValid = true;
  let noOfItems = 0;
  let checkedAll = false;

  $: noOfItems = todos.length;

  // window.onload = function () {
  //   let myObj = localStorage.getItem("todos");
  //   if (myObj != null) {
  //     todos = [...JSON.parse(myObj)];
  //   } else {
  //     todos = [];
  //   }
  // };

  function getText(event) {
    todoText = event.target.value;
  }

  function addTodo() {
    if (todoText.trim().length === 0) {
      todoTextValid = false;
    } else {
      todoTextValid = true;
      todos = [
        ...todos,
        {
          id: Math.random(),
          text: todoText,
        },
      ];
      // localStorage.setItem("todos", JSON.stringify(todos));
      value = null;
      todoText = "";
    }
  }

  function removeTodo(index) {
    todos.splice(index, 1);
    todos = todos;
    // localStorage.setItem("todos", JSON.stringify(todos));
  }

  function clear() {
    todos = [];
    // localStorage.clear();
  }

  function selectAll() {
    checkedAll ? (checkedAll = false) : (checkedAll = true);
  }
</script>

<div class="container" class:invalid={!todoTextValid}>
  <CustomCheckbox checked={checkedAll} on:click={selectAll} />
  <TextInput
    type="text"
    {value}
    on:input={getText}
    on:focus={() => (value = "")}
  />
  <button on:click={addTodo}>Go</button>
</div>

{#if !todoTextValid}
  <p class:invalid={!todoTextValid}>Input can't be empty</p>
{/if}

<div class="wrapper">
  {#each todos as todo, i}
    <TodoListItems
      todoText={todo.text}
      on:click={() => removeTodo(i)}
      todoDone={checkedAll}
    />
  {/each}

  {#if todos.length > 0}
    <div class="listinfo">
      <p class="items-count">{noOfItems} items left</p>
      <button on:click={clear}>Clear Completed</button>
    </div>
  {/if}
</div>

<style>
  button {
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .container {
    display: grid;
    grid-template-columns: 10% 80% 10%;
    place-items: center;
    background-color: var(--clr-bg-container);
    width: 100%;
    margin-bottom: 1em;
    padding: 0.65em 1em;
    border-radius: 5px;
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

  .invalid {
    margin-bottom: 0.5em;
    color: #f87272;
  }
</style>
