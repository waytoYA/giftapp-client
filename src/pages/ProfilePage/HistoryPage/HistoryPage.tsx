import { Page } from '@/components/Page';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css'
import { io } from "socket.io-client";
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Utils } from '@/helpers/Utils';
import Row from '@/components/renders/Row/Row';
import { useTranslation } from 'react-i18next';
import EmptyList from '@/components/blocks/EmptyList/EmptyList';
import Loading from '@/components/elements/Loading';

const HistoryPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { initDataRaw } = retrieveLaunchParams();
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const socket = io(
            import.meta.env.VITE_SERVER_URL,
            {auth: {token: initDataRaw}}
        );

        socket.emit('getHistory', (data: any) => {
            setItems(data)
            setLoading(false)
        });
        socket.on('getHistory', (data: any) => {
            setItems(data)
            setLoading(false)
        });
    }, [])
    
    const generateMore = (item: any) => {
        switch (item.action) {
            case "Sent": {
                return <>{t('history.to')} <span className='color-primary'>{item.to.name}</span></>
            }
            case "Buy": {
                return <span>-{item.amount} {item.currency}</span>
            }
            case "Receive": {
                return <>{t('history.from')} <span className='color-primary'>{item.from.name}</span></>
            }
        }
    }

    if (loading) return <Loading />

    return (
        <Page
            back={true}
            mainButton={
                items.length < 1
                ? {text: t('history.empty.primaryButton'), onClick: () => navigate('/gifts')}
                : undefined
            }
        >
            {
                items.length < 1
                ?
                <EmptyList
                    title={t('history.empty.title')}
                    text={t('history.empty.subtitlte')}
                    link={false}
                    type={'history'}
                />
                :
                <div className='page_info'>
                    <div className='title'>
                        {t('history.title')}
                    </div>
                    <div className='text color-label-secondary'>
                        {t('history.subtitle')}
                    </div>

                    {
                        items.map((object: any) => 
                            <>
                                <div
                                    className="row_title caption"
                                >
                                    {Utils.toCompressDate(object.date)}
                                </div>
                                {
                                    object.data.map((item: any) => 
                                        <Row
                                            image={
                                                <img src={Utils.getImage(item.gift.name)} className='history_row_image' />
                                            }
                                            action={item.action}
                                            subtitle={item.action}
                                            title={item.gift.name}
                                            value={generateMore(item)}
                                        />
                                    )
                                }
                            </>
                        )
                    }
                </div>
            }
        </Page>
    )
}

export default HistoryPage;