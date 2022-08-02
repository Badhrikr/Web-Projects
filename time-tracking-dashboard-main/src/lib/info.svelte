<script>
  import Img from "../assets/images/icon-ellipsis.svg";
  // import { picture } from "../assets/js/picture";
  // let img = picture;

  export let category;
  export let duration;
  export let lastDuration;
</script>

<div class={`container bg-no-repeat rounded-2xl  pt-2 ${$$props.class}`}>
  <div
    class="flex flex-col items-center justify-between mt-8 p-7 rounded-2xl category-content"
  >
    <div class="flex items-center justify-between w-full mb-2">
      <h1 class="md:text-xl">{category}</h1>
      <img src={Img} class="cursor-pointer " alt="A Menu Button" />
    </div>

    <div class="flex items-center justify-between w-full md:block">
      <p class="text-3xl font-light category-duration md:text-6xl md:mb-2">
        {duration}hrs
      </p>
      <p class="last">Last Week - {lastDuration}hrs</p>
    </div>
  </div>
</div>

<style>
  .container {
    background-position: top -0.5em right 1.2em;
  }

  .category-content {
    color: #fff;
    background-color: var(--bg-con);
  }

  .last {
    color: var(--ft-300);
  }

  .work {
    background-color: var(--bg-work);
    background-image: url(../assets/images/icon-work.svg);
  }

  .play {
    background-color: var(--bg-play);
    background-image: url(../assets/images/icon-play.svg);
    background-position: top -0.2em right 1.2em;
  }

  .exercise {
    background-color: var(--bg-exercise);
    background-image: url(../assets/images/icon-exercise.svg);
    background-position: top right 1.2em;
  }

  .selfcare {
    background-color: var(--bg-selfcare);
    background-image: url(../assets/images/icon-self-care.svg);
  }

  .social {
    background-color: var(--bg-social);
    background-image: url(../assets/images/icon-social.svg);
    background-position: top -0.8em right 1.2em;
  }

  .study {
    background-color: var(--bg-study);
    background-image: url(../assets/images/icon-study.svg);
  }

  @media (min-width: 60em) {
    .container {
      max-width: 250px;
    }
  }
</style>
