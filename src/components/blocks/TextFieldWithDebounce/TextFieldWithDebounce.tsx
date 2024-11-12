
import { useEffect, useState } from 'react';
import './TextFieldWithDebounce.css'

const TextFieldWithDebounce = ({delay, onChange, ...props}: any) => {
    const [value, setValue] = useState<string>(props.value)
    const [timer, setTimer] = useState<any>(null)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChangeValue = (e: any) => {
        const value = e.target.value
        setValue(value)

        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }

        const newTimer = setTimeout(() => {
            onChange(value)
            setTimer(null)
            return () => clearTimeout(newTimer)
        }, delay)

        setTimer(newTimer)
    }

    return (
        <input
            {...props}
            type="text"
            value={value}
            onChange={onChangeValue}
            placeholder='Search'
            className='textfield'
        />
    )
}

export default TextFieldWithDebounce;
