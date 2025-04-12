interface ReceiveMessageforSpecificRole {
    /*
    * JSON string of any 
    */
    data: any;
    message: string;
    /*
    * JSON string of NotificationObject 
    */
    notification: string;
}

interface ReceiveMessageforSpecificUser extends ReceiveMessageforSpecificRole {

}

export type { ReceiveMessageforSpecificRole, ReceiveMessageforSpecificUser };