import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { useNavbar } from '../Context/NavbarContext';

const LogIn = () => {
    const [errorM, setErrorM] = useState('');
    const { changeLoginState } = useNavbar();

    const {
        register,
        handleSubmit, 
        formState: { errors},
    } = useForm();
    

    const navigate = useNavigate();

    const navigateToAdmin = (data) => {
        axios.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`).then(res =>{
            if(res.data[0]){
                sessionStorage.setItem("user", JSON.stringify(res.data[0]));
                changeLoginState();
                navigate("/");
            }
            else{
               setErrorM("Invalid Email or Password! Please try again!")
            }
        }) 
    }


    return (
        <>
            <form className='logIn' onSubmit={handleSubmit(navigateToAdmin)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <input className='inputLogIn' type="email" placeholder="Email Address:" {...register("email", {required: true})}/>
                <input className="inputLogIn" type="password" name="password" placeholder="Password: " {...register("password", {required: true})}></input>
                <br></br>
                <button className='btn-logIn'>Log In</button>
                {errorM && <p>{errorM}</p>}
            </form>
        </>
    )
}

export default LogIn;