import React, { Component } from 'react';
import Menu from './menu';
import Card from './card';
import '../css/main.css';

class Main extends Component {

    componentDidMount() {
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
                alert("로그인이 필요합니다! 로그인 창으로 돌아갑니다.")
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
                            <Card></Card>
                            <Card></Card>
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
                    <Menu class='health' />
                    <Menu class='chat' />
                    <Menu class='rank' />
                    <Menu class='profile' />
                </div>
            </div>
        )
    }
}

export default Main;