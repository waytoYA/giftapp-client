import {makeAutoObservable} from 'mobx'

export interface IAlert {
    opening: (
        message: string,
        description: string,
        textButton: string,
        urlButton: string,
        animationName: string,
    ) => void;
    close: () => void;
    open: boolean,
    message: string,
    description: string,
    textButton: string,
    urlButton: string,
    animationName: string,
}

export default class AlertStore implements IAlert {
    _open: boolean;
    _message: string;
    _description: string;
    _textButton: string;
    _urlButton: string;
    _animationName: string;
    
    constructor(){
        this._open = false
        this._message = ''
        this._description = ''
        this._textButton = ''
        this._urlButton = ''
        this._animationName = ''
        makeAutoObservable(this)
    }

    opening (
        message: string,
        description: string,
        textButton: string,
        urlButton: string,
        animationName: string,
    ){
        this._open = true
        this._message = message
        this._description = description
        this._textButton = textButton
        this._urlButton = urlButton
        this._animationName = animationName
    }

    close () {
        this._open = false
    }

    get open() {
        return this._open
    }

    get message() {
        return this._message
    }

    get description() {
        return this._description
    }
    get textButton() {
        return this._textButton
    }
    get urlButton() {
        return this._urlButton
    }
    get animationName() {
        return this._animationName
    }
}