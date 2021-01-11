import React, { Component } from 'react';
import MenuBar from './menuBar';
import '../css/rank.css';

class Rank extends Component {
    
    render() {
        const rankList = [{
            name : '방귀뀌는수달',
            email : 'user@naver.com',
            point : 25300
        }, {
            name : '리어카부수는수달',
            email : 'user@naver.com',
            point : 24932
        }, {
            name : '혐팬치수딜',
            email : 'user@naver.com',
            point : 24930
        }, {
            name : '개트롤수달',
            email : 'user@naver.com',
            point : 24754
        }, {
            name : '빵구',
            email : 'user@naver.com',
            point : 24431
        }, {
            name : '빵구',
            email : 'user@naver.com',
            point : 22231
        }, {
            name : '빵구',
            email : 'user@naver.com',
            point : 21231
        }, {
            name : '빵구',
            email : 'user@naver.com',
            point : 27031
        }, {
            name : '빵구',
            email : 'user@naver.com',
            point : 28831
        }];

        const rankListCopoy = rankList.sort((a, b) => {
            return a.point > b.point ? -1 : a.point < b.point ? 1 : 0;
        })

        const rankListItem = rankListCopoy.map((el, index) => {
            const rankWordArr = ['st', 'nd', 'rd', 'th'];
            return (
                <div className="rank__item">
                    <div className="rank__myrank">{index+1}{index < 3 ? rankWordArr[index] : rankWordArr[3]}</div>
                    <div className="rank__profile">
                        <div className="rank__profile--image"></div>
                        <div className="rank__info">
                            <div className="rank__name">{el.name}</div>
                            <div className="rank__email">{el.email}</div>
                        </div>
                    </div>
                    <div className="rank__mypoint">
                        <div className="rank__strength"></div>
                        <div className="rank__point">{el.point}</div>
                    </div>
                </div>)
            }
        )

        return(
            <div className="rank__container">
                <div className="header__box">
                    <div className="header__box--left">
                        <div className="header__title">Rank</div>
                        <div className="header__text">4th</div>
                    </div>
                    <div className="header__profile">
                        <div className="header__image"></div>
                        <div className="header__name">빵꾸</div>
                    </div>
                    <div className="header__box--right">
                        <div className="header__strength"></div>
                        <div className="header__text">24312 pts</div>
                    </div>
                </div>
                <div className="rank__list">
                    {rankListItem}
                </div>
                <MenuBar></MenuBar>
            </div>
        )
    }
}

export default Rank;