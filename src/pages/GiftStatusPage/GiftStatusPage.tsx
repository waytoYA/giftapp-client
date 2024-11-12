import { Page } from '@/components/Page';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import purchasedAnimation from '@/animations/effect-gift-purchased.json';
import Animation from '@/components/elements/Animation';
import { api } from '@/http';
import Loading from '@/components/elements/Loading';
import { Context } from '@/index';
import { IAlert } from '@/components/store/AlertStore';
import { Utils } from '@/helpers/Utils';

const GiftStatusPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    const info = {
        status: query.get('name') || '',
        from: query.get('from') || '',
        itemName: query.get('itemName') || ''
    }
    const { Alert } = useContext<{Alert: IAlert}>(Context)
    const [item, setItem] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (info.status == 'purchased') {
            api.gift.check()
            .then(data => {
                if (data.ok) {
                    setLoading(false)
                    setItem(data.item)
                    Alert.opening(
                        'You bought a Gift',
                        'Now send it to your friend',
                        'Send',
                        '/gifts',
                        data.item.name
                    )
                } else {
                    navigate('/')
                }
            })
            return
        }
        if (info.status == 'received') {
            setItem({
                name: info.itemName,
                from: info.from
            })
            setLoading(false)
            Alert.opening(
                'Gift Received',
                `${info.itemName} from ${info.from}`,
                'View',
                '/profile',
                info.itemName
            )
            return
        }
        navigate('/')
    }, [])

    if (loading) return <Loading />

    if (info.status == 'purchased') {
        return (
            <Page
                back={true}
                mainButton={{text: 'Send Gift', onClick: () => navigate('/gifts')}}
                secondaryButton={{text: 'Open Store', onClick: () => navigate('/store')}}
            >
                <div className='giftStatus'>

                    <Animation 
                        animationData={purchasedAnimation}
                        className='giftStatus_image_purchased'
                    />

                    <Animation 
                        animationData={Utils.getAnimation(item.name)}
                        imageData={Utils.getImage(item.name)}
                        className='giftStatus_image'
                    />

                    <div className='title'>Gift Purchased</div>
                    <div className='text'>
                        The <span className='textbold'>{item.name}</span> gift was purchased for <span className='textbold'>{item.amount} {item.currency}</span>.
                    </div>

                </div>
            </Page>
        )
    }

    if (info.status == 'received') {
        return (
            <Page
                back={true}
                mainButton={{text: 'Open Profile', onClick: () => navigate('/profile')}}
            >
                <div className='giftStatus'>

                    <Animation 
                        animationData={purchasedAnimation}
                        className='giftStatus_image_purchased'
                    />

                    <Animation 
                        animationData={Utils.getAnimation(item.name)}
                        imageData={Utils.getImage(item.name)}
                        className='giftStatus_image'
                    />

                    <div className='title'>Gift Received</div>
                    <div className='text'>
                        You have received the gift <span className='textbold'>{item.name}</span>.
                    </div>

                </div>
            </Page>
        )
    }
}

export default GiftStatusPage;