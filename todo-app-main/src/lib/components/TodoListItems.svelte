<script>
  import TextInput from "../UI/TextInput.svelte";
  import src from "../../assets/images/icon-cross.svg";

  export let todoText;
</script>

<div class="container">
  <div class="listitems">
    <TextInput type="checkbox" />
    <p class="checklist">{todoText}</p>
  </div>
  <img {src} alt="A button to remove Items" />
</div>

<style>
  .checklist {
    padding-left: 1em;
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
  }
</style>
