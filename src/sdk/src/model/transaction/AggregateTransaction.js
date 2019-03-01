"use strict";
/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nem2_library_1 = require("nem2-library");
const UInt64_1 = require("../UInt64");
const SignedTransaction_1 = require("./SignedTransaction");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
/**
 * Aggregate innerTransactions contain multiple innerTransactions that can be initiated by different accounts.
 */
class AggregateTransaction extends Transaction_1.Transaction {
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
    constructor(networkType, type, version, deadline, fee, 
    /**
     * The array of innerTransactions included in the aggregate transaction.
     */
    innerTransactions, 
    /**
     * The array of transaction cosigners signatures.
     */
    cosignatures, signature, signer, transactionInfo) {
        super(type, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.innerTransactions = innerTransactions;
        this.cosignatures = cosignatures;
    }
    /**
     * Create an aggregate complete transaction object
     * @param deadline - The deadline to include the transaction.
     * @param innerTransactions - The array of inner innerTransactions.
     * @param networkType - The network type.
     * @param cosignatures
     * @returns {AggregateTransaction}
     */
    static createComplete(deadline, innerTransactions, networkType, cosignatures) {
        return new AggregateTransaction(networkType, TransactionType_1.TransactionType.AGGREGATE_COMPLETE, 2, deadline, new UInt64_1.UInt64([0, 0]), innerTransactions, cosignatures);
    }
    /**
     * Create an aggregate bonded transaction object
     * @param {Deadline} deadline
     * @param {InnerTransaction[]} innerTransactions
     * @param {NetworkType} networkType
     * @param {AggregateTransactionCosignature[]} cosignatures
     * @return {AggregateTransaction}
     */
    static createBonded(deadline, innerTransactions, networkType, cosignatures = []) {
        return new AggregateTransaction(networkType, TransactionType_1.TransactionType.AGGREGATE_BONDED, 2, deadline, new UInt64_1.UInt64([0, 0]), innerTransactions, cosignatures);
    }
    /**
     * @internal
     * @returns {AggregateTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.AggregateTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addType(this.type)
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addTransactions(this.innerTransactions.map((transaction) => {
            return transaction.aggregateTransaction();
        })).build();
    }
    /**
     * @internal
     * Sign transaction with cosignatories creating a new SignedTransaction
     * @param initiatorAccount - Initiator account
     * @param cosignatories - The array of accounts that will cosign the transaction
     * @returns {SignedTransaction}
     */
    signTransactionWithCosignatories(initiatorAccount, cosignatories) {
        const aggregateTransaction = this.buildTransaction();
        const signedTransactionRaw = aggregateTransaction.signTransactionWithCosigners(initiatorAccount, cosignatories);
        return new SignedTransaction_1.SignedTransaction(signedTransactionRaw.payload, signedTransactionRaw.hash, initiatorAccount.publicKey, this.type, this.networkType);
    }
    /**
     * Check if account has signed transaction
     * @param publicAccount - Signer public account
     * @returns {boolean}
     */
    signedByAccount(publicAccount) {
        return this.cosignatures.find((cosignature) => cosignature.signer.equals(publicAccount)) !== undefined
            || (this.signer !== undefined && this.signer.equals(publicAccount));
    }
}
exports.AggregateTransaction = AggregateTransaction;
//# sourceMappingURL=AggregateTransaction.js.map