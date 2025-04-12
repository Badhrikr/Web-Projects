import Image from "next/image";
import { sourceTech } from "../../../../helpers/dummy-data";

function SourceTechnologies() {
  return (
    <div className="px-28">
      <h2 className="font-primary text-theme-secondary text-lg font-semibold">
        Source Technologies
      </h2>

      <div className="flex gap-10 mt-8">
        {sourceTech.map((source) => (
          <div className="flex flex-col items-center justify-around px-4 gap-2">
            <Image
              className="my-auto rounded-[10px]"
              src={source.img}
              alt={source.name}
              height={80}
              width={80}
            />
            <span className="text-theme-secondary font-primary">
              {source.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SourceTechnologies;
