import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import './style.css';

const Header = () => {
    const [coin, setCoin] = useState();
    const navigate = useNavigate();

    const { currency } = CryptoState();

    const getID = async () => {
        const { data } = await axios.get(CoinList(currency));
        setCoin(data);
    };
    useEffect(() => {
        getID();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    useEffect(()=>{
        window.coinid = Math.floor(Math.random() * 100)
        window.navid = `/coins/${coin && coin[window.coinid].id}`
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coin, window.navid])  

    useEffect(() => {
        document.addEventListener('keydown', detectedKeyDown, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const detectedKeyDown = (e) => {
        if( e.key === " " ){
            navigate(`${window.navid}`); window.location.reload()
        }
    }


    return(
        <div>
            <div className="title" onClick = { () => {navigate(`/`)} }>Crypto Rush</div>
            <div className="home" onClick = { () => {navigate(`/`)} }>Home</div>
            <div className="random" onClick={ () => {navigate(`${window.navid}`); window.location.reload()}}> Random Coin</div>
        </div>
    )
}

export default Header