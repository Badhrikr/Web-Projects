<script>
  import CustomCheckbox from "../UI/CustomCheckbox.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import TodoListItems from "./TodoListItems.svelte";

  let todos = [
    {
      id: Math.random(),
      text: "Complete online JavaScript course",
      state: false,
    },
    {
      id: Math.random(),
      text: "Jog around the park 3x",
      state: false,
    },
    {
      id: Math.random(),
      text: "10 minutes meditation",
      state: false,
    },
    {
      id: Math.random(),
      text: "Read for 1 hour",
      state: false,
    },
    {
      id: Math.random(),
      text: "Pick up groceries",
      state: false,
    },
    {
      id: Math.random(),
      text: "Complete Todo App on Frontend Mentor",
      state: false,
    },
  ];
  let completedtodo = [];
  let incompletedtodo = [];
  let value = "";
  let todoText = "";
  let todoTextValid = true;
  let noOfItems = 0;
  let checkedAll = false;

  // $: noOfItems = Math.abs(todos.length - completedtodo.length);

  $: incompletedtodo = todos.filter((todo) => {
    return !completedtodo.includes(todo);
  });
  $: noOfItems = incompletedtodo.length;
  // $: localStorage.setItem("todos", JSON.stringify(todos));

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
          state: false,
        },
      ];
      value = null;
      todoText = "";
    }
  }

  function removeTodo(index) {
    todos.splice(index, 1);
    todos = todos;
  }

  function clear() {
    todos = todos.filter((items) => {
      return !completedtodo.includes(items);
    });
    checkedAll = false;
  }

  function selectAll() {
    if (checkedAll) {
      checkedAll = false;
      completedtodo = [];
      todos.forEach((todo) => {
        todo.state = false;
      });
    } else {
      checkedAll = true;
      completedtodo = todos;
      todos.forEach((todo) => {
        todo.state = true;
      });
    }
  }

  function completedItems(index) {
    if (completedtodo.includes(todos[index])) {
      completedtodo = completedtodo;
    } else {
      completedtodo = [...completedtodo, todos[index]];
      todos[index].state = true;
    }
  }

  function popCompletedItems(index) {
    if (completedtodo.includes(todos[index])) {
      let completedtodoIndex = completedtodo.indexOf(todos[index]);
      completedtodo.splice(completedtodoIndex, 1);
      completedtodo = [...completedtodo];
      todos[index].state = false;
    }
  }

  // $: console.log(incompletedtodo);
  // $: console.log(completedtodo);
</script>

<div class="container" class:invalid={!todoTextValid}>
  <CustomCheckbox checked={checkedAll} on:click={selectAll} />
  <form novalidate on:submit|preventDefault={addTodo}>
    <TextInput
      type="text"
      {value}
      on:input={getText}
      on:focus={() => (value = "")}
    />
  </form>
</div>

{#if !todoTextValid}
  <p class:invalid={!todoTextValid}>Input can't be empty</p>
{/if}

<div class="wrapper">
  {#each todos as todo, i}
    <TodoListItems
      todoText={todo.text}
      on:click={() => removeTodo(i)}
      todoDone={todo.state}
      completedItems={() => completedItems(i)}
      popCompletedItems={() => popCompletedItems(i)}
    />
  {/each}

  {#if todos.length > 0}
    <div class="listinfo">
      <p class="items-count">{noOfItems} items left</p>
      <button on:click={clear}>Clear Completed</button>
    </div>
    <div class="listinfo control-center">
      <button class="all">All</button>
      <button class="active">Active</button>
      <button class="completed">Completed</button>
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
    grid-template-columns: 10% 90%;
    place-items: center;
    background-color: var(--clr-bg-container);
    width: 100%;
    margin-bottom: 1em;
    padding: 0.65em 1em;
    border-radius: 5px;
  }

  .container > form {
    place-self: start;
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
    border-radius: 0 0 5px 5px;
    background-color: var(--clr-bg-container);
  }

  .control-center {
    justify-content: center;
    gap: 2em;
    margin-top: 2em;
    font-weight: 700;
    border-radius: 5px;
  }

  .control-center > button:where(:hover, :focus) {
    color: var(--clr-primary-400);
    cursor: pointer;
  }

  .invalid {
    margin-bottom: 0.5em;
    color: #f87272;
  }
</style>
