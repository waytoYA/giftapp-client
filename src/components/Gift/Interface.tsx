export interface IGift {
    id: string,
    name: string,
    amount: string,
    currency: string,
    purchased: number,
    quantity: number,
    size: string,
    from: {
        name: string,
        image: string
    }
    onClick?: any;
}