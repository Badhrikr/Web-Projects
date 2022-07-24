<script>
  let src = "src/assets/images/icon-sun.svg";

  function themeSwitch() {
    if (src === "src/assets/images/icon-sun.svg") {
      src = "src/assets/images/icon-moon.svg";
    } else {
      src = "src/assets/images/icon-sun.svg";
    }
  }
</script>

<header>
  <h1>Todo</h1>
  <img {src} alt="A sun logo" on:click={themeSwitch} />
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

  img {
    width: 20px;
    aspect-ratio: 1/1;
    cursor: pointer;
  }
</style>
