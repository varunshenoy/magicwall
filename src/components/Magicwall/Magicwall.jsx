import React, { useEffect, useState } from 'react';
import Web3 from 'web3'

import { ConnectWallet } from "../ConnectWallet";
import { DownloadButton } from '../DownloadButton';
import { Requirements } from "../Requirements";
import { GreenCheck, RedCross } from "../Icons";

import './Magicwall.css';

import UnfoldRuntime from '../../unfold/parse';

import ERC721_ABI from "../../data/ERC721_ABI";
import ERC20_ABI from "../../data/ERC20_ABI";

export const Magicwall = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [address, setAddress] = useState(null);
    const [chainId, setChainId] = useState(1);
    const [validated, setValidated] = useState(false);

    let web3 = new Web3(Web3.givenProvider);

    useEffect(() => {
        if (address != null) {
            checkValidAddress().then((valid) => {
                setValidated(valid);
                setAuthenticated(true);
            })
        }
    }, [address, chainId]);

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

    const getABI = (type) => {
        if (type == "ERC721") {
            return ERC721_ABI;
        }
        if (type == "ERC20") {
            return ERC20_ABI;
        }
    }

    const queryToken = async (type, contractAddress) => {
        const contract = new web3.eth.Contract(getABI(type), contractAddress);
        contract.defaultAccount = address;
        const balance = await contract.methods.balanceOf(address).call();
        return balance;
    }

    const queryEth = async () => {
        const balance = await web3.eth.getBalance(address);
        return Web3.utils.fromWei(balance);
    }

    const changeChain = async (chainId) => {
        if (window.ethereum.networkVersion !== chainId) {
            try {
                setChainId(chainId);
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex(chainId) }]
                });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                    console.log("Please add this chain to your network");
                }
            }
        }
    }

    const checkValidAddress = async () => {

        const code = "if ($.balanceOf(ERC721(0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85)) > 0) => $.grantAccess! else $.denyAccess!";

        const walletContext = {
            "queryToken": queryToken,
            "queryEth": queryEth,
            "isValidAddr": web3.utils.isAddress,
            "setChain": changeChain,
            "address": address
        };
        console.log(walletContext);

        const runtime = new UnfoldRuntime(code, walletContext);

        await runtime.setup();
        await runtime.execute();
        return runtime.success();
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
                <DownloadButton />
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