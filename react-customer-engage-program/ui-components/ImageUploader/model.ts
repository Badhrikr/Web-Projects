interface ImageUploaderProps {
    imageLink?: string;
    onChange?(file: File): void;
}

export type { ImageUploaderProps } 