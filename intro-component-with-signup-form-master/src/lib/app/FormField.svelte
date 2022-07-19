<script>
  import Button from "../components/Button.svelte";
  import TextInput from "../components/TextInput.svelte";

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let formIsValid = false;

  function isEmpty(val) {
    return val.trim().length === 0;
  }

  function isValidEmail(val) {
    return new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    ).test(val);
  }

  function isValidPassword(val) {
    return new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ).test(val);
  }

  $: validFirstName = !isEmpty(firstName);
  $: validLastName = !isEmpty(lastName);
  $: validEmail = isValidEmail(email);
  $: validPassword = isValidPassword(password);
  $: formIsValid =
    validFirstName && validLastName && validEmail && validPassword;
</script>

<div class="container">
  <div class="plan">
    <p><span>Try it free 7 days</span> then $20/mo. thereafter</p>
  </div>
  <div class="form-control">
    <TextInput
      type="text"
      placeholder="First Name"
      value={firstName}
      valid={validFirstName}
      validityMessage="[Field Name] cannot be empty"
      on:input={(event) => {
        firstName = event.target.value;
      }}
    />
    <TextInput
      type="text"
      placeholder="Last Name"
      value={lastName}
      valid={validLastName}
      validityMessage="[Field Name] cannot be empty"
      on:input={(event) => {
        lastName = event.target.value;
      }}
    />
    <TextInput
      type="email"
      placeholder="Email Address"
      value={email}
      valid={validEmail}
      validityMessage="Looks like this is not an email"
      on:input={(event) => {
        email = event.target.value;
      }}
    />
    <TextInput
      type="password"
      placeholder="Password"
      value={password}
      valid={validPassword}
      validityMessage="Your password must be at least 8 characters [1 lowercase, 1 uppercase, 1 numeric]"
      on:input={(event) => {
        password = event.target.value;
      }}
    />
    <Button disabled={!formIsValid} />

    <p class="terms">
      By clicking the button, you are agreeing to our
      <span>Terms and Services</span>
    </p>
  </div>
</div>

<style>
  .plan {
    margin-bottom: 2em;
    padding: 1.2em;
    background-color: var(--clr-primary-400);
    border-radius: 0.7rem;
    box-shadow: 0 8px rgba(0, 0, 0, 0.2);
  }

  .plan p {
    width: 70%;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
  }

  .plan p span {
    color: inherit;
    font-weight: 600;
  }

  .form-control {
    padding: 2em;
    background-color: #fff;
    border-radius: 0.7rem;
    box-shadow: 0 8px rgba(0, 0, 0, 0.2);
  }

  p {
    width: 90%;
    margin: 0 auto;
    color: var(--ft-clr-neutral);
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
  }

  p span {
    color: var(--clr-bg);
    font-weight: 600;
  }

  p span:hover {
    cursor: pointer;
  }

  @media (min-width: 50em) {
    .plan {
      margin-bottom: 1.8em;
    }

    .form-control {
      padding: 2.4em;
    }

    .terms {
      margin-top: 1em;
      font-size: 0.7rem;
    }
  }
</style>
