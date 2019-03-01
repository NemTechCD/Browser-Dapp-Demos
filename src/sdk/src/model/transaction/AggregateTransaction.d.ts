import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { AggregateTransactionCosignature } from './AggregateTransactionCosignature';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Aggregate innerTransactions contain multiple innerTransactions that can be initiated by different accounts.
 */
export declare class AggregateTransaction extends Transaction {
    /**
     * The array of innerTransactions included in the aggregate transaction.
     */
    readonly innerTransactions: InnerTransaction[];
    /**
     * The array of transaction cosigners signatures.
     */
    readonly cosignatures: AggregateTransactionCosignature[];
    /**
     * @param networkType
     * @param type
     * @param version
     * @param deadline
     * @param fee
     * @param innerTransactions
     * @param cosignatures
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, type: number, version: number, deadline: Deadline, fee: UInt64, 
        /**
         * The array of innerTransactions included in the aggregate transaction.
         */
        innerTransactions: InnerTransaction[], 
        /**
         * The array of transaction cosigners signatures.
         */
        cosignatures: AggregateTransactionCosignature[], signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create an aggregate complete transaction object
     * @param deadline - The deadline to include the transaction.
     * @param innerTransactions - The array of inner innerTransactions.
     * @param networkType - The network type.
     * @param cosignatures
     * @returns {AggregateTransaction}
     */
    static createComplete(deadline: Deadline, innerTransactions: InnerTransaction[], networkType: NetworkType, cosignatures: AggregateTransactionCosignature[]): AggregateTransaction;
    /**
     * Create an aggregate bonded transaction object
     * @param {Deadline} deadline
     * @param {InnerTransaction[]} innerTransactions
     * @param {NetworkType} networkType
     * @param {AggregateTransactionCosignature[]} cosignatures
     * @return {AggregateTransaction}
     */
    static createBonded(deadline: Deadline, innerTransactions: InnerTransaction[], networkType: NetworkType, cosignatures?: AggregateTransactionCosignature[]): AggregateTransaction;
    /**
     * Check if account has signed transaction
     * @param publicAccount - Signer public account
     * @returns {boolean}
     */
    signedByAccount(publicAccount: PublicAccount): boolean;
}
