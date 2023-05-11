import { useRef } from "react";
import { ImageUploaderProps } from "./model";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { toast } from "react-toastify";

function ImageUploader({ imageLink, onChange }: ImageUploaderProps) {
  const [imageSrc, setImageSrc] = useState(imageLink);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dragToggle = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setDragOver(!dragOver);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const imageDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.dataTransfer);

    const data = event.dataTransfer.getData("text");
    console.log(data);
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve: (value: any) => void, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  };

  const fileChangeHandler = async (e: React.ChangeEvent) => {
    let file = (e.target as HTMLInputElement)?.files?.[0];
    if (!file || !file.type.includes("image")) {
      toast.error("Please select Image file", { autoClose: 2000 });
      return;
    }

    await toBase64(file).then((res: string) => {
      setImageSrc(res);
    });

    onChange?.(file);
  };

  useEffect(() => {
    setImageSrc(imageSrc);
  }, [imageLink]);

  return (
    <div>
      {imageSrc ? (
        <div className="flex gap-4 items-center pt-3 px-3">
          <Image src={imageSrc} alt="image" height={45} width={45} />
          <Button
            size="sm"
            theme="secondary"
            buttonThemeStyle="outlined"
            onClick={() => fileInputRef?.current?.click()}
          >
            Change
          </Button>
        </div>
      ) : (
        <div
          onDragEnter={dragToggle}
          onDragLeave={dragToggle}
          onDragOver={allowDrop}
          onDrop={imageDropHandler}
          className={`relative flex items-center justify-center px-2 py-8 border-2 border-dashed border-spacing-2 rounded-md ${
            dragOver ? " border-[#458eff] " : " border-gray-400 "
          }`}
        >
          <div className="text-center">
            <span className=" text-center text-[#458eff] font-semibold text-sm">
              <label htmlFor="file" className="cursor-pointer">
                Upload image
              </label>{" "}
              <span className="font-medium text-theme-secondary">
                or drag and drop <br /> image file upto 10mb
              </span>
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        id="file"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={fileChangeHandler}
      />
    </div>
  );
}

export default ImageUploader;
