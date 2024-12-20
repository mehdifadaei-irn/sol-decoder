import { useState, useEffect } from 'react';
import { ethers, JsonRpcProvider } from 'ethers';

const CONTRACT_ADDRESS = '0xb2ea51BAa12C461327d12A2069d47b30e680b69D';
const RPC_URL = 'https://bsc-dataseed.binance.org/';

const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
];

export const useReadBsContract = (address: string) => {
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const provider = new JsonRpcProvider(RPC_URL);

                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    ERC20_ABI,
                    provider
                );

                const rawBalance = await contract.balanceOf(address);

                setBalance(rawBalance);
            } catch (err: any) {
                setError(err.message || 'Error fetching balance');
            }
        };

        fetchBalance();
    }, [address]);

    return { balance, error };
};
