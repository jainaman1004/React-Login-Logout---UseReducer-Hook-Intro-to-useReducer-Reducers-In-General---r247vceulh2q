'use client'
import React, { useReducer } from 'react'

const reducer = (state, action) => {
  switch(action.type){

    case 'setUserName' : return {...state, username: action.payload}
    case 'setPassWord' : return {...state, password: action.payload}
    case 'setIsLogin' : return {...state, isLogin : action.payload}
    case 'setIsValid' : return {...state, isValid : action.payload}
    case 'reset' : return action.payload
    default : return state
  }
}
const loginInfo = {
  username: '',
  password: '',
  isLogin : false,
  isValid : true
}

function Home() {
  const [state, dispatch] = useReducer(reducer, loginInfo)
  
  function handleLogin(e){
    e.preventDefault();
    if(state.username && state.password){
      dispatch({ type:'setIsLogin', payload:true})
    }else{
      dispatch({ type:'setIsValid', payload:false})
    }
  }
  function handleLogut(){
    dispatch({type:'reset', payload : loginInfo})
    // dispatch({type:'setPassWord',payload: ''})
    // dispatch({type:'setUserName', payload : ''})
    // dispatch({type:'setIsLogin', payload : false})
    // dispatch({type:'setIsValid', payload : true})
  }
  return (
    <div id="main">
     {state.isLogin && <section className='logout-section'>
        <h2>Logged in successfully!</h2>
        <p>Welcome {state.username}!</p>
        <button 
          className='logout-btn'
          onClick={handleLogut}  
        >Logout</button>
      </section>}
      {!state.isLogin && <form className='login-form'>
        {!state.isValid && <p className='invalid-error'>Invalid username or password!</p>}
        <section className='username-input'>
          <label>Username: </label>
          <input
            type="text"
            placeholder='Username' 
            className='username'
            value={state.username}
            onChange={(e)=>{
              dispatch({type:'setUserName',payload: e.target.value})
            }}
          />
        </section>
        <section className='password-input'>
          <label>Password: </label>
          <input 
            type="password" 
            placeholder='Password' 
            className='password'
            value={state.password}
            onChange={(e)=>{
              dispatch({type:'setPassWord',payload: e.target.value})
            }}
          />
        </section>
        <button className='login-btn' onClick={handleLogin}>Login</button>
      </form>}
    </div>
  )
}

export default Home
