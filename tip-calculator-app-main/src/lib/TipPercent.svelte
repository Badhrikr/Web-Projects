<script>
  import { createEventDispatcher } from "svelte";

  export let value;

  const dispatch = createEventDispatcher();
</script>

<div class="card">
  <p>Select Tip %</p>
  <div class="card__grid">
    <button class="grid__items" on:click={() => dispatch("getFivePecent")}
      >5%</button
    >
    <button class="grid__items" on:click={() => dispatch("getTenPercent")}
      >10%</button
    >
    <button class="grid__items" on:click={() => dispatch("getFifteenPercent")}
      >15%</button
    >
    <button
      class="grid__items"
      on:click={() => dispatch("getTwentyFivePercent")}>25%</button
    >
    <button class="grid__items" on:click={() => dispatch("getFiftyPercent")}
      >50%</button
    >
    <input
      type="number"
      class="grid__items"
      placeholder="Custom"
      min="1"
      max="100"
      {value}
      on:input
    />
  </div>
</div>

<style>
  .card {
    margin-bottom: 1.5em;
  }

  .card p {
    margin-bottom: 0.5em;
    color: var(--ft-clr-300);
  }

  .card__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }

  .card__grid > * {
    width: 100%;
  }

  .grid__items {
    padding: 0.4em;
    color: var(--clr-bg-neutral);
    font-size: 1.3rem;
    background-color: var(--clr-primary-400);
    border: none;
    border-radius: 7px;
    transition: all 250ms ease-in-out;
    cursor: pointer;
  }

  .grid__items:nth-child(6) {
    color: var(--ft-clr-300);
    background-color: var(--input-bg);
  }

  .grid__items:where(:hover, :focus),
  .grid__items:nth-child(6):where(:hover, :focus) {
    color: var(--clr-primary-400);
    background-color: var(--clr-primary-300);
  }

  input,
  input::placeholder {
    color: var(--clr-primary-400);
    text-align: right;
    outline: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (min-width: 50em) {
    .card__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
