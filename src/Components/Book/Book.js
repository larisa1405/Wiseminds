import React, { useEffect, useState } from "react";
import './Book.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Book = ({book}) => {
    const [books, setBooks] = useState([]);
    let searchParam = useParams().search;
    let genreParam = useParams().genre;

    const location = useLocation();
    const navigate = useNavigate();

    const navigateToBookInfo = (id) => {
        navigate(`/bookinfo/${id}`);
    }
    
    useEffect(() => {
        getBookList();
    }, [genreParam])

    const getBookList = () => {
        console.log(searchParam);
        if(book){
            setBooks(book);
        }
        else if(location.state){
            setBooks(location.state);
        }
        else if(searchParam){
            let searchBooks = [];
            axios.get('http://localhost:3000/books').then(res => {
                searchBooks = res.data.filter(b => b.title.toLowerCase().includes(searchParam.toLowerCase()));
                setBooks(searchBooks);
            })
        }
        else if(genreParam) {
            axios.get(`http://localhost:3000/books?genre=${genreParam}`).then(res => {
                setBooks(res.data);
            })
        }
    }

    return(
        <div className="container">
            {
                books && books.length > 0 ? (
                    books.map((item) =>{
                        return(
                            <div className="book"  key={item.id} onClick={() => navigateToBookInfo(item.id)}>
                                <img src={item.imageName} alt="Book Cover"></img>
                                <div className="bottom">
                                    <h3 className="title">{item.title}</h3>                               
                                    <p className={item.sale > 0 ? 'amount-cut' : ''}>{item.price} RON</p>
                                    {item.sale > 0 && <p className="sale-amount">{item.price - (item.price * (item.sale/100))} RON</p>}
                                </div>
                            </div>
                    )               
                })
                ) : (<p className="no-book">No Books Found!</p>)

            }
        </div>
    )
}

export default Book;