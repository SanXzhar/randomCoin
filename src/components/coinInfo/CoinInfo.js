import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HistoricalChart } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { Line  } from "react-chartjs-2";
import { chartDays } from "../../config/data";
import Chart from 'chart.js/auto';


const CoinInfo = ({coin}) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const [flag,setflag] = useState(false);

    const { currency } = CryptoState();


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };


    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days]);

    
    return (
     <div>
        {!historicData || flag===false ? (
          <CircularProgress
            style={{ color: "rgba(0, 81, 255, 0.25)" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "rgba(0, 81, 255, 0.25)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              ></Line> 
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <div
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                 }}
                  selected = {day.value === days}
                >
                  {day.label}
                </div>
              ))}
            </div>  
          </>
        )}
     </div> 
    );
};

export default CoinInfo;
