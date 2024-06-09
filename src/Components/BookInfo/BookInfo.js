import react, { useEffect, useState } from 'react';
import './BookInfo.css';
import axios from 'axios';
import { useNavbar } from '../Context/NavbarContext'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BookInfo = () => {
    
    const [item, setItem] = useState();
    const [bookId, setBookId] = useState(useParams().id)
    const [isBookAdded, setIsBookAdded] = useState(false);
    const [showWindowDimensions, setShowWindowDimensions] = useState(false);

    const { changeBasketQuantity } = useNavbar();

    const navigate = useNavigate();
    const navigateToAdmin = () => {
        navigate(`/admin/${item.id}`)
    }

    useEffect(() => {
        if(!item){
            getBook();
        }
    })

    const getBook = () => {
        axios.get(`http://localhost:3000/books/${bookId}`).then(res => {
            setItem(res.data);
        })
    }

    const addToBasket = () => {
        const existingItemsString = sessionStorage.getItem('bookItems');
        let existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];

        let existingBook = existingItems.find(ei => ei.id === item.id);

        if(existingBook && item.stock > 0){
            existingBook.quantity++;
            item.stock--;
            console.log(item)
        }
        else{
            item.quantity = 1;
            item.stock--;
            existingItems = [...existingItems, item];
        }
        setIsBookAdded(true); 
        setShowWindowDimensions(true);

        const updateItemsString = JSON.stringify(existingItems);
        
        sessionStorage.setItem('bookItems', updateItemsString);

        setItem({ ...item }); 

        changeBasketQuantity("+", 1);
    }

    const getUserRole = () => {
        const existingUserString = sessionStorage.getItem('user');
        const existedUsers = existingUserString ? JSON.parse(existingUserString) : [];
        if (existedUsers) {
            console.log(existedUsers);
            return existedUsers.isUserAdmin
        }

        return false;
    }

    const deleteBook = () => {
        axios.delete(`http://localhost:3000/books/${bookId}`).then(
            navigate("/")
        )
           
       
    }

    return(
        <>
        {item &&
            <div>
                <div className='display'>
                    <div>
                        <img className="img"src={item.imageName}></img>
                        <div className='info'>
                            <h1>{item.title}</h1>
                            <h3>{item.author}, {item.year}, {item.pages} pages</h3>
                            <br></br>
                            <p className='description'>{item.description}</p>
                            <br></br>
                                {(item.stock > 0) ? "There are some products left" : "Too litle too late!"}
                            <br></br>
                            <br></br>
                            <div>
                                {item.stock > 0 ? (
                                    <div onClick={addToBasket}  className="buy">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16" title="Add to Basket">
                                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                                        </svg>
                                     </div>
                                 ) : (
                                     <div className="buy disabled">
                                        Out of Stock!
                                    </div>
                                )}
                             {isBookAdded && (
                                 <div className='message'>
                                     The Book has been added to the basket! 
                                 </div>
                             )}
                            </div>
                            <div>
                                {getUserRole() && <button className='edit' onClick={navigateToAdmin}>Edit Here!</button>}
                            </div>
                            <div>
                                {getUserRole() &&<button className='btn-admin' onClick={deleteBook} >Delete Book</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )

}

export default BookInfo;