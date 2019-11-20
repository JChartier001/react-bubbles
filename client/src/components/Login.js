import React, {useState} from "react";
import axios from "axios"

const Login = (props) => {
  console.log(props)
  const [error, setError] = useState();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value,
    })
}

const handleSubmit = e => {
    e.preventDefault();
    axios
        .post("http://localhost:5000/api/login", data)
        .then(response => {   
          console.log(response)                     
            localStorage.setItem('token', response.data.payload)
            props.history.push('/bubble-page')
        })
    .catch(err => {
      setError(err.response.data.message)
    })
}

  return (
    <form onSubmit={handleSubmit}>
    <div className="login">
        <h2>Please Login</h2>
    {error && <div className="error">{error}</div>}
    <input type="text" name='username' placeholder="User Name" value={data.username} onChange={handleChange}/>
    <input type='password' name='password' placeholder='password' value={data.password} onChange={handleChange}/>
    <button className="button" type="submit">Sign In</button>
    </div>
</form>

  );
};

export default Login;
