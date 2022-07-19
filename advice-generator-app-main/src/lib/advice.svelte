<script>
  import Button from "./Button.svelte";

  let src = "src/assets/images/pattern-divider-mobile.svg";
  let advice =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur quod commodi alias et itaque.";
  let number = 0;

  window.onload = () => {
    getAdvice();
  };

  function getAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        return response.json();
      })
      .then((adviceData) => {
        const Adviceobj = adviceData.slip;
        advice = Adviceobj.advice;
        number = Adviceobj.slip_id;
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<div class="container">
  <h1 class="title">Advice #{number}</h1>
  <p class="advice-quotes">
    {advice}
  </p>
  <img {src} alt="A line for Decoration" />
  <Button on:click={getAdvice} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: relative;
    width: 90%;
    max-width: 500px;
    padding: 2.2em 1em 4em;
    text-align: center;
    background-color: var(--clr-primary-400);
    border-radius: 0.5rem;
  }

  .title {
    color: var(--ft-primary-400);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  .advice-quotes {
    color: var(--ft-primary-300);
    font-size: 1.3rem;
  }
</style>
