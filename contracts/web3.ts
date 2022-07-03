import Web3 from 'web3';

let web3: Web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(process.env.RINKEBY_ENDPOINT!);
  web3 = new Web3(provider);
}

export default web3;
