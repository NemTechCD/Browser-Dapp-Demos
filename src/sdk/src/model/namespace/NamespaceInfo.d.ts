import { PublicAccount } from '../account/PublicAccount';
import { UInt64 } from '../UInt64';
import { NamespaceId } from './NamespaceId';
/**
 * Object containing information of a namespace.
 */
export declare class NamespaceInfo {
    /**
                 * Namespace is active.
                 */ readonly active: boolean;
    /**
     * The namespace index.
     */
    readonly index: number;
    /**
     * The meta data id.
     */
    readonly metaId: string;
    /**
     * The namespace type, namespace and sub namespace.
     */
    private readonly type;
    /**
     * The level of namespace.
     */
    readonly depth: number;
    /**
     * The namespace id levels.
     */
    readonly levels: NamespaceId[];
    /**
     * The namespace parent id.
     */
    private readonly parentId;
    /**
     * The owner of the namespace.
     */
    readonly owner: PublicAccount;
    /**
     * The height at which the ownership begins.
     */
    readonly startHeight: UInt64;
    /**
     * The height at which the ownership ends.
     */
    readonly endHeight: UInt64;
    /**
     * @param active
     * @param index
     * @param metaId
     * @param type
     * @param depth
     * @param levels
     * @param parentId
     * @param owner
     * @param startHeight
     * @param endHeight
     */
    constructor(/**
                     * Namespace is active.
                     */ active: boolean, 
        /**
         * The namespace index.
         */
        index: number, 
        /**
         * The meta data id.
         */
        metaId: string, 
        /**
         * The namespace type, namespace and sub namespace.
         */
        type: number, 
        /**
         * The level of namespace.
         */
        depth: number, 
        /**
         * The namespace id levels.
         */
        levels: NamespaceId[], 
        /**
         * The namespace parent id.
         */
        parentId: NamespaceId, 
        /**
         * The owner of the namespace.
         */
        owner: PublicAccount, 
        /**
         * The height at which the ownership begins.
         */
        startHeight: UInt64, 
        /**
         * The height at which the ownership ends.
         */
        endHeight: UInt64);
    /**
     * Namespace id
     * @returns {Id}
     */
    readonly id: NamespaceId;
    /**
     * Is root namespace
     * @returns {boolean}
     */
    isRoot(): boolean;
    /**
     * Is sub namepsace
     * @returns {boolean}
     */
    isSubnamespace(): boolean;
    /**
     * Get parent id
     * @returns {Id}
     */
    parentNamespaceId(): NamespaceId;
}
