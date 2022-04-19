import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import UsersCollection from '../UsersCollection/UsersCollection';
import About from '../About/About';
import Footer from '../Footer/Footer';
import '../../App.css';

function Home() {
  const [nfts, setNfts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  // Main connection handler
  const connectWallet = async () => {
    // Make sure user installed Metamask
    if(window.ethereum) {
          // Check isLoggedIn bool
          if(isLoggedIn == false) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
              setDefaultAccount(accounts[0]);
              connectHandler();
          } else {
            (isLoggedIn == true && defaultAccount == null) ? disconnectHandler(): window.alert('Please disconnect through Metamask first.');
          }
    } else { //Else user alerted to install Metamask
      setErrorMessage('You need to install Metamask');
      window.alert(errorMessage);
    }
  }

  const getNftData = async () => {
    // Cancel function if no address connected
    if(!defaultAccount) return
    // Get NFT Data from Account
    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0x60f80121c31a0d46b5279700f9df786054aa5ee5`);
    const data = await response.json();
    setNfts(data.items);
    console.log(data);
  
  }

  useEffect(() => {
    getNftData();
  }, [defaultAccount]);


  // Connects address to site
  const connectHandler= () => {
    setConnButtonText('Disconnect');
    setIsLoggedIn(true);
  }
  // Disconnects address from site
  const disconnectHandler = () => {
    setConnButtonText('Connect Wallet');
    setIsLoggedIn(false);
  }
  // Handles account change
  window.ethereum.on("accountsChanged", async (accounts) => {
    setDefaultAccount(accounts[0]);
  });

  return (
    <div className="container">
      <Navbar
        defaultAccount = {defaultAccount}
        errorMessage = {errorMessage}
        setErrorMessage = {setErrorMessage}
        isLoggedIn = {isLoggedIn}
        connButtonText = {connButtonText}
        connectWallet = {connectWallet}
      />
      <Header 
        defaultAccount = {defaultAccount}
        setDefaultAccount = {setDefaultAccount}
      />
      <UsersCollection
        defaultAccount = {defaultAccount}
        isLoggedIn = {isLoggedIn}
        nfts = {nfts}
      /> 
      <About/> 
      <Footer/>
    </div>
  );
}
export default Home;