"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const nem2_library_1 = require("nem2-library");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const PublicAccount_1 = require("../model/account/PublicAccount");
const NamespaceId_1 = require("../model/namespace/NamespaceId");
const NamespaceInfo_1 = require("../model/namespace/NamespaceInfo");
const NamespaceName_1 = require("../model/namespace/NamespaceName");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const NetworkHttp_1 = require("./NetworkHttp");
/**
 * Namespace http repository.
 *
 * @since 1.0
 */
class NamespaceHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(url, networkHttp) {
        networkHttp = networkHttp == null ? new NetworkHttp_1.NetworkHttp(url) : networkHttp;
        super(url, networkHttp);
        this.namespaceRoutesApi = new nem2_library_1.NamespaceRoutesApi(this.apiClient);
    }
    /**
     * Gets the NamespaceInfo for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<NamespaceInfo>
     */
    getNamespace(namespaceId) {
        return this.getNetworkTypeObservable().pipe(operators_1.mergeMap((networkType) => rxjs_1.from(this.namespaceRoutesApi.getNamespace(namespaceId.toHex())).pipe(operators_1.map((namespaceInfoDTO) => {
            return new NamespaceInfo_1.NamespaceInfo(namespaceInfoDTO.meta.active, namespaceInfoDTO.meta.index, namespaceInfoDTO.meta.id, namespaceInfoDTO.namespace.type, namespaceInfoDTO.namespace.depth, this.extractLevels(namespaceInfoDTO.namespace), new NamespaceId_1.NamespaceId(namespaceInfoDTO.namespace.parentId), PublicAccount_1.PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType), new UInt64_1.UInt64(namespaceInfoDTO.namespace.startHeight), new UInt64_1.UInt64(namespaceInfoDTO.namespace.endHeight));
        }))));
    }
    /**
     * Gets array of NamespaceInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<NamespaceInfo[]>
     */
    getNamespacesFromAccount(address, queryParams) {
        return this.getNetworkTypeObservable().pipe(operators_1.mergeMap((networkType) => rxjs_1.from(this.namespaceRoutesApi.getNamespacesFromAccount(address.plain(), queryParams != null ? queryParams : {})).pipe(operators_1.map((namespaceInfosDTO) => {
            return namespaceInfosDTO.map((namespaceInfoDTO) => {
                return new NamespaceInfo_1.NamespaceInfo(namespaceInfoDTO.meta.active, namespaceInfoDTO.meta.index, namespaceInfoDTO.meta.id, namespaceInfoDTO.namespace.type, namespaceInfoDTO.namespace.depth, this.extractLevels(namespaceInfoDTO.namespace), new NamespaceId_1.NamespaceId(namespaceInfoDTO.namespace.parentId), PublicAccount_1.PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType), new UInt64_1.UInt64(namespaceInfoDTO.namespace.startHeight), new UInt64_1.UInt64(namespaceInfoDTO.namespace.endHeight));
            });
        }))));
    }
    /**
     * Gets array of NamespaceInfo for different account
     * @param addresses - Array of Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<NamespaceInfo[]>
     */
    getNamespacesFromAccounts(addresses, queryParams) {
        const publicKeysBody = {
            addresses: addresses.map((address) => address.plain()),
        };
        return this.getNetworkTypeObservable().pipe(operators_1.mergeMap((networkType) => rxjs_1.from(this.namespaceRoutesApi.getNamespacesFromAccounts(publicKeysBody, queryParams != null ? queryParams : {})).pipe(operators_1.map((namespaceInfosDTO) => {
            return namespaceInfosDTO.map((namespaceInfoDTO) => {
                return new NamespaceInfo_1.NamespaceInfo(namespaceInfoDTO.meta.active, namespaceInfoDTO.meta.index, namespaceInfoDTO.meta.id, namespaceInfoDTO.namespace.type, namespaceInfoDTO.namespace.depth, this.extractLevels(namespaceInfoDTO.namespace), new NamespaceId_1.NamespaceId(namespaceInfoDTO.namespace.parentId), PublicAccount_1.PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType), new UInt64_1.UInt64(namespaceInfoDTO.namespace.startHeight), new UInt64_1.UInt64(namespaceInfoDTO.namespace.endHeight));
            });
        }))));
    }
    /**
     * Gets array of NamespaceName for different namespaceIds
     * @param namespaceIds - Array of namespace ids
     * @returns Observable<NamespaceName[]>
     */
    getNamespacesName(namespaceIds) {
        const namespaceIdsBody = {
            namespaceIds: namespaceIds.map((id) => id.toHex()),
        };
        return rxjs_1.from(this.namespaceRoutesApi.getNamespacesNames(namespaceIdsBody)).pipe(operators_1.map((namespaceNamesDTO) => {
            return namespaceNamesDTO.map((namespaceNameDTO) => {
                return new NamespaceName_1.NamespaceName(new NamespaceId_1.NamespaceId(namespaceNameDTO.namespaceId), namespaceNameDTO.name, namespaceNameDTO.parentId ? new NamespaceId_1.NamespaceId(namespaceNameDTO.parentId) : undefined);
            });
        }));
    }
    extractLevels(namespace) {
        const result = [];
        if (namespace.level0) {
            result.push(new NamespaceId_1.NamespaceId(namespace.level0));
        }
        if (namespace.level1) {
            result.push(new NamespaceId_1.NamespaceId(namespace.level1));
        }
        if (namespace.level2) {
            result.push(new NamespaceId_1.NamespaceId(namespace.level2));
        }
        return result;
    }
}
exports.NamespaceHttp = NamespaceHttp;
//# sourceMappingURL=NamespaceHttp.js.map