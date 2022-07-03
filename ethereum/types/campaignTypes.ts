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

export type ContractContext = Web3ContractContext<CampaignTypes, CampaignTypesMethodNames, CampaignTypesEventsContext, CampaignTypesEvents>;
export type CampaignTypesEvents = undefined;
export interface CampaignTypesEventsContext {}
export type CampaignTypesMethodNames =
  | 'new'
  | 'approveRequest'
  | 'approvers'
  | 'approversCount'
  | 'contribute'
  | 'createRequest'
  | 'finalizeRequest'
  | 'getRequestsCount'
  | 'getSummary'
  | 'manager'
  | 'minimumContribution'
  | 'requests';
export interface GetSummaryResponse {
  minContribution: string;
  contractBalance: string;
  requestsCount: string;
  contributorsCount: string;
  managerAddress: string;
}
export interface RequestsResponse {
  description: string;
  value: string;
  recipient: string;
  isCompleted: boolean;
  approvalCount: string;
}
export interface CampaignTypes {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param minimum Type: uint256, Indexed: false
   * @param creator Type: address, Indexed: false
   */
  'new'(minimum: string, creator: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestIndex Type: uint256, Indexed: false
   */
  approveRequest(requestIndex: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  approvers(parameter0: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  approversCount(): MethodConstantReturnContext<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  contribute(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param description Type: string, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  createRequest(description: string, value: string, recipient: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestIndex Type: uint256, Indexed: false
   */
  finalizeRequest(requestIndex: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getRequestsCount(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSummary(): MethodConstantReturnContext<GetSummaryResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  manager(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minimumContribution(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  requests(parameter0: string): MethodConstantReturnContext<RequestsResponse>;
}
