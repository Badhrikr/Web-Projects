import { InputProps } from "../Input/model";

interface TextareaProps extends InputProps {
    rows?: number;
    cols?: number;
}

type InputThemeStyle = "ghost" | "outline" | "bottom-lined";


export type { InputThemeStyle, TextareaProps }