import React, { useEffect, useState } from 'react';
import Web3 from 'web3'

import { ConnectWallet } from "../ConnectWallet";
import { Requirements } from "../Requirements";
import { GreenCheck, RedCross } from "../Icons";

import './Magicwall.css';

import ERC721_ABI from "../../data/ERC721_ABI";

export const Magicwall = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [address, setAddress] = useState(null);
    const [validated, setValidated] = useState(false);

    let web3 = new Web3(Web3.givenProvider);

    useEffect(() => {
        if (address != null) {
            checkValidAddress().then((valid) => {
                setValidated(valid);
                setAuthenticated(true);
            })
        }
    }, [address]);

    useEffect(() => {
        const getAccounts = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                const account = accounts[0];
                setAddress(account);
            }
        }
        getAccounts();
    })

    const checkValidAddress = async () => {

        // Allow ERC721 
        const contract = new web3.eth.Contract(ERC721_ABI, '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');
        contract.defaultAccount = address;
        const ensBalance = await contract.methods.balanceOf(address).call();

        if (ensBalance >= 1) {
            return true;
        }

        // // Allow eth 
        // const balance = await web3.eth.getBalance(address);
        // if (Web3.utils.fromWei(balance) >= 0.0019) {
        //     return true;
        // }

        // // Allow whitelist by addr
        // if (address == '0xcf5751d8a71f56b4e08d04f3c37f95aaeed93070') {
        //     return true;
        // }

        return false;
    }

    const ethEnabled = async () => {

        if (typeof window.ethereum !== 'undefined') {
            // Instance web3 with the provided information from the MetaMask provider information
            web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                window.web3 = new Web3(window.ethereum);
            } catch (e) {
                // User denied access
                setAuthenticated(false);
            }

        }
    }

    window.ethereum.on("accountsChanged", async function (accounts) {
        if (accounts.length == 0) {
            setAuthenticated(false);
            setValidated(false);
            setAddress(null);
        } else {
            setAddress(accounts[0]);
        }
    });

    return (<>

        {(!authenticated && !validated) &&
            <div className="Magicwall__container">
                <p className="Magicwall__title">Get Your ENS Conference Tickets!</p>
                <p className="Magicwall__secondary-text">This event is tokengated — please check in below.</p>
                <Requirements />
                <ConnectWallet action={ethEnabled} text="Connect Wallet" />
            </div>}

        {(authenticated && validated) &&
            <div className="Magicwall__container">
                <p className="Magicwall__title"><GreenCheck /> Success! Grab your Tickets.</p>
                <p className="Magicwall__address-text">Your address: <code className="Magicwall__address">{address}</code></p>
                <hr></hr>
                secret message
            </div>}

        {(authenticated && !validated) &&
            <div className="Magicwall__container">
                <p className="Magicwall__title"><RedCross /> Unfortunately, your wallet does not meet these requirements.</p>
                <Requirements />
                <hr></hr>
                <p className="Magicwall__address-text">Your address: <code className="Magicwall__address">{address}</code></p>
            </div>}

    </>
    );
}