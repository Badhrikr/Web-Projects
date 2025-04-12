import React, { useState } from "react";
import Input from "../../../../ui-components/Input";
import IconButton from "../../../../ui-components/IconButton";
import { send } from "../../../../helpers/icons";
import Icon from "../../../../ui-components/Icon";

function Chatbox({
  onSubmit,
  loading = false,
}: {
  onSubmit?(message: string): void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery((e.target as HTMLInputElement).value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length === 0) return;

    setQuery("");
    onSubmit?.(query);
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-2 items-center">
      <Input
        size="sm"
        theme="secondary"
        className=""
        inputStyle="bottom-lined"
        value={query}
        autoFocus
        placeholder="How can I help you ?"
        onChangeEvent={handleChange}
      />
      <div className="-rotate-45">
        <IconButton
          disabled={loading}
          type="submit"
          theme="secondary"
          size="sm"
          color="elevate"
        >
          <Icon icon={send} theme="secondary" size="sm" />
        </IconButton>
      </div>
    </form>
  );
}

export default Chatbox;
