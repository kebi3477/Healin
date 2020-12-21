import React, { Component } from 'react';
import Menu from './menu';

class Chat extends Component {

    
    render() {
        return(
            <div>
                <div className='menu'>
                    <Menu type='health' />
                    <Menu type='chat' />
                    <Menu type='rank' />
                    <Menu type='profile' />
                </div>
            </div>
        )
    }
}

export default Chat;