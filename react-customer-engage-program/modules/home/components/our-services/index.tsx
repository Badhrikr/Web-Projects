import OurServicesCard from "../our-services-card";
import { services } from "./constants";

function OurServices() {
  return (
    <div className="font-primary px-20 lg:px-28 py-5 text-lg">
      <h2 className="text-theme-secondary text-lg font-semibold"> Our Services </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 justify-around gap-10 mt-8">
        {services.map((service) => (
          <OurServicesCard {...service} />
        ))}
      </div>
    </div>
  );
}

export default OurServices;
