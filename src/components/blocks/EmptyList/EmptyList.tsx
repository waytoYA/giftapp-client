
import Animation from '@/components/elements/Animation';
import epmtyImage from '@/images/empty.png'
import emptyAnimationData from '@/animations/emoji-balloons.json';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './EmptyList.css'

const EmptyList = ({title, text, link, type}: any) => {

    const { t } = useTranslation();

    if (type == 'history') {
        return (
            <div className='emptyBlock emptyBlock-history'>
                <Animation 
                    imageData={epmtyImage}
                    animationData={emptyAnimationData}
                    className='emptyBlock_image'
                />
                <div className='emptyBlock_title title'>
                    {title}
                </div>
                <div className='emptyBlock_text text'>
                    {text}
                </div>
                {
                    link &&
                    <Link
                        to={'/store'}
                        className='color-primary text'
                    >
                        {t('gifts.empty.link')}
                    </Link>
                }
            </div>
        )
    }

    return (
        <div className='emptyBlock'>
            <Animation 
                imageData={epmtyImage}
                animationData={emptyAnimationData}
                className='emptyBlock_image'
            />
            <div className='emptyBlock_text text'>
                {text}
            </div>
            {
                link &&
                <Link
                    to={'/store'}
                    className='color-primary text'
                >
                    {t('gifts.empty.link')}
                </Link>
            }
        </div>
    )
}

export default EmptyList;