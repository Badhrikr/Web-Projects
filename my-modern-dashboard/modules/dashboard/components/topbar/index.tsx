import React from "react";
import Button from "../../../../ui-components/Button";

const TopBar = () => {
  return (
    <div className="flex items-center justify-center gap-4 p-2 bg-theme-background-nav font-primary">
      <p className="text-theme-primary">
        Winter Special 35% Discount to Horizon PRO | Limited offer - Lifetime
        access
      </p>
      <Button size="sm" theme="primary" buttonThemeStyle="raised">
        Grab Offer
      </Button>
    </div>
  );
};

export default TopBar;
