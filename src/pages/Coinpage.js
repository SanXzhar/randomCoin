import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../components/banner/Carousel";
import CoinInfo from "../components/coinInfo/CoinInfo";
import './style.css'

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ marginTop: 15, backgroundColor: "gold" }} />;

  return (
    <div className="coinpage">
      <div className="sidebar">
        <div>
          <img className="imageone"
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          />
          </div>
          <div>
            <div className="name">{coin?.name}</div>
            <div className="desc">{coin?.description.en.split(".")[0]}</div>
            <div className="rank">Rank: {numberWithCommas(coin?.market_cap_rank)}</div>
            <div className="rank">Current price: {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</div>
            <div className="rank">Market cup: {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</div>
          </div>
      </div>
      <div className="graphic">      
        <CoinInfo coin={coin}/>
      </div>
    </div>
  );
};

export default Coinpage;

