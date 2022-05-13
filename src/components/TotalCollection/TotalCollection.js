import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import "../VaultCollection/VaultCollection.css"
import theVault from '../../artifacts/contracts/TheVault.sol/TheVault.json';

function TotalCollection() {
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState();

    const theVaultAddress = "0x23256e659563dE6dB1E9D73e2E1a94DF922919BD";
   
     // Get Vault NFTS
     async function getBalanceOf() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(theVaultAddress, theVault.abi, signer);

        try {
            const response = await contract.getArrayElements();
            const _balance = response.length;
            setBalance(_balance);
            
        } catch(err) {
            console.log('error: ', err);
        }
    }

    
    useEffect(() => {
        getBalanceOf()
        
    }, []);

    return (
        <div>
           <h1>The Vault Balance: {balance} </h1>    
        </div>
    )
}

export default TotalCollection;