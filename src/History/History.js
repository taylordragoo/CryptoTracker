import React, { Component } from "react";
import './history.css'
import axios from 'axios'
import moment from 'moment'

class History extends Component {
    constructor() {
        super();
        this.state = {
            todayprice: {},
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
    // Get ETH Prices for specific date range
    getETHPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }
    // get BTC Prices for date range
    getBTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }
    // get LTC Prices for date range
    getLTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }
    
    getTodayPrice() {
        // Today Timestamp
        let t = moment();
        
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                
                this.setState({ todayprice: f});
            }));
    }
    getYesterdayPrice() {
        
        let t = moment().subtract(7, 'days');
        
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
    
    componentWillMount(){
        this.getTodayPrice();
        this.getYesterdayPrice();
    }
    render() {
        return (
            <div className="history--section container">
                <h2>History</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <h4>{this.state.todayprice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.todayprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.todayprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="history--section__box__inner">
                        <h4>{this.state.yesterdayprice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.yesterdayprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.yesterdayprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

}

export default History;