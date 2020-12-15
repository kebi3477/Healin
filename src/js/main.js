import React, { Component } from 'react';
import '../css/main.css';

class Main extends Component {

    componentWillMount() {
        fetch('/home/check', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(data => data.json())
        .then(json => {
            if(json.nonLogin) {
                window.location = '../';
            }
        })
    }

    logout = () => {
        fetch('/home/logout', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }

    render() {
        return (
            <div>
                <div className='profile'>
                    <div className='profile-image'></div>
                    <div className='profile-welcome'>
                        <div>안녕하세요</div>
                        <div className='profile-nickname'>짱구님</div>
                    </div>
                    <div className='profile-push'></div>
                </div>
                <div className='recommend'>
                    <div className='title'>추천 프로그램</div>
                    <div className='recommend-card'>
                        <div className='recommend-card-box'>
                            <div className='card'></div>
                            <div className='card'></div>
                            <div className='card'></div>
                        </div>
                    </div>
                </div>
                <div className='part'>
                    <div className='title'>부위별 프로그램</div>
                    <div className='part-card'>
                        <div className='card'></div>
                        <div className='card'></div>
                        <div className='card'></div>
                    </div>
                </div>
                <div className='menu'>
                    <div className='menu-active'><div className='menu-health'></div></div>
                    <div><div className='menu-chat'></div></div>
                    <div><div className='menu-rank'></div></div>
                    <div onClick={this.logout}><div className='menu-profile'></div></div>
                </div>
            </div>
        )
    }
}

export default Main;