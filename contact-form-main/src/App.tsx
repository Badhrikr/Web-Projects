import Button from "./components/Button";
import Input from "./components/Input";
import TextArea from "./components/TextArea";

function App() {
  return (
    <main className="flex items-center justify-center bg-primary-lighter min-h-dvh font-primary">
      <div className="flex flex-col justify-center w-11/12 max-w-screen-lg p-6 space-y-6 rounded-2xl bg-neutral">
        <h1 className="text-3xl font-bold text-accent-sc">Contact Us</h1>
        <div className="flex flex-col w-full gap-6 lg:flex-row">
          <Input id="first-name" type="text" label="First Name" />
          <Input id="last-name" type="text" label="Last Name" />
        </div>
        <Input id="email" type="email" label="Email Address" />
        <TextArea id="first-name" label="Message" />
        <Button title="Submit" />
      </div>
    </main>
  );
}

export default App;
