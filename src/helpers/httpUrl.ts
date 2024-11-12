import axios from "axios";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

/**
 * @param route - route in a server
 */
export function httpUrl(route: string) {
    const { initDataRaw } = retrieveLaunchParams();
    return axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL + route,
        withCredentials: true,
        headers: {
            Authorization: initDataRaw
        }
    })
}