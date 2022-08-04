<header>
  <h1>Todo</h1>
  <button class="theme" />
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

  @media (min-width: 50em) {
    header {
      margin-block: 4em 1.5em;
      padding: 0;
    }
    h1 {
      font-size: 2.5rem;
    }
  }
</style>
