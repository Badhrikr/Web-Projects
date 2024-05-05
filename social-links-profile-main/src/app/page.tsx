import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Frontend Mentor | Social links profile",
  description: "Frontend Mentor | Social links profile",
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

export default function Home() {
  const socialMedias = [
    "GitHub",
    "Frontend Mentor",
    "LinkedIn",
    "Twitter",
    "Instagram",
  ];
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-3 bg-bg-primary">
      <div className="flex flex-col items-center w-[85%] max-w-xs p-8  bg-bg-secondary rounded-xl space-y-5">
        <Image
          src={"/images/avatar-jessica.jpeg"}
          alt="Jessica Randall Avatar"
          width={90}
          height={90}
          className="rounded-full md:w-20 md:mb-2"
        />
        <div className="text-center">
          <h1 className="mb-1 text-2xl font-semibold text-neutral md:text-xl">
            Jessica Randall
          </h1>
          <p className="text-sm font-semibold text-primary md:text-xs ">
            London, United Kingdom
          </p>
        </div>
        <div className="text-xs text-neutral">
          &quot;Front-end developer and avid reader.&quot;
        </div>
        <div className="flex flex-col w-full gap-4 md:gap-3">
          {socialMedias.map((socialMedia) => (
            <button
              className="w-full py-3 text-sm font-semibold transition-all duration-300 rounded-md md:text-xs hover:text-bg-primary bg-bg-button text-neutral hover:bg-primary"
              key={socialMedia}
            >
              {socialMedia}
            </button>
          ))}
        </div>
      </div>
      <div className="text-sm text-center attribution text-neutral text-balance">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="text-primary"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/badhrikr22/"
          className="text-primary"
        >
          Badhri Kesava Raja SM
        </a>
        .
      </div>
    </main>
  );
}
