import { useEffect, useState } from "react"
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa'

export const Coin = () => {
    const [coin, setCoin] = useState(0)
    const [icon, setIcon] = useState<JSX.Element>()
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3001/coin')
        eventSource.onmessage = (event) => {
            const coinData = JSON.parse(event.data)
            setIcon(coinData.coin > coin ? <FaLongArrowAltUp color="green"/>: <FaLongArrowAltDown color="red"/>)
            setCoin(coinData.coin)
        }
        return () => eventSource.close();
    }, [coin])
    return <div>
        <p> Coin: {coin} {icon} </p> 
    </div>
}