import React, { Component } from "react";
import './history.css'
import axios from 'axios'
import moment from 'moment'

class History extends Component {
    constructor() {
        super();
        this.state = {
            yesterdayprice: {},
            weekprice: {},
            monthprice: {},
            yearprice: {},
            fiveyearprice: {}
        }
        this.getBTCPrices = this.getBTCPrices.bind(this);
        this.getETHPrices = this.getETHPrices.bind(this);
        this.getLTCPrices = this.getLTCPrices.bind(this);
    }

    getETHPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }

    getBTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }
    
    getLTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }

    yesterdayPrice() {
        
        let t = moment().subtract(1, 'days').unix();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ yesterdayprice: f});
            }));       
    }
    
    weekPrice() {
        
        let t = moment().subtract(7, 'days').unix();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ weekprice: f});
            }));       
    }
    
    monthPrice() {
        
        let t = moment().subtract(30, 'days').unix();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ monthprice: f});
            }));       
    }
    
    yearPrice() {
        
        let t = moment().subtract(365, 'days').unix();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ yearprice: f});
            }));       
    }
    
    fiveYearPrice() {
        
        let t = moment().subtract(1825, 'days').unix();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ fiveyearprice: f});
            }));       
    }
    
    componentWillMount(){
        this.yesterdayPrice();
        this.weekPrice();
        this.monthPrice();
        this.yearPrice();
        this.fiveYearPrice();
    }
    render() {
        return (
            
            <div>
            
                <table class='table is-narrow is-stripe'>
                    <thead>
                        <tr>
                            <th>1-Day</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BTC = ${this.state.yesterdayprice.btc}</td>
                            <td>ETH = ${this.state.yesterdayprice.eth}</td>
                            <td>LTC = ${this.state.yesterdayprice.ltc}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class='table is-narrow is-stripe'>
                    <thead>
                        <tr>
                            <th>7-Day</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BTC = ${this.state.weekprice.btc}</td>
                            <td>ETH = ${this.state.weekprice.eth}</td>
                            <td>LTC = ${this.state.weekprice.ltc}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class='table is-narrow is-stripe'>
                    <thead>
                        <tr>
                            <th>30-Day</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BTC = ${this.state.monthprice.btc}</td>
                            <td>ETH = ${this.state.monthprice.eth}</td>
                            <td>LTC = ${this.state.monthprice.ltc}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class='table is-narrow is-stripe'>
                    <thead>
                        <tr>
                            <th>1-Year</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BTC = ${this.state.yearprice.btc}</td>
                            <td>ETH = ${this.state.yearprice.eth}</td>
                            <td>LTC = ${this.state.yearprice.ltc}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class='table is-narrow is-stripe'>
                    <thead>
                        <tr>
                            <th>5-Year</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BTC = ${this.state.fiveyearprice.btc}</td>
                            <td>ETH = ${this.state.fiveyearprice.eth}</td>
                            <td>LTC = ${this.state.fiveyearprice.ltc}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        );
    }

}

export default History;