import React, { Component } from 'react';

function CardModule(props) {
    return (
        <div className="card">{props.name}</div>
    )
}


class Card extends Component {
    render() {
        const testData = [{
            "id" : 1,
            "name" : "A1"
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