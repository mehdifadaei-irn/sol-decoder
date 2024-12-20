import { IonButton } from '@ionic/react';
import meLogo from '../images/me.png';
import { useReadBsContract } from '../hooks/useReadBsContract';

export const formatEther = (weiValue: bigint | string): string => {
    const wei = typeof weiValue === 'string' ? BigInt(weiValue) : weiValue;

    const etherConversionFactor = BigInt(10 ** 18);

    const wholePart = wei / etherConversionFactor;

    const fractionalPart = wei % etherConversionFactor;

    const fractionalStr = fractionalPart.toString().padStart(18, '0');

    const result = `${wholePart}.${fractionalStr}`;

    return result.replace(/\.?0+$/, '');
};

const BuyNftChange = () => {
    const address = '0x248Dd3836E2A8B56279C04addC2D11F3c2497836';
    const { balance, error } = useReadBsContract(address);
    return (
        <IonButton
            className="buy-nft-btn mt-4 flex flex-col gap-y-2 "
            color="medium"
        >
            <img
                src={meLogo}
                className="me-logo mr-2"
                onClick={() =>
                    window.open(
                        'https://magiceden.io/marketplace/soldecoder',
                        '_blank'
                    )
                }
            />
            <div className="flex flex-col">
                {error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : balance !== null ? (
                    <p>Balance: {formatEther(balance || '')}</p>
                ) : (
                    <p>Buy 1 NFT to gain access</p>
                )}
            </div>
        </IonButton>
    );
};

export default BuyNftChange;
