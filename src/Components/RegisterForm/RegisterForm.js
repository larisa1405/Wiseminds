import './RegisterForm.css';
import { useForm } from "react-hook-form";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import react, { useState } from 'react';

const RegisterForm = () => {

    const [isRegist, setIsRegist] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorM, setErrorM] = useState('');
    const [showWindowDimensions, setShowWindowDimensions] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit, 
        formState: { errors},
    } = useForm();

    const onRegisterClick = (data) => {
        if(confirmPassword == data.password) {
            axios.post(`http://localhost:3000/users`, data).then(res =>{
                navigate(`/`)
                setIsRegist(true); 
                setShowWindowDimensions(true);
            }) 
        } else setErrorM("Passwords not match!")

    }

    return(
        <>
        <form className='register' onSubmit={handleSubmit(onRegisterClick)}>
            <input className='inputRegister' type="email" placeholder="Email Address:" {...register("email", {required: true})}/>
            <input className="inputRegister" type="password" name="password" placeholder="Password: " {...register("password", {required: true})}></input>
            <input onChange={(e) => {setConfirmPassword(e.target.value)}} className="inputRegister" type="password" name="password" placeholder="Confirm Password: " required></input> 
            <button className='btn-register'>Register</button>
            <br></br>
            {errorM && <p>{errorM}</p>}
        </form>
        {isRegist && (
             <div className='message'>
                 Register Succed! 
             </div>
         )}
        </>
    )
}

export default RegisterForm;