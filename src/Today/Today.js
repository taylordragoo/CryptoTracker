import React, { Component } from "react";
import './today.css'
import axios from 'axios'
var NumberFormat = require('react-number-format');

class Today extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinlist: []
        };
    }
    componentWillMount() {
        axios.get('https://min-api.cryptocompare.com/data/top/totalvol?limit=50&tsym=USD')
            .then(res => {
                const coinlist = res.data.Data;
                console.log(coinlist);
                this.setState({coinlist: coinlist});
            })
            // Error catching
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return(
            
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Total Value(USD)</th>
                        <th>Total Supply(USD)</th>
                    </tr>
                </thead>
                
                <tbody>
                    {Object.keys(this.state.coinlist).map((key) => (
                    <tr class="columns">
                        <td>{this.state.coinlist[key].CoinInfo.Name}</td>
                        <td><NumberFormat value={this.state.coinlist[key].ConversionInfo.TotalVolume24H} displayType={'text'} decimalPrecision={7} thousandSeparator={true} prefix={'$'} /></td>
                        <td><NumberFormat value={this.state.coinlist[key].ConversionInfo.Supply} displayType={'text'} thousandSeparator={true} prefix={'$'} />.00</td>
                    </tr>   
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Today;