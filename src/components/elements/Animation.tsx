import { useEffect, useRef, useState } from "react";
import Lottie from 'react-lottie-player';

interface ILottie {
    animationData: any;
    imageData?: string;
    titleData?: string;
    className?: string;
    withClick?: boolean;
    callback?: any;
}

const Animation = ({
    animationData,
    imageData,
    titleData,
    className,
    withClick,
}: ILottie) => {
    
    const lottieRef = useRef(null);
    const [data, setData] = useState<any>();
    const [loop, setLoop] = useState<boolean>(false)
    const [play, setPlay] = useState<boolean>(!withClick)

    useEffect(() => { setData(animationData) }, [])

    const animationStart = () => {
        setPlay(true);
        setLoop(true);
    }

    const animationStop = () => {
        setPlay(false);
    }

    const loopEnd = () => {
        setLoop(false);
        setPlay(false);
    }
    
    return <>
        {
            data ?
            <Lottie
                ref={lottieRef}
                animationData={animationData}
                className={className}
                loop={loop}
                play={play}
                onClick={withClick ? animationStart : undefined}
                onLoopComplete={withClick ? loopEnd : undefined}
                onComplete={animationStop}
                data-title={titleData}
            />
            : <img src={imageData} className={className} />
        }
    </>
};

export default Animation;