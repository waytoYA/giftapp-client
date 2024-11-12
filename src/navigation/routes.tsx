import { Route, Routes, Navigate } from 'react-router-dom';
import {
    OTHER_ROUTE,
    STORE_ROUTE,
    GIFTS_ROUTE,
    LEADERBOARD_ROUTE,
    PROFILE_ROUTE,
    HISTORY_ROUTE,
    GIFT_STATUS_ROUTE
} from './conts';
import StorePage from '@/pages/StorePage/StorePage';
import BuyGift from '@/pages/StorePage/BuyGift/BuyGift';
import GiftsPage from '@/pages/GiftsPage/GiftsPage';
import LeaderboardPage from '@/pages/LeaderboardPage/LeaderboardPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import HistoryPage from '@/pages/ProfilePage/HistoryPage/HistoryPage';
import GiftStatusPage from '@/pages/GiftStatusPage/GiftStatusPage';

const AppRoutes = () => {

    return (
        <Routes>

            <Route
                path={OTHER_ROUTE}
                element={<Navigate to={STORE_ROUTE} replace />}
            />

            <Route
                path={STORE_ROUTE}
                element={<StorePage />}
            />

            <Route
                path={STORE_ROUTE + '/:name'}
                element={<BuyGift />}
            />

            <Route
                path={GIFTS_ROUTE}
                element={<GiftsPage />}
            />

            <Route
                path={LEADERBOARD_ROUTE}
                element={<LeaderboardPage />}
            />

            <Route
                path={PROFILE_ROUTE}
                element={<ProfilePage />}
            />

            <Route
                path={HISTORY_ROUTE}
                element={<HistoryPage />}
            />

            <Route
                path={GIFT_STATUS_ROUTE }
                element={<GiftStatusPage />}
            />

        </Routes>
    )
}

export default AppRoutes;
