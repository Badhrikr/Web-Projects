import Image from "next/image";
import { tools } from "../../../../helpers/dummy-data";
import { right_arrow } from "../../../../helpers/icons";
import Icon from "../../../../ui-components/Icon";

function MigrationServices() {
  return (
    <div className="px-28">
      <h2 className="font-primary text-theme-secondary text-lg font-semibold">Migration Services</h2>

      <div className="flex gap-4 items-center mt-8">
        {tools.map((tool) => (
          <div className="elevate flex items-center justify-center gap-4 bg-theme-background-elevate shadow-lg px-4 py-2 rounded-md">
            <Image
              src={tool.sourceTechImg}
              alt={tool.source}
              height={80}
              width={80}
              className="rounded-[10px]"
            />
            <Icon icon={right_arrow} theme="secondary" size="sm" />
            <Image
              src={tool.targetTechImg}
              alt={tool.target}
              height={80}
              width={80}
              className="rounded-[10px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MigrationServices;
