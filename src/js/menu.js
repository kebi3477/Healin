import React, { Component } from 'react';

function Menu(props) {
    const domClassName = `menu-${props.class}`
    let activeFlag = false;
    
    const changeLocation = () => {
        let inner;
        if(props.class === 'health') {
            inner = 'main';
        } else if(props.class === 'chat') {
            inner = 'chatting';
        } else if(props.class === 'rank') {
            inner = 'rankking';
        } else {
            inner = 'mypage';
        }
        
        window.location = `../${inner}`;
    }
    
    if(window.location.pathname === '/main' && props.class === 'health') {
        activeFlag = true;
    } else if(window.location.pathname === '/chatting' && props.class === 'chat') {
        activeFlag = true;
    } else if(window.location.pathname === '/rankking' && props.class === 'rank') {
        activeFlag = true;
    } else if(window.location.pathname === '/mypage' && props.class === 'mypage') {
        activeFlag = true;
    }

    return (
        <div onClick={changeLocation} className={activeFlag ? 'menu-active' : ''}>
            <div className={domClassName}></div>
        </div>
    );
}

export default Menu