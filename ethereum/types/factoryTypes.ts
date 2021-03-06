import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(options: SendOptions, callback: (error: Error, result: any) => void): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(options: EstimateGasOptions, callback: (error: Error, result: any) => void): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(options: CallOptions, callback: (error: Error, result: TCallReturn) => void): Promise<TCallReturn>;
  encodeABI(): string;
}

export type MethodReturnContext = MethodPayableReturnContext;

export type ContractContext = Web3ContractContext<FactoryTypes, FactoryTypesMethodNames, FactoryTypesEventsContext, FactoryTypesEvents>;
export type FactoryTypesEvents = undefined;
export interface FactoryTypesEventsContext {}
export type FactoryTypesMethodNames = 'deployNewCampaign' | 'deployedCampaigns' | 'getDeployedCampaigns';
export interface FactoryTypes {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minimumContribution Type: uint256, Indexed: false
   */
  deployNewCampaign(minimumContribution: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  deployedCampaigns(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getDeployedCampaigns(): MethodConstantReturnContext<string[]>;
}
