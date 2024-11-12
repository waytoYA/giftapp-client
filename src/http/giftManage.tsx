import { httpUrl } from '@/helpers/httpUrl'

const url = httpUrl('/gift')

export class GiftManage {

    async getAll () {
        const {data} = await url.get('/getAll')
        return data
    }

    async getOne (name: string) {
        const {data} = await url.get('/getOne' + '/' + name)
        return data
    }

    async invoiceCreate (name: string) {
        const {data} = await url.get('/invoiceCreate' + '/' + name)
        return data
    }

    async check () {
        const {data} = await url.get('/check')
        return data
    }
    
}