<script>
  export let checked = false;
</script>

<span class:checked on:click />

<style>
  span {
    width: 20px;
    aspect-ratio: 1/1;
    background-color: transparent;
    border: 1px solid var(--ft-clr-300);
    border-radius: 50%;
    cursor: pointer;
  }

  .checked {
    position: relative;
    background: linear-gradient(90deg, var(--clr-bg-start), var(--clr-bg-end));
    border: none;
  }

  .checked::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(../../assets/images/icon-check.svg);
    background-repeat: no-repeat;
    background-position: center;
  }

  @media (min-width: 50em) {
    span {
      width: 25px;
    }
  }
</style>
