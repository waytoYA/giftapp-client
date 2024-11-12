
import { IGift } from './Interface';
import './Gift.css'

import Animation from '@/components/elements/Animation';
import { Utils } from '@/helpers/Utils';
import { useTranslation } from 'react-i18next';

const Gift = ({
    id,
    name,
    amount,
    currency,
    purchased,
    quantity,
    size,
    from,
    onClick
}: IGift) => {

    const { t } = useTranslation();
    const animationData = Utils.getAnimation(name)
    const imageData = Utils.getImage(name)
    const currencyData = Utils.renderIconCurrencyWhite(currency)
    const backgroundClassName = `gift-background-${name.split(' ').join('_')}`
        
    if (size == 'buyGift') {
        return (
            <div className={`gift gift-buyGift ${backgroundClassName}`}>
                <Animation 
                    className='gift_image'
                    imageData={imageData}
                    animationData={animationData}
                />
            </div>
        )
    }

    if (size == 'miniGift') {
        return (
            <div className='gift gift-miniGift'>
                <div className='caption color-label-secondary'>
                    {name}
                </div>
                <Animation 
                    className='gift_image'
                    imageData={imageData}
                    animationData={animationData}
                />
                <button
                    className='primaryButton buttonSmall'
                    onClick={() => onClick(id)}
                >
                    {t('gift.send')}
                </button>
            </div>
        )
    }

    if (size == 'historyGift') {
        return (
            <div className='gift gift-miniGift gift-historyGift'>
                <div className='flex-between'>
                    <img src={from.image} className='gift_avatar'/>
                    <span className='caption gift_quantity'>1 {t('of')} {Utils.toCompressQuantity(quantity)}</span>
                </div>
                <Animation 
                    className='gift_image'
                    imageData={imageData}
                    animationData={animationData}
                />
                <span className='gift-historyGift_title'>{name}</span>
            </div>
        )
    }

    if (size == 'storeGift') {
        return (
            <div className={`gift gift-storeGift ${backgroundClassName}`}>
                <div className='caption gift_quantity'>
                    {Utils.toCompressQuantity(purchased)} {t('of')} {Utils.toCompressQuantity(quantity)}
                </div>
                <Animation 
                    className='gift_image'
                    imageData={imageData}
                    animationData={animationData}
                />
                <div className='subtitle'>
                    {name}
                </div>
                {
                    purchased != quantity
                    ?
                    <button className='primaryButton' onClick={onClick}>
                        <img src={currencyData} /> <span>{amount} {currency}</span>
                    </button>
                    :
                    <button className='primaryButton disableButton'>
                        {t('gift.soldOut')}
                    </button>
                }
            </div>
        )
    }
}

export default Gift;