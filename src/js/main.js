import React, { Component } from 'react';
import MenuBar from './menuBar';
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
            } else {
                this.setState({
                    nickName : json.nickName
                })
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            activeMenu : 0,
            nickName : ""
        }
    }

    changeActiveMenu = e => {
        this.setState({
            activeMenu : e.target
        })
    }

    
    logout = () => { //로그아웃
        fetch('/home/logout', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
    
    render() {
        const changeUrl = path => { //주소 변경 함수
            window.location.href = `../${path}`;
        }
        
        return (
            <div>
                <div className='profile' onClick={() => changeUrl('mypage')}>
                    <div className='profile-image'></div>
                    <div className='profile-welcome'>
                        <div>안녕하세요</div>
                        <div className='profile-nickname'>{this.state.nickName}님</div>
                    </div>
                    <div className='profile-push'></div>
                </div>
                <div className='recommend'>
                    <div className='title'>추천 프로그램</div>
                    <Card></Card>
                </div>
                <div className='part'>
                    <div className='title'>부위별 프로그램</div>
                    <div className='part-card'>
                        <div className='card'></div>
                        <div className='card'></div>
                        <div className='card'></div>
                    </div>
                </div>
                <MenuBar></MenuBar>
            </div>
        )
    }
}

export default Main;