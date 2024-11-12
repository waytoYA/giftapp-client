import { Page } from '@/components/Page';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeaderboardPage.css'

import { StoreIcon } from '@/ui/Icons';
import { api } from '@/http';
import TextFieldWithDebounce from '@/components/blocks/TextFieldWithDebounce/TextFieldWithDebounce';
import { Utils } from '@/helpers/Utils';
import { useTranslation } from 'react-i18next';

const LeaderboardPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const [filter, setFilter] = useState<any>({
        name: null
    })
    const [me, setMe] = useState<string>("")
    const [items, setItems] = useState([])

    useEffect(() => {
        api.leaderboard.get(filter)
        .then(data => {
            setItems(data.data)
            setMe(data.me)
        })
    }, [filter])

    const search = (value: string) => {
        setFilter((prevState: any) => {
            return {
                ...prevState,
                name: value
            }
        })
    }

    return (
        <Page back={false}>
            <div className="leaderboard_search">
                <TextFieldWithDebounce
                    onChange={search}
                    delay={500} 
                    
                />
            </div>
            <div className='leaderboard'>
                {
                    items.map((item: any, index: number) => 
                        <div
                            className={`flex-center leaderboard_row ${item._id == me ? 'leaderboard_you' : ''}`}
                            onClick={() => navigate(`/profile?id=${item._id}`)}
                        >
                            <img src={item.image} className='leaderboard_row_image' />
                            <div className='flex-between leaderboard_row_information'>

                                <div className='flex-column leaderboard_row_information_main'>
                                    <div className='textbold flex-center'>
                                        {item.name}
                                        {
                                            item._id == me &&
                                            <span className='leaderboard_you_chip'>{t('leaderboard.you')}</span>
                                        }
                                    </div>
                                    <div className='caption color-primary'>
                                        <StoreIcon /> <span>{item.amount} {t('leaderboard.gifts')}</span>
                                    </div>  
                                </div>

                                <div className='caption textbold color-label-secondary leaderboard_row_place'>
                                    {Utils.renderPlace(index + 1)}
                                </div>
                                
                            </div>
                        </div>
                    )
                }

            </div>
        </Page>
    )
}

export default LeaderboardPage;