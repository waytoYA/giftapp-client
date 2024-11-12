import { httpUrl } from '@/helpers/httpUrl'

const url = httpUrl('/user')

export class UserManage {

    async me () {
        const {data} = await url.get('/me')
        return data
    }

    async gifts () {
        const {data} = await url.get('/gifts')
        return data
    }
    
    async history () {
        const {data} = await url.get('/history')
        return data
    }

    async receiveGift (body: any) {
        const {data} = await url.post('/receiveGift', body)
        return data
    }
    
    async auth (initDataRaw: any) {
        const {data} = await url.post('/auth', null, {
            headers: {
                Authorization: initDataRaw
            }
        })
        return data
    }

}