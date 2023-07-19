import React, { useState, useRef } from 'react'
import "./Style/Login.css"
import logo from "./Img/logo.png"
import { useNavigate } from 'react-router-dom'
import NoteContext from '../Context/NoteContext';
import { useContext } from 'react';

const Login = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const {addQnote} = context
    // const [loginStyle, setLoginStyle] = useState([])
    const [loginState, setLoginState] = useState(false)
    const [passEnabled, setPassEnabled] = useState(false)

    const loginPortion = useRef()
    const regPortion = useRef()
    const [loginSide, setLoginSide] = useState({
        loginUser: "",
        loginPass: ""
    })
    const [regSide, setRegSide] = useState({
        regUser: "",
        regPass: ""
    })

    const handleOnChangeState = async () => {
        // console.log("clicked ", loginState)
        if (!loginState) {
            loginPortion.current.style.transform = "translate(-230px)"
            regPortion.current.style.transform = "translate(-126px)"
            await setLoginState(true)

        }
        else {
            loginPortion.current.style.transform = "translate(110px)"
            regPortion.current.style.transform = "translate(280px)"
            await setLoginState(false)

        }
    }

    const onChangeLoginPortion = (e) => {

        setLoginSide({ ...loginSide, [e.target.name]: e.target.value })
        console.log(loginSide)

    }

    const onChangeRegPortion = (e) => {

        setRegSide({ ...regSide, [e.target.name]: e.target.value })

    }

    const handleOnLoginSideContinue = async() => {
        if (!passEnabled) {
            setPassEnabled(true);
        }
        else {
            const response = await fetch("https://cleverback.vercel.app/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: loginSide.loginUser, username: loginSide.loginUser, password: loginSide.loginPass })
            })
            const json = await response.json()
            console.log(json)
            if(json.success){
                await localStorage.setItem("cleverid", json.id)
                await localStorage.setItem("clevertoken", json.authtoken)
                history("/")
                window.location.reload()

            }
            else{
                console.log(loginSide)
            }
        }
    }

    const handleOnRegSide = async() => {
        
            const response = await fetch("https://cleverback.vercel.app/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: regSide.regUser, username: regSide.regUser, password: regSide.regPass })
            })
            const json = await response.json()
            console.log(json)
            if(json.success){
                await localStorage.setItem("clevertoken", json.authtoken)
                await localStorage.setItem("cleverid", json.id)
                await addQnote()
                // setTimeout(() => {
                    history("/")
                    window.location.reload()
                    
                // }, 1000);
            }
            else{
                console.log(regPass)
            }
            
    }

    return (
        <div className='loginPage'>
            <div className="LoginCard">
                <div className="loginAlign" ref={loginPortion}>
                    <div className='logoUp loginInsiderDiv'><img src={logo} alt="" /></div>
                    <div className="loginMainHead loginInsiderDiv"><h1>Clevernote</h1></div>
                    <div className="loginUpperPara loginInsiderDiv"><p>Click Your Notes</p></div>
                    <div className="GoogleLogin loginInsiderDiv">
                        <button>
                            <div className="googleLogin"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327" alt="" /></div>
                            <div className="googleLoginText">Continue with Google</div>
                        </button>
                    </div>
                    <div className="AppleLogin loginInsiderDiv">
                        <button><div className="appleLogin">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/732px-Apple_logo_black.svg.png?20220821121934" alt="" /></div>
                            <div className="appleLoginText">Continue with Apple</div>
                        </button>
                    </div>
                    <div className="midBreak loginInsiderDiv" style={{ display: "flex" }}>
                        <hr className='loginInsiderDivHR' /> <div>or</div>  <hr className='loginInsiderDivHR' />
                    </div>
                    <div className="userInput loginInsiderDiv"><input type="text" name='loginUser' autoComplete='off' onChange={onChangeLoginPortion} placeholder='Email address or username' /></div>
                    {passEnabled && <div className="userInput loginInsiderDiv"><input type="text" name='loginPass' autoComplete='off' onChange={onChangeLoginPortion} placeholder='Password' /></div>}
                    <div className="loginContinue loginInsiderDiv"><button onClick={handleOnLoginSideContinue}>{passEnabled ? "Login" : "Continue"}</button></div>
                    <div className="TowardsRegister loginInsiderDiv">
                        <p className='towardsRegPText'>Don't Have an account</p>
                        <p onClick={handleOnChangeState} className='towardsRegPTextClick' style={{ color: " rgb(239, 144, 0)" }}>Create Account</p>
                    </div>

                </div>


                <div className="RegAlign" ref={regPortion}>
                    <div className='logoUp loginInsiderDiv'><img src={logo} alt="" /></div>
                    <div className="loginMainHead loginInsiderDiv"><h1>Clevernote</h1></div>
                    <div className="loginUpperPara loginInsiderDiv"><p>Click Your Notes</p></div>
                    <div className="GoogleLogin loginInsiderDiv">
                        <button>
                            <div className="googleLogin"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327" alt="" /></div>
                            <div className="googleLoginText">Continue with Google</div>
                        </button>
                    </div>
                    <div className="midBreak loginInsiderDiv" style={{ display: "flex" }}>
                        <hr className='loginInsiderDivHR' /> <div>or</div>  <hr className='loginInsiderDivHR' />
                    </div>
                    <div className="userInput loginInsiderDiv"><input type="text" name='regUser' onChange={onChangeRegPortion} autoComplete='off' placeholder='Email address or username' /></div>
                    <div className="userInput loginInsiderDiv"><input type="text" name='regPass' onChange={onChangeRegPortion} autoComplete='off' placeholder='Password' /></div>
                    <div className="loginContinue loginInsiderDiv"><button onClick={handleOnRegSide}>Sign Up</button></div>
                    <div className="TowardsRegister loginInsiderDiv">
                        <p className='towardsRegPText'>Already Have Account</p>
                        <p onClick={handleOnChangeState} className='towardsRegPTextClick' style={{ color: " rgb(239, 144, 0)" }}>Login</p>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Login