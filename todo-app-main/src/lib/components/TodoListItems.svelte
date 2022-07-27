<script>
  import src from "../../assets/images/icon-cross.svg";
  import CustomCheckbox from "../UI/CustomCheckbox.svelte";
  import todos from "../components/TodoList.svelte";

  export let todoText;

  let checkList = todos;
  let todoDone = false;

  function checkedItems() {
    if (todoDone) {
      todoDone = false;
    } else {
      todoDone = true;
    }
  }
</script>

<div class="container">
  <div class="listitems">
    <CustomCheckbox {checkedItems} />
    <p class="checklist" class:done={todoDone}>{todoText}</p>
  </div>
  <img {src} alt="A button to remove Items" on:click />
</div>

<style>
  .checklist {
    padding-left: 1em;
  }

  .done {
    text-decoration: line-through;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: var(--ft-clr-500);
    font-size: 0.8rem;
    background-color: var(--clr-bg-container);
    border-bottom: 1px solid var(--ft-clr-200);
  }

  .listitems {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 1em 1.5em;
  }

  img {
    width: 13px;
    aspect-ratio: 1/1;
    margin-right: 1.5em;
    cursor: pointer;
  }
</style>
