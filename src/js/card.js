import React, { Component } from 'react';
import '../css/card.css';

function CardModule(props) {

    const showCardDetail = props => {
        console.log(props)
    }

    return (
        <div className="card" onClick={() => showCardDetail(props.name)}>
            <div className="title">
                <div className="title-name">{props.name}</div>
                <div className="title-rank"></div>
            </div>
            <div className="image"></div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}


class Card extends Component {
    render() {
        const testData = [{
            "id" : 1,
            "name" : "PULL-UP"
        }, {
            "id" : 2,
            "name" : "A2"
        }]

        const mapToComponent = data => {
            return data.map((value, index) => {
                return (<CardModule name={value.name} key={index} />)
            })
        }
        return(
            <div className='recommend-card-box'>
                {mapToComponent(testData)}
            </div>
        )
    }
}

export default Card;