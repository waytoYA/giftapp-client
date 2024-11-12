import AppRoutes from '@/navigation/routes';
import { init, miniApp, retrieveLaunchParams, parseInitData, expandViewport } from '@telegram-apps/sdk';
import { useEffect } from 'react';
import TabBar from '@/components/blocks/TabBar';
import { api } from '@/http';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function App() {

    const { i18n } = useTranslation();
    const navigate = useNavigate()
    const { initDataRaw } = retrieveLaunchParams();

    useEffect(() => {
        const params = parseInitData(initDataRaw).startParam
        if (params?.split('-')[0] == 'receive') {
            api.user.receiveGift({receiveData: params?.split('-')[1]})
            .then(data => {
                navigate(`/gift/status?name=received&from=${data.item.from}&itemName=${data.item.name}`)
            })
        }
        if (params == 'statusPurchased') {
            navigate('/gift/status?name=purchased')
        }

        init()
        miniApp.mount()
        miniApp.ready()
        expandViewport()
        changeTheme()
        changeLanguage()
    }, [])

    const changeTheme = () => {
        const theme = localStorage.getItem('theme')
        if (theme == 'dark') {
            document.querySelector('body')?.setAttribute('data-theme', 'dark')
        }
        if (miniApp.setHeaderColor.isSupported()) {
            if (theme == 'dark') {
                miniApp.setHeaderColor('#1C1C1E');
                miniApp.setBottomBarColor('#1C1C1E')
            } else {
                miniApp.setHeaderColor('#ffffff');
                miniApp.setBottomBarColor('#F1F1F2')
            }
        }
    }
    
    const changeLanguage = () => {
        const language = localStorage.getItem('language')
        if (language) {
            i18n.changeLanguage(language)
        } else {
            if (parseInitData(initDataRaw).user?.languageCode == 'en') {
                i18n.changeLanguage('en')
            } else { i18n.changeLanguage('ru') }
        }
    }

    return (
        <>
        <div className='container'> 
            <AppRoutes />
            <TabBar />
        </div>  
        </>
    );
}
