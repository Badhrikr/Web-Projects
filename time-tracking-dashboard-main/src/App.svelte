<script>
  import Info from "./lib/info.svelte";
  import Profile from "./lib/profile.svelte";
  import dataAPI from "./assets/js/data.json";

  // let dataAPI = "src/assets/js/data.json";
  // fetch(dataAPI)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     data.forEach((item) => {
  //       timeframes = [...timeframes, item.timeframes];
  //       title = [...title, item.title];
  //     });
  //   });

  $: dataAPI.forEach((item) => {
    timeframes = [...timeframes, item.timeframes];
    title = [...title, item.title];
  });

  let title = [];
  let timeframes = [];
  let dailyTime = [];
  let monthlyTime = [];
  let weeklyTime = [];
  let previousTime = ["0", "0", "0", "0", "0", "0"];
  let currentTime = ["0", "0", "0", "0", "0", "0"];

  function daily() {
    currentTime = previousTime = [];

    timeframes.forEach((item) => {
      dailyTime = [...dailyTime, item.daily];
    });

    dailyTime.forEach((item) => {
      currentTime = [...currentTime, item.current];
    });

    dailyTime.forEach((item) => {
      previousTime = [...previousTime, item.previous];
    });
  }

  function weekly() {
    currentTime = previousTime = [];

    timeframes.forEach((item) => {
      weeklyTime = [...weeklyTime, item.weekly];
    });

    weeklyTime.forEach((item) => {
      currentTime = [...currentTime, item.current];
    });

    weeklyTime.forEach((item) => {
      previousTime = [...previousTime, item.previous];
    });
  }

  function monthly() {
    currentTime = previousTime = [];

    timeframes.forEach((item) => {
      monthlyTime = [...monthlyTime, item.monthly];
    });

    monthlyTime.forEach((item) => {
      currentTime = [...currentTime, item.current];
    });

    monthlyTime.forEach((item) => {
      previousTime = [...previousTime, item.previous];
    });
  }
</script>

<div
  class="container flex flex-col items-center justify-center w-11/12 max-w-6xl gap-6"
>
  <Profile
    class="odd"
    on:daily={daily}
    on:weekly={weekly}
    on:monthly={monthly}
  />
  <Info
    category={title[0]}
    duration={currentTime[0]}
    lastDuration={previousTime[0]}
    class="work"
  />
  <Info
    category={title[1]}
    duration={currentTime[1]}
    lastDuration={previousTime[1]}
    class="play"
  />
  <Info
    category={title[2]}
    duration={currentTime[2]}
    lastDuration={previousTime[2]}
    class="study"
  />
  <Info
    category={title[3]}
    duration={currentTime[3]}
    lastDuration={previousTime[3]}
    class="exercise"
  />
  <Info
    category={title[4]}
    duration={currentTime[4]}
    lastDuration={previousTime[4]}
    class="social"
  />
  <Info
    category={title[5]}
    duration={currentTime[5]}
    lastDuration={previousTime[5]}
    class="selfcare"
  />
</div>

<style>
  @media (min-width: 48em) {
    .container {
      display: grid;
      grid-template-columns: repeat(3, 250px);
    }
  }

  @media (min-width: 60em) {
    .container {
      display: grid;
      grid-template-columns: repeat(4, 250px);
    }
  }
</style>
