

import { useEffect, useState } from 'react';
import './Switch.css'
import { DarkIcon, LightIcon } from '@/ui/Icons';

const Switch = ({type, onChange, ...props}: any) => {

    const [value, setValue] = useState<string>(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChangeValue = (value: string) => {
        onChange(value)
    }

    if (type == 'theme') {
        return (
            <div className='switch'>
                <div
                    className={`switch_element ${value == 'light' ? 'switch_element-active' : ''}`}
                    onClick={() => onChangeValue('light')}
                >
                    <LightIcon
                        className={'switch-light'}
                    />
                </div>
                <div
                    className={`switch_element ${value == 'dark' ? 'switch_element-active' : ''}`}
                    onClick={() => onChangeValue('dark')}
                >
                    <DarkIcon
                        className={'switch-dark'}
                    />
                </div>
            </div>
        )
    }

    if (type == 'language') {
        return (
            <div className='switch'>
                <div
                    className={`switch_element ${value == 'en' ? 'switch_element-active' : ''}`}
                    onClick={() => onChangeValue('en')}
                >
                    EN
                </div>
                <div
                    className={`switch_element ${value == 'ru' ? 'switch_element-active' : ''}`}
                    onClick={() => onChangeValue('ru')}
                >
                    RU
                </div>
            </div>
        )
    }
}

export default Switch;
