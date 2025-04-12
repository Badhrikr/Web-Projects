export interface DefaultSchedulerProps {
    migrationRequestId: string;
    onCancel?(): void;
    onSubmit?(): void;
}