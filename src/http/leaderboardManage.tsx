import { httpUrl } from '@/helpers/httpUrl'

const url = httpUrl('/leaderboard')

export class LeaderboardManage {

    async get (filter: any) {
        const {data} = await url.get('/', {
            params: filter
        })
        return data
    }

    async getProfile (id: string) {
        const {data} = await url.get('/profile' + '/' + id)
        return data
    }

}