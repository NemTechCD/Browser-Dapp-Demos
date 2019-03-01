/**
 * An abstract message class that serves as the base class of all message types.
 */
export declare abstract class Message {
    /**
                 * Message type
                 */ readonly type: number;
    /**
     * Message payload
     */
    readonly payload: string;
}