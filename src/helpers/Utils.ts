import cakeAnimation from '@/animations/gifts/gift-delicious-cake.json';
import greenStarAnimation from '@/animations/gifts/gift-green-star.json';
import blueStarAnimation from '@/animations/gifts/gift-blue-star.json';
import redStarAnimation from '@/animations/gifts/gift-red-star.json';

import cakeImage from '@/images/gifts/cake.png';
import greenStarImage from '@/images/gifts/green-star.png';
import blueStarImage from '@/images/gifts/blue-star.png';
import redStarImage from '@/images/gifts/red-star.png';

import currencyUSDT from '@/images/currency-bg/usdt.png'
import currencyTON from '@/images/currency-bg/ton.png'
import currencyETH from '@/images/currency-bg/eth.png'

import currencyUSDTwhite from '@/images/currency/usdt.png'
import currencyTONwhite from '@/images/currency/ton.png'
import currencyETHwhite from '@/images/currency/eth.png'

class Utilities {
    getAnimation (name: string) {
        switch (name) {
            case 'Delicious Cake': {
                return cakeAnimation
            }
            case 'Green Star': {
                return greenStarAnimation
            }
            case 'Blue Star': {
                return blueStarAnimation
            }
            case 'Red Star': {
                return redStarAnimation
            }
            default: {
                return null
            }
        }
    }

    getImage (name: string) {
        switch (name) {
            case 'Delicious Cake': {
                return cakeImage
            }
            case 'Green Star': {
                return greenStarImage
            }
            case 'Blue Star': {
                return blueStarImage
            }
            case 'Red Star': {
                return redStarImage
            }
            default: {
                return null
            }
        }
    }

    renderIconCurrency (currency: string) {
        switch (currency) {
            case "USDT":
                return currencyUSDT
            case "TON":
                return currencyTON
            case "ETH":
                return currencyETH
            default: return ''
        }
    }

    renderIconCurrencyWhite (currency: string) {
        switch (currency) {
            case "USDT":
                return currencyUSDTwhite
            case "TON":
                return currencyTONwhite
            case "ETH":
                return currencyETHwhite
            default: return ''
        }
    }

    renderPlace (place: number) {
        switch (place) {
            case 1: return '🥇'
            case 2: return '🥈'
            case 3: return '🥉'
            default: return `#${place}`
        }
    }

    toCompressQuantity (number: number) {
        if (number >= 1000) {
            return String(Math.floor(number / 1000)) + 'K'
        } 
        return number
    }

    toFormatDate (dateString: Date) {
        const date = new Date(dateString);

        const zero = (n: number) => n.toString().padStart(2, '0');

        const day = zero(date.getDate());
        const month = zero(date.getMonth() + 1);
        const year = date.getFullYear().toString().slice(-2);
        const hours = zero(date.getHours());
        const minutes = zero(date.getMinutes());

        const formattedDate = `${day}.${month}.${year} at ${hours}:${minutes}`;
        return formattedDate
    }

    toCompressDate (dateString: Date) {
        const date = new Date(dateString)
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const day = date.getDate()
        const month = months[date.getMonth()]
        return `${day} ${month}`
    }

}

export const Utils = new Utilities();