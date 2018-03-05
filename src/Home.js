import React, { Component } from "react";
import axios from 'axios'
import moment from 'moment'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            todaynews: {}
        }
        this.getNEWSToday = this.getNEWSToday.bind(this);
    }
    
    getNEWSToday() {
        return axios.get('https://min-api.cryptocompare.com/data/news/?lang=EN')
    }
    
    getToday() {
        
        axios.all([axios.get('https://min-api.cryptocompare.com/data/news/?lang=EN')])
            .then(axios.spread((news) => {
                let f = {
                    news: news.data.title
                }
                this.setState({ todaynews: f});
            }));
    }
    
    componentWillMount() {
        this.getToday();
    }
    
    render() {
        return(
            <div>
                <h2>{this.state.todaynews.news}</h2>
            </div>
        );
    }
}

export default Home;