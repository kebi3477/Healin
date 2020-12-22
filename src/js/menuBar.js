import React from 'react';
import Menu from './menu';

class MenuBar extends React.Component {

    render() {
        return (
            <div className='menu'>
                <Menu type='health' />
                <Menu type='chat' />
                <Menu type='rank' />
                <Menu type='profile' />
            </div>
        )
    }

}

export default MenuBar;