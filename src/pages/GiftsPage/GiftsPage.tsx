import { Page } from '@/components/Page';
import { useEffect, useState } from 'react';
import './GiftsPage.css'
import Gift from '@/components/Gift/Gift';
import { IGift } from '@/components/Gift/Interface';
import SendGiftPopup from '@/components/popups/SendGiftPopup';
import { api } from '@/http';
import { useTranslation } from 'react-i18next';
import EmptyList from '@/components/blocks/EmptyList/EmptyList';
import Loading from '@/components/elements/Loading';

const GiftsPage = () => {

    const { t } = useTranslation();
    const [items, setItems] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedItem, setSelectedItem] = useState({})
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.user.gifts()
        .then(data => {
            setItems(data)
            setLoading(false)
        })
    }, [])

    const openingPopup = (id: any) => {
        setOpenPopup(true)
        setSelectedItem(items.find((i: any) => i.id == id))
    }

    const closingPopup = () => {
        setOpenPopup(false)
        setSelectedItem({})
    }
    
    if (loading) return <Loading />

    return (
        <Page back={false}>
            
            <SendGiftPopup
                open={openPopup}
                onClose={closingPopup}
                item={selectedItem}
            />

            <div className='page_info'>
                <div className='title'>
                    {t('gifts.title')}
                </div>
                <div className='text color-label-secondary'>
                    {t('gifts.subtitle')}
                </div>
            </div>

            {
                items.length < 1 
                ?   <EmptyList
                        text={t('gifts.empty')}
                        link={true}
                    />
                : <div className='page_items'>
                    {
                        items.map((item: IGift, index: number) => 
                            <Gift 
                                {...item}
                                key={index}
                                size={'miniGift'}
                                onClick={openingPopup}
                            />
                        )
                    }
                </div>
            }
        </Page>
    )
}

export default GiftsPage;