import { useState, useEffect } from 'react';
import './TabBar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Animation from '@/components/elements/Animation';

import tabStoreAnimation from "@/animations/tab/tab-store.json";
import tabGiftsAnimation from "@/animations/tab/tab-gifts.json";
import tabLeaderboardAnimation from "@/animations/tab/tab-leaderboard.json";
import tabProfileAnimation from "@/animations/tab/tab-profile.json";
import { AllRoutes } from '@/navigation/conts';

const RenderAnimation = ({animationData, title}: any) => {
    return <Animation
        className='tabBar_item_icon'
        animationData={animationData}
        titleData={title}
        withClick
    />
}

const TabBar = () => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const location = useLocation();

    const [navigationValue, setNavigationValue] = useState<any>(location.pathname)

    useEffect(() =>{ 
        setNavigationValue(location.pathname)
    }, [location.pathname])

    const to = (url: string) => {
        navigate(url)
    }

    if (!Object.values(AllRoutes).includes(navigationValue as any)) return <></>

    return (
        <div className='tabBar'>
            <div
                onClick={() => to('/store')}
                className={`tabBar_item color-label-tabBar ${navigationValue == '/store' ? 'tabBar_item-select' : ''}`}
            >
                <RenderAnimation
                    animationData={tabStoreAnimation}
                    title={t('tab.store')}
                />
            </div>
            <div
                onClick={() => to('/gifts')}
                className={`tabBar_item color-label-tabBar ${navigationValue == '/gifts' ? 'tabBar_item-select' : ''}`}
            >
                <RenderAnimation
                    animationData={tabGiftsAnimation}
                    title={t('tab.gifts')}
                />
            </div>
            <div
                onClick={() => to('/leaderboard')}
                className={`tabBar_item color-label-tabBar ${navigationValue == '/leaderboard' ? 'tabBar_item-select' : ''}`}
            >
                <RenderAnimation
                    animationData={tabLeaderboardAnimation}
                    title={t('tab.leaderboard')}
                />
            </div>
            <div
                onClick={() => to('/profile')}
                className={`tabBar_item color-label-tabBar ${navigationValue == '/profile' ? 'tabBar_item-select' : ''}`}
            >
                <RenderAnimation
                    animationData={tabProfileAnimation}
                    title={t('tab.profile')}
                />
            </div>
        </div>
    );
}

export default TabBar;
