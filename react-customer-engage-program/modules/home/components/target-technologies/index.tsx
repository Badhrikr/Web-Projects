import Image from "next/image";
import { targetTech } from "../../../../helpers/dummy-data";

function TargetTechnologies() {
  return (
    <div className="px-28">
      <h2 className="font-primary text-theme-secondary text-lg font-semibold">
        Target Technologies
      </h2>

      <div className="flex gap-10 mt-8">
        {targetTech.map((target) => (
          <div className="flex flex-col items-center justify-around px-4 gap-2">
            <Image
              className="my-auto rounded-[10px]"
              src={target.img}
              alt={target.name}
              height={70}
              width={70}
            />
            <span className="text-theme-secondary font-primary">
              {target.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TargetTechnologies;
