import { useEffect, useState } from 'react';
import './SendGiftPopup.css'
import Animation from '@/components/elements/Animation';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import closeIcon from '@/images/icons/close.svg'   
import { Page } from '../Page';
import { Utils } from '@/helpers/Utils';
import { useTranslation } from 'react-i18next';

const SendGiftPopup = ({
    open,
    onClose,
    item
}: any) => {

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const animationData = Utils.getAnimation(item.name)
    const imageData = Utils.getImage(item.name)

    useEffect(() => {
        if (open) {
            document.getElementById('modal')?.classList.add('show')
            document.getElementById('modal-block')?.classList.add('modal-open')
        } else {
            document.getElementById('modal')?.classList.remove('show')
            document.getElementById('modal-block')?.classList.remove('modal-open')
        }
    }, [isOpen])

    useEffect(() => { setIsOpen(open) }, [open])

    const clickMainButton = () => {
        const url = `https://t.me/share/url?url=https://t.me/qqdoctorbot/app%20[это удалить]&text=@qqdoctorbot =${item.id}`
        openTelegramLink(
            url
        )
    }

    if (!open) return <></>

    return (
        <Page
            back={false}
            mainButton={{text: t('gifts.popup.primaryButton'), onClick: clickMainButton}}
        >
        <div id="modal" className='modal'>
            <div id="modal-block" className='modal_block'>
                
                <Animation 
                    animationData={animationData}
                    imageData={imageData}
                    className='modal_block_image'
                />

                <div
                    className='modal_block_close'
                    onClick={onClose}
                >
                    <img src={closeIcon} />
                </div>

                <div className='title'>{t('gifts.popup.title')}</div>

                <div className='modal_block_information'>

                    <div className='modal_block_information_column color-label-secondary'>
                        <div className='modal_block_information_row_name'>{t('gifts.popup.info.name')}</div>
                        <div className='modal_block_information_row_name'>{t('gifts.popup.info.date')}</div>
                        <div className='modal_block_information_row_name'>{t('gifts.popup.info.price')}</div>
                        <div className='modal_block_information_row_name'>{t('gifts.popup.info.availability')}</div>
                    </div>
                    <div className='modal_block_information_column modal_block_information_column_values text'>
                        <div className='modal_block_information_row_value'>{item.name}</div>
                        <div className='modal_block_information_row_value'>{Utils.toFormatDate(item.date)}</div>
                        <div className='modal_block_information_row_value flex-center'>
                            <img src={Utils.renderIconCurrency(item.currency)} className='currencyIcon' />
                            <span>{item.amount} {item.currency}</span>
                        </div>
                        <div className='modal_block_information_row_value'>{item.purchased} {t('of')} {item.quantity}</div>
                    </div>

                </div>
            </div>
        </div>
        </Page>
    )
}

export default SendGiftPopup;