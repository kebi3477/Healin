import React, { Component } from 'react';
import Menu from './menu';
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
            // <div>
            //     <div className='profile' onClick={() => changeUrl('mypage')}>
            //         <div className='profile-image'></div>
            //         <div className='profile-welcome'>
            //             <div>안녕하세요</div>
            //             <div className='profile-nickname'>{this.state.nickName}님</div>
            //         </div>
            //         <div className='profile-push'></div>
            //     </div>
            //     <div className='recommend'>
            //         <div className='title'>추천 프로그램</div>
            //         <Card></Card>
            //     </div>
            //     <div className='part'>
            //         <div className='title'>부위별 프로그램</div>
            //         <div className='part-card'>
            //             <div className='card'></div>
            //             <div className='card'></div>
            //             <div className='card'></div>
            //         </div>
            //     </div>
            //     <MenuBar></MenuBar>
            // </div>
            <div>
                <div className="main__container">
                    <div className="main__header" onClick={() => changeUrl('rank')}>
                        <div className="main__header--text">
                            <h1 className="main__header--text-greeting">안녕하세요, <strong>{this.state.nickName}</strong>님</h1>
                            <h1 className="main__header--text-rank">나의 현재 등급 '<strong>브론즈</strong>' 입니다.</h1>
                        </div>
                        <div className="main__header--picture">
                            <img className="main__header--picture-img" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="my profile img" />
                        </div>
                    </div>

                    <div className="main__contents">
                        <div className="main__contents--recomm">
                            <h1 className="main__contents--recomm-text">추천 프로그램</h1>
                            <div className="main__contents--recomm-routine">
                                <img className="main__contents--recomm-routine-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFeqFhshZ-zRrt6bIrYehbUGKEQBexCAWeDg&usqp=CAU" alt="main page routin" />
                                <div className="main__contents--recomm-routine-info">
                                    <div className="main__contents--recomm-routine-info-ments">
                                        <h1>풀업(Pull-up)</h1>
                                        <h1>광배근, 승모근, 상체 전체</h1>
                                    </div>
                                    <div className="main__contents--recomm-routine-info-pointBox">
                                        <svg className="point-Icon" viewBox="0 0 40 40">
                                            <circle className="icon-circle" cx="20" cy="20" r="20"/>
                                            <path d="M33.88,20.35A4,4,0,0,0,30,16.52a7.35,7.35,0,0,0-6.12,3c-.27.34-.49.71-.73,1.07a6.36,6.36,0,0,0-6.62.87L16,16.52h2.87a1.71,1.71,0,0,0,1.24-.46c.82-.81,1.65-1.61,2.44-2.44a1.67,1.67,0,0,0,.11-2.17.27.27,0,0,1,0-.34A1.63,1.63,0,0,0,22.15,9c-.58-.44-1.2-.83-1.82-1.22a3.71,3.71,0,0,0-2-.52A6.12,6.12,0,0,0,14,8.93a23.07,23.07,0,0,0-3.28,3.9,30,30,0,0,0-3.32,6.81,14.58,14.58,0,0,0-1.06,5,10.92,10.92,0,0,1-.3,1.86v.66s0,0,0,0a2.75,2.75,0,0,0,1.52,2,27.92,27.92,0,0,0,12.59,3.5A29.42,29.42,0,0,0,31,31.24a4,4,0,0,0,2.92-3.82C33.93,25.06,33.93,22.71,33.88,20.35Z"/>
                                        </svg>
                                        <h1 className="main__contents--recomm-routine-info-point">3</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main__contents--part">
                            <h1 className="main__contents--part-text">부위별 프로그램</h1>
                            <div className="main__contents--part-items">
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu></Menu>
            </div>
        )
    }
}

export default Main;