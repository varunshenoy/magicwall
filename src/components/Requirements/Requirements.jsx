import { Lock } from "../Icons";

export const Requirements = () => {
    return (
        <div className="Magicwall__requirements">
            <p><Lock /> Requirements</p>
            <ul>
                <li>At least 1 ENS domain (ERC-721)</li>
            </ul>
        </div>
    );
}