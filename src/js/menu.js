import React from 'react';

function Menu(props) {
    const domClassName = `menu-${props.type}`
    let activeFlag = false;
    
    const changeLocation = () => {
        let inner;
        if(props.type === 'health') {
            inner = 'main';
        } else if(props.type === 'chat') {
            inner = 'chatting';
        } else if(props.type === 'rank') {
            inner = 'rank';
        } else {
            inner = 'mypage';
        }
        window.location = `../${inner}`;
    }
    
    if(window.location.pathname === '/main' && props.type === 'health') {
        activeFlag = true;
    } else if(window.location.pathname === '/chatting' && props.type === 'chat') {
        activeFlag = true;
    } else if(window.location.pathname === '/rank' && props.type === 'rank') {
        activeFlag = true;
    } else if(window.location.pathname === '/mypage' && props.type === 'profile') {
        activeFlag = true;
    }

    return (
        <div onClick={changeLocation} className={activeFlag ? 'menu-active' : ''}>
            <div className={domClassName}></div>
        </div>
    );
}

export default Menu