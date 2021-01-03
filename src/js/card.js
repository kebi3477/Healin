import React, { Component } from 'react';
import '../css/card.css';

function CardModule(props) {

    return (
        <div className="card" onClick={() => props.change(props.name)}>
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
    constructor(props) {
        super(props);
        this.state = {
            onDetailCard : false,
            detailCardType : ""
        }
    }
    
    render() {
        const showDetailCard = code => {
            this.setState({
                onDetailCard : this.state.onDetailCard ? false : true,
                detailCardType : code
            })
        }

        const detailCard = (
            <div className="background">
                <div className="card-detail">
                    <div className="card-detail_inner">
                        <div className="card-detail_level">LEVEL 1</div>
                        <div className="card-detail_enname">{this.state.detailCardType}</div>
                        <div className="card-detail_image"></div>
                        <div className="card-detail_count">
                            3 SET - 10REPS/SET
                        </div>
                        <div className="card-detail_korname">턱걸이</div>
                    </div>
                </div>
                <div className="card-button">
                    <div className="card-close" onClick={() => showDetailCard(this.state.detailCardType)}>X Close</div>
                    <div className="card-next">Next ></div>
                </div>
            </div>
        )

        const testData = [{
            "id" : 1,
            "name" : "PULL-UP"
        }, {
            "id" : 2,
            "name" : "A2"
        }]

        const mapToComponent = data => {
            return data.map((value, index) => {
                return (
                    <CardModule change={() => showDetailCard(value.name)} name={value.name} key={index}/>
                )
            })
        }
        return(
            <div className='recommend-card'>
                {this.state.onDetailCard ? detailCard : ""}
                <div className='recommend-card-box'>
                    {mapToComponent(testData)}
                </div>
            </div>
        )
    }
}

export default Card;