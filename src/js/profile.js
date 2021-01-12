import React, { Component } from 'react';
import Menu from './menu';
import '../css/profile.css';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            setting : false
        }
    }

    handleSetting = () => {
        this.setState({
            setting : !this.state.setting
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
        .then(data => data.json())
        .then(json => {
            if(json.success) 
                window.location = '../';
        })
    }

    render() {
        return(
            <div className="profile__container">
                <div className="profile__setting" onClick={this.handleSetting}>
                    <svg className="profile__setting--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path className="path out__gear" d="M37.94,15.56H34.2a1.44,1.44,0,0,1-1-2.46l2.65-2.64a2.08,2.08,0,0,0,0-2.92L32.46,4.17a2.11,2.11,0,0,0-2.92,0L26.9,6.82a1.44,1.44,0,0,1-2.46-1V2.06A2.05,2.05,0,0,0,22.39,0H17.61a2.05,2.05,0,0,0-2,2.06V5.8a1.44,1.44,0,0,1-2.46,1L10.46,4.17a2.11,2.11,0,0,0-2.92,0L4.17,7.54a2.08,2.08,0,0,0,0,2.92L6.82,13.1a1.44,1.44,0,0,1-1,2.46H2.06a2.05,2.05,0,0,0-2.06,2v4.77a2.06,2.06,0,0,0,2.06,2.06H5.8a1.44,1.44,0,0,1,1,2.46L4.17,29.54a2.08,2.08,0,0,0,0,2.92l3.37,3.37a2.11,2.11,0,0,0,2.92,0l2.64-2.65a1.44,1.44,0,0,1,2.46,1v3.74a2.05,2.05,0,0,0,2,2.06h4.77a2.06,2.06,0,0,0,2.06-2.06V34.2a1.4,1.4,0,0,1,.89-1.33,1.41,1.41,0,0,1,1.57.31l2.64,2.65a2.1,2.1,0,0,0,2.91,0l3.38-3.37a2.08,2.08,0,0,0,0-2.92L33.18,26.9a1.44,1.44,0,0,1,1-2.46h3.74A2.05,2.05,0,0,0,40,22.39V17.61A2.05,2.05,0,0,0,37.94,15.56Zm.58,6.83a.58.58,0,0,1-.58.57H34.2a2.92,2.92,0,0,0-2.07,5l2.65,2.64a.57.57,0,0,1,0,.82l-3.37,3.37a.57.57,0,0,1-.82,0L28,32.13a2.92,2.92,0,0,0-5,2.07v3.74a.58.58,0,0,1-.57.58H17.61a.58.58,0,0,1-.57-.58V34.2a2.88,2.88,0,0,0-1.8-2.7,3.09,3.09,0,0,0-1.14-.23,2.92,2.92,0,0,0-2,.86L9.41,34.78a.57.57,0,0,1-.82,0L5.22,31.41a.57.57,0,0,1,0-.82l2.65-2.65A2.92,2.92,0,0,0,5.8,23H2.06a.58.58,0,0,1-.58-.57V17.61A.58.58,0,0,1,2.06,17H5.8a2.92,2.92,0,0,0,2.07-5L5.22,9.41a.57.57,0,0,1,0-.82L8.59,5.22a.57.57,0,0,1,.82,0l2.64,2.64A2.92,2.92,0,0,0,17,5.8V2.06a.58.58,0,0,1,.57-.58h4.77a.58.58,0,0,1,.58.58V5.8a2.92,2.92,0,0,0,5,2.07l2.64-2.65a.57.57,0,0,1,.82,0l3.37,3.37a.57.57,0,0,1,0,.82l-2.65,2.65a2.92,2.92,0,0,0,2.07,5h3.74a.58.58,0,0,1,.58.57Z"/><path className="path in__gear" d="M20,13.33A6.67,6.67,0,1,0,26.67,20,6.67,6.67,0,0,0,20,13.33Zm0,11.86A5.19,5.19,0,1,1,25.19,20,5.2,5.2,0,0,1,20,25.19Z"/></svg>
                </div>
                <div className="profile__user">
                    <div className="profile__user--account">
                    <div className="profile__user--account-avatar">
                        <img src="https://cdn.pixabay.com/photo/2020/12/20/04/06/bear-5846065_960_720.jpg" alt="avatar" />
                    </div>
                    <h1 className="profile__user--account-name">빵꾸</h1>
                    <h2 className="profile__user--account-email">user@naver.com</h2>
                    <h3 className="profile__user--account-rank bronze">Bronze</h3>
                    </div>
                    <div className="profile__user--info">
                    <div className="profile__user--info-box">
                        <h1 className="profile__user--info-text">24</h1>
                        <h2 className="profile__user--info-name">DAY</h2>
                    </div>
                    <div className="profile__user--info-box">
                        <h1 className="profile__user--info-text">562</h1>
                        <h2 className="profile__user--info-name">RANK</h2>
                    </div>
                    <div className="profile__user--info-box">
                        <h1 className="profile__user--info-text">240</h1>
                        <h2 className="profile__user--info-name">POINT</h2>
                    </div>
                    </div>
                </div>
                { !this.state.setting ? <div className='profile__deck'>
                    <h1 className="title">나의 덱</h1>
                    <div className="profile__deck--container">
                    <div className="profile__deck--container-box">
                        <div className="profile__deck--container-box-card"></div>
                        <div className="profile__deck--container-box-card"></div>
                        <div className="profile__deck--container-box-card"></div>
                        <div className="profile__deck--container-box-card"></div>
                    </div>
                    </div>
                </div> 
                : <div className="profile__setting--list">
                    <h1 className="title">설정</h1>
                    <div className="profile__setting--item">
                        <input type="text" placeholder="닉네임"></input>
                        {/* <div className="profile__setting--button">변경</div> */}
                    </div>
                    <div className="profile__setting--item">
                        <div className="profile__setting--logout" onClick={this.logout}>로그아웃</div>
                    </div>
                </div>
                }
                <Menu></Menu>
            </div>
        )
      }
}

export default Profile;