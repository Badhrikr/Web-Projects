<script>
  import src from "../assets/images/icon-dice.svg";
</script>

<button on:click><img {src} alt="A Dice Logo" /></button>

<style>
  button {
    position: absolute;
    top: 100%;
    padding: 1.2em;
    background-color: var(--ft-primary-400);
    border: none;
    border-radius: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    box-shadow: 0 0 15px 5px var(--ft-primary-400);
  }

  button img {
    pointer-events: none;
  }
</style>
