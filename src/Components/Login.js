import React, { useState, useRef } from 'react'
import "./Style/Login.css"
import logo from "./Img/logo.png"

const Login = () => {
    const [loginStyle, setLoginStyle] = useState([])
    const [loginState, setLoginState] = useState(false)

    const loginPortion = useRef()
    const regPortion = useRef()

    const handleOnChangeState =async ()=>{
        console.log("clicked ", loginState)
        if(!loginState){
            loginPortion.current.style.transform = "translate(-216px)"
            regPortion.current.style.transform = "translate(-100px)"
            await setLoginState(true)
            
        }
        else{
            loginPortion.current.style.transform = "translate(100px)"
            regPortion.current.style.transform = "translate(228px)"
            await setLoginState(false)

        }
    }


    return (
        <div className='loginPage'>
            <div className="LoginCard">
                <div className="loginAlign" ref = {loginPortion}>
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
                    <div className="userInput loginInsiderDiv"><input type="text" placeholder='Email address or username' /></div>
                    <div className="loginContinue loginInsiderDiv"><button>Continue</button></div>
                    <div className="TowardsRegister loginInsiderDiv">
                        <p className='towardsRegPText'>Don't Have an account</p>
                        <p onClick={handleOnChangeState} className='towardsRegPTextClick' style={{color:" rgb(239, 144, 0)"}}>Create Account</p>
                    </div>

                </div>


                <div className="RegAlign" ref = {regPortion}>
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
                    <div className="userInput loginInsiderDiv"><input type="text" placeholder='Email address or username' /></div>
                    <div className="userInput loginInsiderDiv"><input type="text" placeholder='Password' /></div>
                    <div className="loginContinue loginInsiderDiv"><button>Continue</button></div>
                    <div className="TowardsRegister loginInsiderDiv">
                        <p className='towardsRegPText'>Already Have Account</p>
                        <p onClick={handleOnChangeState} className='towardsRegPTextClick' style={{color:" rgb(239, 144, 0)"}}>Login</p>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Login