<script>
  import logo from "./assets/images/logo.svg";
  import src from "./assets/images/hero-mobile.jpg";
  import srcset from "./assets/images/hero-desktop.jpg";

  import Description from "./lib/description.svelte";
</script>

<img class="logo" src={logo} alt="Base Apparel Logo" />

<picture>
  <source media="(min-width: 50em)" {srcset} />
  <img class="hero-img" {src} alt="A Woman posing" />
</picture>

<div class="container">
  <Description />
</div>

<style>
  .container {
    width: 90%;
    margin-top: 2em;
  }

  .logo {
    align-self: start;
    width: 153px;
    padding: 1.8em;
  }

  picture,
  picture img,
  picture source {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (min-width: 50em) {
    .container {
      padding: 5em;
      align-self: center;
    }

    .logo {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(153 * 1.5px);
      margin-top: 2.2em;
      margin-left: 8.3em;
    }
  }
</style>
