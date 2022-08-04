<script>
  import src from "../../assets/images/icon-cross.svg";
  import CustomCheckbox from "../UI/CustomCheckbox.svelte";

  export let completedItems;
  export let popCompletedItems;
  export let todoText;
  export let todoDone = false;

  function checked() {
    if (todoDone) {
      todoDone = false;
      popCompletedItems();
    } else {
      todoDone = true;
      completedItems();
    }
  }
</script>

<div class="container">
  <div class="listitems">
    <CustomCheckbox checked={todoDone} on:click={checked} />
    <p class="checklist" class:done={todoDone}>{todoText}</p>
  </div>
  <img {src} alt="A button to remove Items" on:click />
</div>

<style>
  .checklist {
    position: relative;
    margin-left: 1em;
    word-wrap: break-word;
  }

  .checklist::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -2.5%;
    width: 105%;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-in-out;
  }

  .done::after {
    content: "";
    transform: scaleX(1);
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
    width: 17px;
    aspect-ratio: 1/1;
    margin-right: 1.5em;
    opacity: 0;
  }

  .container:hover > img {
    opacity: 1;
    cursor: pointer;
  }

  @media (min-width: 50em) {
    .container {
      font-size: 1.175rem;
    }
  }
</style>
