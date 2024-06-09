import react, { useState , useEffect } from "react";
import './Main.css'
import Book from "../Book/Book";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Main = (book) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchBook = (evt) => {
        if(evt.key === "Enter") {
           navigate(`/search/${search}`)
        }
    }
   
    const getBook = () => {
        axios.get('http://localhost:3000/books')
        .then(res => {
            setBookData(res.data)
            setLoading(false);
            }
        )
        .catch(err => console.log(err))
    }

    if(bookData.length == 0){
        getBook();
    }
    if(loading){
        return <p>Loading</p>
    }

    return(
        <>
            <div className="header">
                <div className="row1">
                    <h1>"Open a book.<br></br>Open a mind."
                    </h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book Here</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Title" 
                            value={search} onChange={e => setSearch(e.target.value)}
                            onKeyPress={searchBook}>
                        </input>
                    </div>
                    <img src="./images/tree.png" alt="pencil-tree"></img>
                </div>
            </div>
            <div className="sales">
                <div>
                    <h2 className="h2-sale">Do Not Miss Our Sales!</h2>
                    <br></br>
                    <img className="img-sale"src="./images/deal.avif"></img>
                    <br></br>
                    <Link to={"/sales"}
                        state = {bookData.filter(book => book.sale > 0)}>
                        <button className="btn-sale">Click Here!</button>
                    </Link>
                </div>
                
            </div>

            <h2 className="popular">The Most Popular:</h2>

                {
                    <>
                        <Book book={bookData.slice(10,15)}/>
                    </>
                }

            <h2 className="latest">The Latest Books:</h2>
                {
                    <>
                        <Book book={bookData.slice(0,5)}/>
                    </>
                }

        </>
    )
}

export default Main;