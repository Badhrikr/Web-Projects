import Image from "next/image";
import { OurServicesCardProps } from "./model";

function OurServicesCard(props: OurServicesCardProps) {
  const { img, title, desc } = props;

  return (
    <div className="font-primary flex flex-col gap-6">
      <Image src={img} alt="image" height="85" width="85" />
      <div className="flex flex-col gap-1 ">
        <h3 className="font-medium text-base text-theme-secondary-800">
          {title}
        </h3>
        <h4 className="font text-sm text-theme-secondary-600">{desc}</h4>
      </div>
    </div>
  );
}

export default OurServicesCard;
