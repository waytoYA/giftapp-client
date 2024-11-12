import { useState,  useEffect } from 'react';
import { Page } from '@/components/Page';
import { StoreIcon } from '@/ui/Icons';
import './StorePage.css'

import Gift from '@/components/Gift/Gift';
import { IGift } from '@/components/Gift/Interface';
import { useNavigate } from 'react-router-dom';
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { useTranslation } from 'react-i18next';

const StorePage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        api.gift.getAll()
        .then(data => {
            setItems(data)
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading />

    return (
        <Page back={false}>
            <div className='page_info'>
                <StoreIcon />
                <div className='title'>
                    {t('store.title')}
                </div>
                <div className='text color-label-secondary'>
                    {t('store.subtitle')}
                </div>
            </div>
            <div className='page_items'>
                {
                    items.map((item: IGift) => 
                        <Gift 
                            {...item}
                            key={item.id}
                            size={'storeGift'}
                            onClick={() => navigate('/store/' + item.name)}
                        />
                    )
                }
            </div>
        </Page>
    )
}

export default StorePage;