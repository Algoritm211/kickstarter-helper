import Web3 from "web3";
import {TransactionReceipt} from "ethereum-abi-types-generator";


function parseError(err: string){
  const errObjOpener = err.indexOf('{')
  const errObjCloser = err.lastIndexOf('}')
  const jsonErrorString = err.substring(errObjOpener, errObjCloser + 1);
  return JSON.parse(jsonErrorString);
}

export const getValidationError = async (web3: Web3, err: string) => {
  const parsedError = parseError(err);

  const txHash = parsedError.transactionHash;

  try {
    const tx = await web3.eth.getTransaction(txHash)
    let result = await web3.eth.call(tx as unknown as TransactionReceipt, tx.blockNumber!)
    result = result.startsWith('0x') ? result : `0x${result}`

    if (result && result.slice(138)) {
      const reason = web3.utils.toAscii(result.slice(138))
      console.log(reason)
      console.log('Revert reason:', reason)
      // return `Revert reason: ${reason}`
    } else {
      console.log('Cannot get reason - No return value')
    }
  } catch (error) {
    return (error as Error).message
  }
}
