export interface RequestMessage {
    address: string;
    chain: string;
    network: string;
}
export declare function requestMessage({ address, chain, networkType, }: {
    address: string;
    chain?: string;
    networkType: 'evm' | 'solana';
}): Promise<string>;
export interface VerifyMessage {
    network: string;
    signature: string;
    message: string;
}
export declare function verifyMessage({ network, signature, message }: VerifyMessage): Promise<unknown>;
