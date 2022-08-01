<script>
  import { createEventDispatcher } from "svelte";

  import { profile } from "../assets/js/picture";

  let src = profile;

  const dispatch = createEventDispatcher();
</script>

<div class={`container rounded-2xl ${$$props.class}`}>
  <div
    class="flex items-center p-8 profile rounded-2xl md:flex-col md:items-start md:h-2/3 md:p-6"
  >
    <img
      {src}
      alt="Jeremy Robson"
      class="w-20 mr-4 border-4 rounded-full profile__img md:mb-8 md:w-16"
    />
    <div class="profile__name md:text-sm">
      Report for
      <span class="block text-2xl font-light text-white md:text-3xl"
        >Jeremy Robson</span
      >
    </div>
  </div>

  <div
    class="flex justify-between px-8 py-6 control-center rounded-2xl md:flex-col md:items-start md:justify-between md:h-1/3"
  >
    <button
      class="text-xl cursor-pointer hover:text-white md:text-sm"
      on:click={() => dispatch("daily")}>Daily</button
    >
    <button
      class="text-xl cursor-pointer hover:text-white md:text-sm"
      on:click={() => dispatch("weekly")}>Weekly</button
    >
    <button
      class="text-xl cursor-pointer hover:text-white md:text-sm"
      on:click={() => dispatch("monthly")}>Monthly</button
    >
  </div>
</div>

<style>
  .container {
    background-color: var(--bg-con);
  }

  .profile {
    background-color: var(--bg-image);
  }

  .profile__img {
    border: 3px solid white;
  }

  button {
    color: var(--ft-400);
  }

  .profile__name {
    color: var(--ft-300);
  }

  .odd {
    grid-row: 1/3;
    grid-column: 1/2;
    height: 100%;
  }

  @media (min-width: 60em) {
    .container {
      max-width: 200px;
    }
  }
</style>
