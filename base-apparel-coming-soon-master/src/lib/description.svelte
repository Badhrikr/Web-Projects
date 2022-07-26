<script>
  import TextInput from "./TextInput.svelte";
</script>

<div class="container">
  <h1 class="title">We're <span>coming soon</span></h1>
  <p class="description">
    Hello fellow shoppers! We're currently building our new fashion store. Add
    your email below to stay up-to-date with announcements and our launch deals.
  </p>
  <TextInput />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    text-align: center;
  }

  .title {
    margin-bottom: 0.4em;
    color: var(--clr-bg);
    font-size: 2.5rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 10px;
    line-height: 1;
  }

  .title span {
    display: block;
    color: var(--ft-clr-300);
    font-weight: 600;
  }

  .description {
    color: var(--clr-bg);
    font-size: 0.8rem;
    margin-bottom: 2em;
  }

  @media (min-width: 50em) {
    .container {
      width: 75%;
      margin-left: 3.5em;
      align-items: flex-start;
      text-align: left;
    }

    .title {
      margin-bottom: 0.1em;
      line-height: 1.1;
      font-size: 4rem;
      letter-spacing: 15px;
    }

    .description {
      margin-bottom: 2em;
      font-size: 1rem;
      line-height: 2;
    }
  }
</style>
