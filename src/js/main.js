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

    constructor(props) {
        super(props);
        this.state = {
            activeMenu : 0
        }
    }
    

    changeActiveMenu = e => {
        console.log(e.target)
        this.setState({
            activeMenu : e.target
        })
        console.log(this.state)
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

    componentDidMount() {

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
                    <div className={this.state.activeMenu === 0 ? 'menu-active' : ''}>
                        <div className='menu-health'></div>
                    </div>
                    <div className={this.state.activeMenu === 1 ? 'menu-active' : ''}>
                        <div className='menu-chat'></div>
                    </div>
                    <div className={this.state.activeMenu === 2 ? 'menu-active' : ''}>
                        <div className='menu-rank'></div>
                    </div>
                    <div className={this.state.activeMenu === 3 ? 'menu-active' : ''} onClick={this.logout}>
                        <div className='menu-profile'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;