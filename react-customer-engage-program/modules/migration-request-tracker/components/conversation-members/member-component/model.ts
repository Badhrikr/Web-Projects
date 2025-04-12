export interface MemberComponentProps {
    firstname: string; 
    lastname: string; 
    useremail: string;
    userId?: string;

    migrationRequestId: string;
    onMemberAdd?(): void;
}