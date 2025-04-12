import Image from "next/image";

function Banner() {
  return (
    <div className="bg-theme-background-secondary font-secondary flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-center px-0 lg:px-28 py-4">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-theme-secondary text-lg">
          Welcome to,
        </h4>
        <h1 className="font-semibold text-theme-secondary-800 text-2xl mt-2">
          Digital Client Engagement Program
        </h1>
        <h2 className="font-medium text-theme-secondary-600 text-lg mt-0.5">
          Innovative digital transformation powered by in-depth expertise and{" "}
          <br className="hidden md:block" />
          exceptional engagement.
        </h2>
      </div>

      <div>
        <Image
          priority
          src="/assets/hero-image.svg"
          alt="hero Image"
          height={310}
          width={310}
        />
      </div>
    </div>
  );
}

export default Banner;
