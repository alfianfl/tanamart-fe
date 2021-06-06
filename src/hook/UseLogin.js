import {useState} from 'react'


function UseLogin() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
   
  
    const usernameHandler = (e) => {
      setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
      setPassword(e.target.value)
    }
 
    return [username,password,usernameHandler,passwordHandler]
}

export default UseLogin
