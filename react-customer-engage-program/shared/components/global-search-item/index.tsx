import Image from "next/image";
import { useRouter } from "next/router";
import { GlobalSearchItemProps } from "./model";

function GlobalSearchItem(props: GlobalSearchItemProps) {
  const { desc, image, link, title } = props;

  const router = useRouter();

  return (
    <div
      className="cursor-pointer flex items-center gap-3 px-2 py-1"
      onClick={() => router.push(link)}
    >
      <div>
        <Image src={image} alt="title" height={25} width={25} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-theme-secondary-650">
          {title}
        </h3>
        <h4 className="text-sm font-medium text-theme-secondary-600">{desc}</h4>
      </div>
    </div>
  );
}

export default GlobalSearchItem;
