import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import './style.css'


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Carousel = () => {

    const [trending, setTrending] = useState([])
    const { currency, symbol } = CryptoState();

    const fetchTrendinCoins = async () => {
        const { data } = await axios.get(
            TrendingCoins(currency)
        )
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendinCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const trendingfour = trending.slice(0, 4)
    const items = trendingfour.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <div>
                <div className="items">
                    <div className="top"><img className="im"src ={coin?.image} alt = {coin?.name}></img></div>
                    <div className="bottom">
                        <div className="symbol">{coin?.symbol}</div>
                        <div className="pricechange"><span style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                        </div>
                        <div className="price"><span style={{ fontSize: 22, fontWeight: 500}}>
                            {symbol} {(coin?.current_price.toFixed(2))} </span>
                        </div>
                    </div>
                </div>
            </div>
        )

    })
    return(
        <div className="item">
            {items}
        </div>
    )
 }

export default Carousel;