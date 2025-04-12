export interface MessageBoxProps {
    focus?: boolean;
    onSend?(message: string): void;
}