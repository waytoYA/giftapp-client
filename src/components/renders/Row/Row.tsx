
import './Row.css'
import { ArchiveIcon, SentIcon, ShopIcon } from '@/ui/Icons';

interface IRow {
    image: JSX.Element;
    action: string;
    subtitle: string | JSX.Element;
    title: string | JSX.Element;
    value?: any
}

const Row = ({
    image,
    action,
    subtitle,
    title,
    value
}: IRow) => {

    const generateActionIcon = (action: any) => {
        let background;
        let icon;
        switch (action) {
            case "Sent": {
                background = 'background-sent'
                icon = <SentIcon />
                break
            }
            case "Send": {
                background = 'background-send'
                icon = <SentIcon />
                break
            }
            case "Buy": {
                background = 'background-buy'
                icon = <ShopIcon />
                break
            }
            case "Receive": {
                background = 'background-receive'
                icon = <ArchiveIcon />
                break
            }
        }

        return <div
            className={`row_image_action ${background}`}
        > {icon} </div>
    }
    
    return (
        <div className={`row`}>
            <div className='row_image'>
                {image}
                {action && generateActionIcon(action)}
            </div>
            <div className='row_information'>

                <div className='row_information_main'>
                    <div className='caption color-label-secondary row_information_main_subtitle'>
                        {subtitle}
                    </div>
                    <div className='textbold'>
                        {title}
                    </div>  
                </div>

                <div className='row_information_more textbold'>
                    {value}
                </div>
                
            </div>
        </div>
    )
}

export default Row;