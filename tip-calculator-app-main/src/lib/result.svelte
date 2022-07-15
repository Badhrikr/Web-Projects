<script>
  import { createEventDispatcher } from "svelte";

  export let tipAmount;
  export let totalAmount;

  const dispatch = createEventDispatcher();
</script>

<div class="card">
  <div class="card__amount">
    <p>Tip Amount <span>/ person</span></p>
    <p class="result">${tipAmount}</p>
  </div>
  <div class="card__total">
    <p>Total <span>/ person</span></p>
    <p class="result">${totalAmount}</p>
  </div>
  <button class="card__btn" type="reset" on:click={() => dispatch("reset")}
    >Reset</button
  >
</div>

<style>
  .card {
    grid-row: 1/8;
    grid-column: 2/3;
    padding: 1.8em;
    background-color: var(--clr-primary-400);
    border-radius: 1rem;
  }

  .card__amount,
  .card__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
    color: var(--clr-bg-neutral);
  }

  .card__amount p span,
  .card__total p span {
    display: block;
    color: var(--ft-clr-200);
    font-size: 0.8rem;
  }

  .result {
    color: var(--clr-primary-300);
    font-size: 2rem;
  }

  .card__btn {
    width: 100%;
    padding: 0.5em 0;
    color: var(--clr-primary-400);
    text-align: center;
    text-transform: uppercase;
    background-color: var(--clr-primary-300);
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  @media (min-width: 50em) {
    .result {
      font-size: 3rem;
    }

    .card__btn {
      font-size: 1.2rem;
      margin-top: auto;
    }

    .card {
      display: grid;
    }
  }
</style>
