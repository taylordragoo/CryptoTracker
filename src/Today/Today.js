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
        axios.get('https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD')
            .then(res => {
                const coinlist = res.data.Data;
                this.setState({coinlist: coinlist});
            })
            // Error catching
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return(
            <div>
                <table className="table is-narrow is-bordered is-striped">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Full Name</th>
                            <th>Total Value</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {Object.keys(this.state.coinlist).map((key) => (
                        <tr key={key}>
                            <td>{this.state.coinlist[key].CoinInfo.Name}</td>
                            <td>{this.state.coinlist[key].CoinInfo.FullName}</td>
                            <td><NumberFormat value={this.state.coinlist[key].ConversionInfo.TotalVolume24H} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} /></td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Today;