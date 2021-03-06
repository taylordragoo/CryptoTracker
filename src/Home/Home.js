import React, { Component } from "react";
import axios from 'axios'
import moment from 'moment'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            todaynews: []
        };
    }
    
    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/news/?lang=EN')
            .then(res => {
                const todaynews = res.data;
                this.setState({todaynews});
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        return(
            <table key={this.state.todaynews.title} className='table is-striped'>
                <thead>
                    <tr>
                        <th>News</th>
                    </tr>
                </thead>
                
                <tbody>
                    {Object.keys(this.state.todaynews).map((key) => (
                        <tr key={key}>
                            <td>
                                <a href={this.state.todaynews[key].url}>
                                    <h3>{this.state.todaynews[key].title}</h3>
                                </a>
                                <p>{this.state.todaynews[key].body.slice(0, 150)}...</p>
                                <span className="left"><p><a href={this.state.todaynews[key].url} target="_blank">Continue reading...</a></p></span>
                                <span className="right">{this.state.todaynews[key].date}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Home;