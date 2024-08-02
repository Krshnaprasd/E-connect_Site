import { useState } from 'react'
import Log from '../src/assets/Login.avif'
import { useNavigate } from "react-router-dom"


// import { useHistory } from 'react-router-dom';



const Login = () => {

    // const history = useHistory();



    const navigate = useNavigate();

    const [User, setUserData] = useState({
        name: '',
        password: '',
        check: ''
    })

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserData({ ...User, [name]: value })
        console.log(name, value);


    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {


            name: User.name,
            check: User.check,
            password: User.password,


        }
        fetch("http://localhost:6060/user/check", {
            method: "POST",
            headers: {
                'Authorization': '3E39A633F6F14471853E43009C458D30',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data != null) {
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("id", data.userid);
                    localStorage.setItem("isLoggedIn", "true");
                    navigate('/land');
                }
                else {
                    console.log("failed to fetch");
                }
            })

    }

    return (
        <>
            <div className="container-fluid pt-5 pb-5" style={{ height: "3em" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className='img-fluid' src={Log}></img>
                        </div>
                        <div className="col-md-6 align-content-center">
                            <div className="row justify-content-center">
                                <form className="card logcard  p-5 text-white " style={{width:"20em"}} onSubmit={handleSubmit}>
                        <h1 className="txt fs-2 fw-bold text-center">E-connect</h1><br></br>
                        <label className="fnt text-white-50">Name:</label>
                        <input type="text" name="name" placeholder="Name" value={User.value} onChange={handleChange}></input><br></br>
                       
                        <label className="fnt text-white-50">Password:</label>
                        <input type="password" name="password" placeholder="Password" value={User.value} onChange={handleChange}></input>
                        <div className="small text-white-50 text-end mt-2"><span>Forgot password !</span></div><br></br>
                        <div>
                        <input value={User.value} className="form-check-input" name="check" type="checkbox" role="switch" onChange={handleChange}></input>&nbsp;&nbsp;<label className="txt" htmlFor="flexSwitchCheckChecked">Remember me</label><br></br><br></br>
                        
                        </div>
                        <button  className="text-white fs-5 border-0 p-1 rounded-2 bg-primary " >Submit</button>
                        </form>
                               
                                    </div>
                                   
                               
                            </div>

                        </div>

                    </div>
                </div>
            
        </>
    )
}

export default Login;

