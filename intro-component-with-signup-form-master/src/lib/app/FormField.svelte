<script>
  import TextInput from "../components/TextInput.svelte";

  let buttonValue = "Claim your free trial";

  let firstName = "";
  let validFirstName = false;
  let lastName = "";
  let validLastName = false;
  let email = "";
  let validEmail = false;
  let password = "";
  let validPassword = false;

  function isEmpty(val) {
    return val.trim().length === 0;
  }

  function isValidEmail(val) {
    return new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    ).test(val);
  }

  function isValidPassword(val) {
    return new RegExp("/^[a-zA-Z0-9!@#$%^&*]{6,16}$/").test(val);
  }

  $: validFirstName = !isEmpty(firstName);
  $: validLastName = !isEmpty(lastName);
  $: validEmail = isValidEmail(email);
  $: validPassword = isValidPassword(password);
</script>

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
  />
  <TextInput
    type="text"
    placeholder="Last Name"
    value={lastName}
    valid={validLastName}
    validityMessage="[Field Name] cannot be empty"
  />
  <TextInput
    type="email"
    placeholder="Email Address"
    value={email}
    valid={validEmail}
    validityMessage="Looks like this is not an email"
  />
  <TextInput
    type="password"
    placeholder="Password"
    value={password}
    valid={validPassword}
    validityMessage="Please enter a valid input"
  />
  <TextInput type="submit" value={buttonValue} />

  <p>
    By clicking the button, you are agreeing to our
    <span>Terms and Services</span>
  </p>
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
</style>
