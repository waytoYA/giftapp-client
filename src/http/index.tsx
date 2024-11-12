import { UserManage } from './userManage';
import { GiftManage } from './giftManage';
import { LeaderboardManage } from './leaderboardManage';

class MainApi {
    public user = new UserManage();
    public gift = new GiftManage();
    public leaderboard = new LeaderboardManage();
}

export const api = new MainApi();