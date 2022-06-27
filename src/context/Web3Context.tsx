import React, {useEffect, useState} from "react";


interface Web3ContextProps {
  userWallet: string;
  isWalletConnected: boolean;
}

export const Web3Context = React.createContext<Web3ContextProps>({
  userWallet: '',
  isWalletConnected: false,
})

type Props = {
  children: React.ReactNode;
}

export const Web3ContextProvider: React.FC<Props> = ({children}) => {
  const [userWallet, setUserWallet] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const checkIsConnected = async () => {
    const {ethereum} = window
    try {
      const accounts = await ethereum.request({method: 'eth_accounts'});

      if (accounts.length !== 0) {
        setUserWallet(accounts[0]);
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.log('Something wrong checking wallet connection')
    }

  };

  useEffect(() => {
    if (window.ethereum) {
      void checkIsConnected()
    }
  }, [])

  return (
    <Web3Context.Provider value={{userWallet, isWalletConnected}}>
      {children}
    </Web3Context.Provider>
  )
}
