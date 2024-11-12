
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/index';
import { IAlert } from '@/components/store/AlertStore';
import './Alerting.css'
import { Utils } from '@/helpers/Utils';
import Animation from '@/components/elements/Animation';
import { useNavigate } from 'react-router-dom';

const Alerting = observer(() => {
    
    const navigate = useNavigate()
    const { Alert } = useContext<{Alert: IAlert}>(Context)

    useEffect(() => {
        if (Alert.open) setTimeout(() => Alert.close(), 3500)
    }, [Alert.open])

    const handleClose = () => {
        Alert.close()
    }

    const click = () => {
        navigate(Alert.urlButton)
        handleClose()
    }

    if (Alert.open) {
        return (
            <div className='alert'>
                <div className='flex'>
                    <Animation 
                        className='alert_animation'
                        animationData={Utils.getAnimation(Alert.animationName)}
                    />
                    <div className='flex-column alert_information'>
                        <div>{Alert.message}</div>
                        <div>{Alert.description}</div>
                    </div>
                </div>
                <div
                    className='alert_button'
                    onClick={click}
                >
                    {Alert.textButton}
                </div>
            </div>
        )
    }
})

export default Alerting;