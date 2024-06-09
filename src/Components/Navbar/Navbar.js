import './Navbar.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavbar } from '../Context/NavbarContext';

const Navbar=() => {
    const navigate = useNavigate();
    const {basketQuantity} = useNavbar();
    const {loginState} = useNavbar();

    const getAllBooks = (books) =>{
        axios.get(`http://localhost:3000/books`)
        .then(res => {
            const books = res.data;
            navigate('/allbooks', {state : books})
        })
    }

    const getBooksByGenre = (genre) => {
        navigate(`/genre/${genre}`);
    }


    const logOut = () => {
        sessionStorage.removeItem("user");
    }

    return(
        <>
            <div className="navbar">
                    <div className='title1'>
                        <p >Wise Minds</p>
                    </div>
                    <div className='flex'>
                        {loginState == '' &&<a className='link' href="/register">Register</a>}
                        {loginState == '' && <a className='link' href="/login">Log In</a>}
                        {loginState !== '' && <a className='link' href="/" onClick={() => logOut()}>Log Out</a>}
                        {loginState == 'admin' && <a className='link' href="/admin">Admin</a>}
                        <a className="link" href="/">Home</a>
                        <a className="link" href="/aboutus">About Us</a>
                        <a className="link" href="/contact">Contact</a>
                        <div>
                            <a className="link" href="/order">
                                <svg className='shoppingbasket' xmlns="http://www.w3.org/2000/svg"width="20"height="18"fill="currentColor"class="bi bi-basket3"viewBox="0 0 16 16">
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z"/>
                                </svg>
                            </a>
                        </div>
                        <p class="stock-overlay">{basketQuantity}</p>
                        <div className="dropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <div className="dropdown-content">
                                <a onClick={() => getBooksByGenre("ROMANCE")}>ROMANCE</a>
                                <a onClick={() => getBooksByGenre("HISTORY")}>HISTORY</a>
                                <a onClick={() => getBooksByGenre("ACTION AND ADVENTURE")}>ACTION & ADVENTURE</a>
                                <a onClick={() => getBooksByGenre("FICTION")}>FICTION</a>
                                <a onClick={() => getBooksByGenre("NATURE")}>NATURE</a>
                                <a onClick={() => getBooksByGenre("MISTERY")}>MISTERY & HORROR</a>
                                <a onClick={() => getBooksByGenre("SF")}>SF</a>
                                <a onClick={() => getAllBooks()}>ALL BOOKS</a>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Navbar;