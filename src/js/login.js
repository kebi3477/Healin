import React, { Component } from 'react';
import '../css/login.css';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            introCnt : 0,
            id : '',
            pw : '',
            rePw : '',
            email : '',
            idLabel : '',
            pwLabel : '',
            rePwLabel : '',
            emailLabel : '',
            idCheck : false,
            pwCheck : false,
            rePwCheck : false,
            emailCheck : false,
            loading : false,
            onSignUp : false,
            certifing : false,
            certifiNumber : '',
            emailSending : false,
            emailEnabled : false,
            timer : '3:01'
        } 
        //todo : made email certifiedNUmber
    }

    signIn = () => {    //로그인
        const user = {
            id : this.state.id,
            pw : this.state.pw
        }
        this.imLoading();
        if(user.id === '' || user.pw === '') {
            alert("아이디 혹은 비밀번호를 확인해주세요!");
            setTimeout(this.imLoading, 100);
        } else {
            fetch('/user/signIn', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                console.log(json)
                if(json.result === "success") {
                    window.location.replace("/main");
                } else {
                    alert("아이디 혹은 비밀번호를 확인해주세요!")
                }
                this.imLoading();
            })
        }
    }

    signUp = () => {    //회원가입
        const user = {
            id : this.state.id,
            pw : this.state.pw,
            rePw : this.state.rePw,
            email : this.state.email,
            idCheck : this.state.idCheck,
            pwCheck : this.state.pwCheck,
            rePwCheck : this.state.rePwCheck,
            emailCheck : this.state.emailCheck
        }
        this.imLoading();
        if(user.id === '' || user.pw === '' || user.rePw === '' || user.email === '') {
            alert("정보를 전부 입력해주세요!");
            setTimeout(this.imLoading, 100);
        } else if(!user.idCheck || !user.pwCheck || !user.rePwCheck || !user.emailCheck) {
            alert("잘못된 정보가 없는지 다시 한번 확인해보세요!");
            setTimeout(this.imLoading, 100);
        } else {
            fetch('/user/signUp', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            alert('회원 등록 되었습니다!');
            setTimeout(this.imLoading, 500);
            setTimeout(this.setState({ onSignUp : false }), 1000);
        }
    }

    idCheck = () => {   //아이디 중복검사
        const user = {
            id : this.state.id
        }
        if (!/^[a-z0-9]{7,20}$/.test(user.id)) {
            this.setState({ 
                idLabel : '소문자, 숫자 7~20자리로 입력해주세요!',
                idCheck : false
            })
        } else {
            fetch('/user/idCheck', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                if(json.length === 1) {
                    this.setState({ 
                        idLabel : '아이디가 존재합니다.',
                        idCheck : false
                    })
                } else {
                    this.setState({ 
                        idLabel : '사용 가능한 아이디입니다.',
                        idCheck : true
                    })
                }
            })
        }
    }

    pwCheck = () => {   //비밀번호 정규식 검사
        const user = {
            pw : this.state.pw
        }
        if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(user.pw)) {
            this.setState({ 
                pwLabel : '소문자, 숫자 8~20자리로 입력해주세요!',
                pwCheck : false
            })
        } else {
            this.setState({ 
                pwLabel : '사용 가능한 비밀번호입니다.',
                pwCheck : true
            });
        }
    }

    pwSameCheck = () => {   //비밀번호 같은지 검사
        const user = {
            pw : this.state.pw,
            rePw : this.state.rePw
        }

        if(user.rePw === '') {
            this.setState({ 
                rePwLabel : '필수사항 입니다. 입력해주세요.',
                rePwCheck : false
            })
        } else if(user.pw === user.rePw) {
            this.setState({ 
                rePwLabel : '비밀번호가 같습니다!',
                rePwCheck : true
            })
        } else {
            this.setState({ 
                rePwLabel : '비밀번호가 같지 않습니다!',
                rePwCheck : false
            })
        }
    }

    emailCheck = () => {    //이메일 정규식 검사
        const user = {
            email : this.state.email
        }
        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(user.email)) {
            this.setState({ 
                emailLabel : '이메일 형식을 지켜주세요!',
                emailCheck : false
            })
        } else {
            fetch('/user/emailCheck', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                if(json.length === 1) {
                    this.setState({ 
                        emailLabel : '이메일이 존재합니다.',
                        emailCheck : false
                    })
                } else {
                    this.setState({ 
                        emailLabel : '사용 가능한 이메일입니다!',
                        emailCheck : true
                    })
                }
            })
        }
    }

    emailCertified = () => {    //이메일 인증
        if(this.state.emailCheck) {
            const user = {
                email: this.state.email
            }
            this.setState({
                emailSending : true,
                emailEnabled : true
            })
            fetch('/user/emailCertified', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                this.timer();
                this.setState({
                    emailLabel : '이메일을 확인해주세요!',
                    certifing : true,
                    emailSending : false
                })
                console.log(json.info);
            })
        } else {
            this.setState({
                emailLabel : '이메일 형식을 지켜주셔야 인증번호를 보내드립니다.'
            })
        }
    }

    emailCertifiedCheck = () => {
        const user = { number : this.state.certifiNumber }
        fetch('/user/emailCertifiedCheck', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
        .then(data => data.json())
        .then(json => {
            if(json.check) {
                alert("인증 성공");
            } else {
                alert("인증 실패")
            }
        })   
    }

    timer = () => {
        let time = 180;
        let min = "";
        let sec = "";

        var timeInterval = setInterval(() => {
            min = parseInt(time/60);
            sec = time % 60;
            sec = sec < 10 ? `0${sec}` : sec
            this.setState({
                timer : `${min}:${sec}`
            })
            time--;
            if(time < 0) {
                clearInterval(timeInterval);
                fetch('/user/certifiedNumberDelete')
            }
        }, 1000);
        var removeTimer = () => {
            clearInterval(timeInterval);
        }
    }

    handleChange = e => { //input에 data가 변경될 때마다 this.state에 값을 넣어줌
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleKeyPress = e => { // 로그인 시, password에서 enter키를 눌렀을 경우 로그인 이벤트
        if(e.key === 'Enter') {
            this.signIn();
        }
    }

    handleChangeSignUp = e => { //회원가입 및 로그인 키를 눌렀을 경우 초기화
        this.setState({
            idLabel : '',
            pwLabel : '',
            rePwLabel : '',
            emailLabel : '',
            idCheck : false,
            pwCheck : false,
            rePwCheck : false,
            emailCheck : false,
            onSignUp : this.state.onSignUp ? false : true,
            certifing : false
        })
    }

    addIntroCnt = () => { //처음 인트로 이벤트 시 값
        this.setState({
            introCnt: this.state.introCnt+1
        });
    }

    imLoading = () => { //로딩일 경우 true, ! false
        this.setState({ 
            loading: this.state.loading ? false : true 
        });
    }

    componentDidMount() { //실행주기시, dom을 불러온 후 실행
        for(let i = 1; i < 5; i++) {
            setTimeout(this.addIntroCnt, i*1000)
        }
    }

    render() {
        const appName = 'HEALIN';
        const introClassArr = ["intro4 intro3 intro2 intro", "intro4 intro3 intro2", "intro4 intro3", "intro4", ""];
        return (
            <div className='user'>
                { this.state.loading ? 
                    <div className='loading'>
                        <div className='circle'></div>
                    </div>
                : '' }
                { !this.state.onSignUp ? 
                    <div className={`login ${introClassArr[this.state.introCnt]}`}>
                        <div className='logo'>{appName}</div>
                        <div className='input'>
                            <input type='text' className='login_id' onChange={this.handleChange} name='id' placeholder='아이디'></input>
                            <input type='password' className='login_pw' onChange={this.handleChange} name='pw' placeholder='비밀번호' onKeyPress={this.handleKeyPress}></input>
                        </div>
                        <div className='user_btn' onClick={this.signIn}>로그인</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>손님, 회원 등록 하시겠어요?</div>
                    </div>
                :   <div className='signup'>
                        <div className='input'>
                            <input type='text' placeholder='아이디' onChange={this.handleChange} name='id' onBlur={this.idCheck}></input>
                            <label className={`input_label ${this.state.idCheck ? 'green' : 'red'}`}>{this.state.idLabel}</label>
                            <input type='password' placeholder='비밀번호' onChange={this.handleChange} onBlur={this.pwCheck} name='pw'></input>
                            <label className={`input_label ${this.state.pwCheck ? 'green' : 'red'}`}>{this.state.pwLabel}</label>
                            <input type='password' placeholder='비밀번호 재확인' onChange={this.handleChange} name='rePw' onBlur={this.pwSameCheck}></input>
                            <label className={`input_label ${this.state.rePwCheck ? 'green' : 'red'}`}>{this.state.rePwLabel}</label>
                            <div className={`email_box ${this.state.emailEnabled ? 'email_enabled' : ''}`}>
                                <input type='text' placeholder='이메일' onChange={this.handleChange} onBlur={this.emailCheck} name='email'></input>
                                <div className='email_certified' onClick={this.emailCertified}>{this.state.emailEnabled ? '재전송' : '전송'}</div>
                                { this.state.emailSending ? <div className="email_loading_circle circle"></div> : "" }
                            </div>
                            <label className={`input_label ${this.state.emailCheck ? 'green' : 'red'}`}>{this.state.emailLabel}</label>
                            { this.state.certifing ? <div className="email_certified_box">
                                <input type="text" placeholder='인증번호' className='email_certified_number' onChange={this.handleChange} name='certifiNumber'></input>
                                <div className="email_certified_btn" onClick={this.emailCertifiedCheck}>확인</div>
                                <label>{this.state.timer}</label>
                            </div> : "" }
                        </div>
                        <div className='user_btn' onClick={this.signUp}>회원가입</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>계정이 이미 있습니다.</div>
                    </div> }  
            </div>
        )
    }
};

export default login;