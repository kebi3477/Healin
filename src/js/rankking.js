import React, { Component } from 'react';
import Menu from './menu';

class Rank extends Component {

    
    render() {
        return(
            <div>
                <div className='menu'>
                    <Menu class='health' />
                    <Menu class='chat' />
                    <Menu class='rank' />
                    <Menu class='profile' />
                </div>
            </div>
        )
    }
}

export default Rank;