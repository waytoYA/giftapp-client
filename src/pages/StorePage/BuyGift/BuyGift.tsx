import { useEffect, useState } from 'react';
import './BuyGift.css'
import Gift from '@/components/Gift/Gift';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import { useParams } from 'react-router-dom';
import { Page } from '@/components/Page';
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { Utils } from '@/helpers/Utils';
import Row from '@/components/renders/Row/Row';
import { useTranslation } from 'react-i18next';

const BuyGift = () => {

    const { name } = useParams()

    const { t } = useTranslation();

    const [item, setItem] = useState<any>({})
    const [actions, setActions] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        api.gift.getOne(name as string)
        .then(data => {
            setItem(data.item)
            setActions(data.actions)
            setLoading(false)
        })
    }, []);

    const clickMainButton = async () => {
        api.gift.invoiceCreate(name as string)
        .then(data => {
            const url = data.url
            openTelegramLink(url);
        })
    }

    if (loading) return <Loading />

    return (
        <Page
            back={true}
            mainButton={{text: t('store.buyGift.primaryButton'), onClick: clickMainButton}}
        >
            <div className='data'>
                <Gift 
                    {...item}
                    key={item.id}
                    size={'buyGift'}
                />
                <div className='buyGift_information'>
                    <span className='flex-center title'>
                        {item.name}
                        <div className='buyGift_information_quantity'>
                            {item.purchased} {t('of')} {Utils.toCompressQuantity(item.quantity)}
                        </div>
                    </span>

                    <span className='buyGift_information_text text color-label-secondary'>
                        {t('store.buyGift.description')}
                    </span>

                    <div className='buyGift_information_price textbold'>
                        <img src={Utils.renderIconCurrency(item.currency)} className='currencyIcon' />
                        <span className='textbold'>{item.amount} {item.currency}</span>
                    </div>
                </div>
            </div>
            <div className='line' />

            <div className='data'>
                <div className='row_title caption'>{t('store.buyGift.actions')}</div>
                {
                    actions.map((item: any) => 
                        <Row
                            image={
                                <img src={
                                    item.action == 'Buy' 
                                    ? item.user.image
                                    : item.from.image
                                } className='buyGift_action_image' />
                            }
                            action={item.action}
                            subtitle={`${item.action} gift`}
                            title={
                                item.action == 'Buy'
                                ? <>
                                    <span className='color-primary'>{item.user.name}</span> {t('store.buyGift.actions.buy')}
                                </>
                                : <>
                                    <span className='color-primary'>{item.from.name}</span>
                                    &nbsp;{t('store.buyGift.actions.send')}&nbsp;
                                    <span className='color-primary'>{item.to.name}</span>
                                </>
                            }
                        />
                    )
                }
            </div>

        </Page>
    )
}

export default BuyGift;