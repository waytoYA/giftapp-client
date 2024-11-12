import { Page } from '@/components/Page';
import './ProfilePage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { miniApp } from '@telegram-apps/sdk';
import { HistoryIcon } from '@/ui/Icons';
import { IGift } from '@/components/Gift/Interface';
import Gift from '@/components/Gift/Gift';
import { api } from '@/http';
import Switch from '@/components/blocks/Switch/Switch';
import { useTranslation } from 'react-i18next';
import EmptyList from '@/components/blocks/EmptyList/EmptyList';

const ProfilePage = () => {

    const query = new URLSearchParams(location.search);
    const searchId = query.get('id')

    const navigate = useNavigate()
    const { t, i18n } = useTranslation();

    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en')

    const [user, setUser] = useState<any>({})
    const [items, setItems] = useState<any>([])

    useEffect(() => {
        if (searchId) {
            api.leaderboard.getProfile(searchId)
            .then(data => {
                setUser(data.user)
                setItems(data.gifts)
            })
        } else {
            api.user.me()
            .then(data => {
                setUser(data.user)
                setItems(data.gifts)
            })
        }
    }, [])

    const changeTheme = (value: string) => {
        if (value == theme) return;
        setTheme(value)
        localStorage.setItem('theme', value)

        document.querySelector('body')?.setAttribute('data-theme', value)

        if (miniApp.setHeaderColor.isSupported()) {
            if (value == 'dark') {
                miniApp.setHeaderColor('#1C1C1E');
                miniApp.setBottomBarColor('#1C1C1E')
            } else {
                miniApp.setHeaderColor('#ffffff');
                miniApp.setBottomBarColor('#F1F1F2')
            }
        }
    }

    const changeLanguage = (value: string) => {
        if (value == language) return;
        setLanguage(value)
        localStorage.setItem('language', value)

        localStorage.setItem('language', value)
        i18n.changeLanguage(value)
    }

    return (
        <Page back={false}>
            <div className='profile'>
                <div className='profile_information'>
                    
                    {
                        !searchId &&
                        <div className='profile_information_theme opacity0'>
                            <Switch
                                type="theme"
                                value={theme}
                                onChange={changeTheme}
                            />
                        </div>
                    }

                    <div className='profile_information_main'>
                        <div className='profile_information_main_avatar'>
                            <img src={user.image} />
                            <div className='chip'>
                                <span>{`#${user.leaderboardPlace || 0}`}</span>
                            </div>
                        </div>
                        <div className='profile_information_main_name title'>{user.name}</div>
                        <div className='profile_information_main_gifts text color-label-secondary'>{user.giftsReceived} {t('profile.giftsReceived')}</div>
                        {
                            !searchId &&
                            <div
                                className='profile_information_main_history flex-center textbold color-primary'
                                onClick={() => navigate('/history')}
                            >
                                <HistoryIcon /> <span>{t('profile.recentActions')}</span>
                            </div>
                        }
                    </div>

                    {
                        !searchId &&
                        <div className='profile_information_language'>
                            <Switch
                                type="language"
                                value={language}
                                onChange={changeLanguage}
                            />
                        </div>
                    }

                </div>

                {
                    items.length < 1 
                    ?   <EmptyList
                            text={searchId ? t('profile.empty') : t('profile.emptyMe')}
                            link={!searchId}
                        />
                    : <div className='data page_items'>
                        {
                            items.map((item: IGift, index: number) => 
                                <Gift 
                                    {...item}
                                    key={index}
                                    size={'historyGift'}
                                />
                            )
                        }
                    </div>
                }

            </div>
        </Page>
    )
}

export default ProfilePage;