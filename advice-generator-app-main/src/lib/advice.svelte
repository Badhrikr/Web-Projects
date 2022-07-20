<script>
  import Button from "./Button.svelte";
  import src from "../assets/images/pattern-divider-mobile.svg";
  import picturesrc from "../assets/images/pattern-divider-desktop.svg";

  let advice =
    "It is easy to sit up and take notice, what's difficult is getting up and taking action.";
  let number = "0";

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
        number = Adviceobj.id;
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<div class="container">
  <h1 class="title">Advice #{number}</h1>
  <p class="advice-quotes">
    &quot;{advice}&quot;
  </p>
  <picture>
    <source media="(min-width: 50em)" srcset={picturesrc} />
    <img {src} alt="A line for Decoration" />
  </picture>
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
    max-width: 600px;
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

  @media (min-width: 50em) {
    .container {
      margin-top: 1em;
      padding: 3.2em 2em 4em;
      border-radius: 1rem;
      box-shadow: 25px 25px 25px rgba(0, 0, 0, 0.2);
    }

    .title {
      font-size: 0.8rem;
    }

    .advice-quotes {
      font-size: 1.75rem;
      margin-bottom: 0.5em;
    }
  }
</style>
