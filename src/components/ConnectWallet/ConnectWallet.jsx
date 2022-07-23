import './ConnectWallet.css';
import { Ethereum } from '../Icons';

export const ConnectWallet = ({ action, text }) => {
    return (
        <button className="Magicwall__connect-wallet" onClick={action}><Ethereum />{text}</button>
    );
}