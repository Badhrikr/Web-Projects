<script>
  import { afterUpdate } from "svelte";

  import appImage from "./assets/images/logo.svg";
  import Bill from "./lib/Bill.svelte";
  import Person from "./lib/Person.svelte";
  import Result from "./lib/result.svelte";
  import TipPercent from "./lib/TipPercent.svelte";

  let percent = 0;
  let value;
  let bill = 0;
  let totalPerson = 0;
  let tipAmount = 0;
  let totalAmount = 0;

  afterUpdate(() => {
    if (bill > 0 && totalPerson > 0) {
      let tipVal = bill * percent;
      tipAmount = (tipVal / totalPerson).toFixed(2);
      totalAmount = ((bill + tipVal) / totalPerson).toFixed(2);
    }
  });

  function resetAll() {
    bill = 0;
    totalPerson = 0;
    percent = 0;
    value = percent;
    tipAmount = 0;
    totalAmount = 0;
  }

  function getCustomPercent(event) {
    percent = event.target.value / 100;
    return percent;
  }
</script>

<img src={appImage} alt="" />
<div class="container">
  <Bill bind:bill />
  <TipPercent
    on:getFivePecent={() => (percent = 5 / 100)}
    on:getTenPercent={() => (percent = 10 / 100)}
    on:getFifteenPercent={() => (percent = 15 / 100)}
    on:getTwentyFivePercent={() => (percent = 25 / 100)}
    on:getFiftyPercent={() => (percent = 50 / 100)}
    on:input={getCustomPercent}
    {value}
  />
  <Person bind:totalPerson />
  <Result bind:tipAmount bind:totalAmount on:reset={resetAll} />
</div>

<style>
  img {
    margin-bottom: 2em;
  }

  @media (min-width: 50em) {
    img {
      margin-top: 3em;
      margin-bottom: 6em;
    }
  }
</style>
