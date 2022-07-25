<script>
  import srcSun from "../../assets/images/icon-sun.svg";
  import srcMoon from "../../assets/images/icon-moon.svg";

  let switched = false;

  function themeswitch() {
    if (switched === false) {
      switched = true;
    } else {
      switched = false;
    }
  }
</script>

<header>
  <h1>Todo</h1>
  <button on:click={themeswitch}>
    {#if switched === false}
      <img src={srcSun} alt="A sun logo" />
    {:else}
      <img src={srcMoon} alt="A sun logo" />
    {/if}
  </button>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2.2em 0.4em 1.2em;
  }

  h1 {
    color: #fff;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 10px;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  img {
    width: 20px;
    aspect-ratio: 1/1;

    pointer-events: none;
  }
</style>
