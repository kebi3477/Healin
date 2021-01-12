import React from 'react';
import '../css/menu.css';
import { ReactComponent as HealthIcon } from '../image/health.svg';
import { ReactComponent as ChatIcon } from '../image/chat.svg';
import { ReactComponent as RankIcon } from '../image/rank.svg';
import { ReactComponent as ProfileIcon } from '../image/profile.svg';

class Menu extends React.Component {

    render() {
        let activeFlag = 1;
        const pathName = window.location.pathname;

        const changeLocation = path => {
            window.location = `../${path}`;
        }
        
        if(pathName === '/chatting') {
            activeFlag = 2;
        } else if(pathName === '/rank') {
            activeFlag = 3;
        } else if(pathName === '/mypage') {
            activeFlag = 4;
        } else {
            activeFlag = 1;
        }

        
        return (
            <div className='menu'>
                <div onClick={() => changeLocation('main')} className={activeFlag === 1 ? 'menu-active' : ''}>
                    <HealthIcon />
                </div>
                <div onClick={() => changeLocation('chatting')} className={activeFlag === 2 ? 'menu-active' : ''}>
                    <ChatIcon />
                </div>
                <div onClick={() => changeLocation('rank')} className={activeFlag === 3 ? 'menu-active' : ''}>
                    <RankIcon />
                </div>
                <div onClick={() => changeLocation('mypage')} className={activeFlag === 4 ? 'menu-active' : ''}>
                    <ProfileIcon />
                </div>
            </div>
        )
    }

}

export default Menu;