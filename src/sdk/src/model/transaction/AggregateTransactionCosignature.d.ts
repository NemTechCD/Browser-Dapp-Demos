import { PublicAccount } from '../account/PublicAccount';
/**
 * Model representing cosignature of an aggregate transaction.
 */
export declare class AggregateTransactionCosignature {
    /**
                 * The signature of aggregate transaction done by the cosigner.
                 */ readonly signature: string;
    /**
     * The cosigner public account.
     */
    readonly signer: PublicAccount;
    /**
     * @param signature
     * @param signer
     */
    constructor(/**
                     * The signature of aggregate transaction done by the cosigner.
                     */ signature: string, 
        /**
         * The cosigner public account.
         */
        signer: PublicAccount);
}