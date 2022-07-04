import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography 
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../banner/Carousel";
import { Pagination } from "@material-ui/lab";

const Coinstable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigatate = useNavigate();

    const { currency, symbol } = CryptoState()
    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    const handleSearch = () => {
        if (search === "") {
            return coins 
        } else {
            return coins.filter((coin) => (
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
            ));
            
        }
    }
         

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    return(
        <Container style = {{ textAlign: "center"}}>
            <div className="tabletitle">
                Cryptocurrency Prices by Market Cap
            </div>
            <div>
                <input type="text" placeholder="Search For A Crypto Currency.." className="inputtable" onChange={(e) => setSearch(e.target.value)}/>
            </div>

            <TableContainer>
                {
                    loading? (
                        <LinearProgress style = {{ backgroundColor: "darkgreen" }}></LinearProgress>
                    )
                    :(
                    
                        <Table>
                            <TableHead style={{ backgroundColor: "darkgreen" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style = {{ 
                                                color: "white",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                             }}
                                             key = {head}
                                             //align = { head === "Coin" ? "inherit": "right" }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map(row => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow 
                                         onClick = { () => navigatate(`/coins/${row.id}`)}
                                         //className = { classes.row }
                                         key = { row.name }
                                        >
                                            <TableCell 
                                                component='th' 
                                                scope='row' 
                                                style={{
                                                    display: "flex",
                                                    gap: 15, 
                                                }}
                                            >   

                                                <img
                                                    src = {row?.image}
                                                    alt = {row.name}
                                                    height = "50"
                                                    style = {{ marginBottom: 10 }}
                                                /> 
                                                <div style={{ display: "flex", flexDirection: "column"}}>
                                                    <span 
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "dark" }} >{row.name}</span>
                                                </div>            
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell
                                                align = "right"
                                                style = {{
                                                    color: profit > 0 ? "rgb(14, 203, 129)": "red",
                                                    fontWeight: 500
                                                }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell>
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
                 <Pagination
                count = {(handleSearch()?.length/10).toFixed(0)}
                onChange = {(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
                /> 
        </Container>        
    )
}

export default Coinstable;