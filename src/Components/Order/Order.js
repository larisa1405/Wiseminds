import { useNavigate } from 'react-router-dom';
import './Order.css';
import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useNavbar } from '../Context/NavbarContext';
import axios from 'axios';


const Order = () => {

    const [bookToBuy, setBookToBuy] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [contact, setContact] = useState('');
    const [zip, setZip] = useState('');

    const { changeBasketQuantity } = useNavbar();
  
    const cardNumberChange = (e) => {
        const inputCard = e.target.value;
        const Card = inputCard.replace(/\D/g, '');
        const restrictCard = Card.slice(0, 16);
        setCardNumber(restrictCard);
    };
    
    const cvvChange = (e) => {
        const inputCvv = e.target.value;
        const Cvv = inputCvv.replace(/\D/g, '');
        const restrictCvv = Cvv.slice(0,3)
        setCvv(restrictCvv);
    }

    const expiryChange = (e) => {
        const inputDate = e.target.value;
        const Date = inputDate.replace(/\D/g, '');
        let formatDate = Date
            .slice(0, 4)
            .replace(/(\d{2})(\d{0,2})/, Date.slice(0,2) > 12 ? '12/$2' : '$1/$2');
        console.log(Date.slice(0,2));
        setExpiryDate(formatDate);
    }

    const contactChange = (e) => {
        const inputContact = e.target.value;
        const Contact = inputContact.replace(/\D/g, '');
        const restrictContact = Contact.slice(0, 10);
        setContact(restrictContact);
    }

    const zipChange = (e) => {
        const inputZip = e.target.value;
        const Zip = inputZip.replace(/\D/g, '');
        const restrictZip = Zip.slice(0, 6);
        setZip(restrictZip);
    }

    const removeBook = (index) => {
        const updateCart = [... bookToBuy];
        if ( index >= 0 && index < updateCart.length) {
            changeBasketQuantity("-", updateCart[index].quantity)
            updateCart.splice(index, 1);
            setBookToBuy(updateCart);
            sessionStorage.setItem('bookItems', JSON.stringify(updateCart));
        } else {
            console.log('Invalid index for item removal')
        }
    }

    const calculatePrice = () => {
        console.log(bookToBuy);
        let sum = 0;
        bookToBuy.forEach(b => {
            if(b.sale > 0){
                sum += (b.price - b.price * b.sale / 100) * b.quantity
            }
            else {
                sum += b.price * b.quantity;
            }
        })
        
        return parseFloat(sum.toFixed(2));
    }

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('bookItems')) || [];
        setBookToBuy(storedCart);
    }, []);

    
    const increaseQuantity = (id) => {
        
        const existingItemsString = sessionStorage.getItem('bookItems');
        let existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
    
        let existingBook = existingItems.find(ei => ei.id === id);

        if(existingBook.quantity <= existingBook.stock){
            existingBook.quantity++;  
        }
           
        const updateItemsString = JSON.stringify(existingItems);

        setBookToBuy(existingItems);
        
        sessionStorage.setItem('bookItems', updateItemsString);
        changeBasketQuantity("+", 1);
   };

   const decreaseQuantity = (id) => {
         //aici iau cosul din session storage 
        const existingItemsString = sessionStorage.getItem('bookItems');
        let existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];

        let existingBook = existingItems.find(ei => ei.id === id);

        existingBook.quantity--;
        if(existingBook.quantity == 0) {
            existingItems = existingItems.filter(book => book.id !== id)
        }

        const updateItemsString = JSON.stringify(existingItems);

        setBookToBuy(existingItems);
        sessionStorage.setItem('bookItems', updateItemsString);
        changeBasketQuantity("-", 1);
   };

    const {
        register,
        handleSubmit, 
        formState: { errors},
    } = useForm();

   const navigate = useNavigate();

   const toThankYouPage = (data) => {

        let order = data;
        order.books = bookToBuy;

        axios.post("http://localhost:3000/orders", {order}).then(() => {
            bookToBuy.forEach(book => {
                book.stock = book.stock - book.quantity;
                delete book.quantity;
    
                console.log(book);
    
                axios.put(`http://localhost:3000/books/${book.id}`, book)
            })
        });

        sessionStorage.clear();


        navigate('/thankyou');
   }
   
    return (
        <>
        <h1 className='center'>Order Form</h1>
        <div className='container-order'>
            <div className='row'>
                    <h2>Your Books:</h2>
                    <br></br>
                    {bookToBuy.map((book, index) => (
                        <div className='booksToBuy'>
                            <img className="imgBuy" src={book.imageName}></img>
                            <h1>{book.title}</h1>
                            <h3 className={book.sale > 0 ? 'amount-cut' : ''}>{book.price} RON</h3>
                                {book.sale > 0 && <p className="sale-amount">{book.price - (book.price * (book.sale/100))} RON</p>}
                            
                            <p>Quantity: {book.quantity} 
                                <button className='btn1' onClick={() => increaseQuantity(book.id)}>+</button>
                                <button className='btn2'onClick={() => decreaseQuantity(book.id)}>-</button>
                            </p>
                            <br></br> 
                            <button className="remove" onClick={() => removeBook(index)}>Remove</button>
                        </div>
                    ))}
                    <br></br>
                    <br></br>
            </div>
            <div className='row'>
                <form onSubmit={handleSubmit(toThankYouPage)}>
                <h2>Contact Information:</h2>
                <br></br>
                    <div className='name'>
                        <input className='input' type="text" placeholder='Name:' {...register("Name", {required: true})} required/>
                        <input className="input" type="text" placeholder='Surname:' {...register("Surname", {required: true})}/>
                        <input className='input' type="text" placeholder="Contact Number:" {...register("Contact", {required: true})} value={contact} onChange={contactChange} required/>
                        <input className='input' type="email" placeholder="Email Address:" {...register("Email Adress", {required: true})}/>
                    </div>
                    <h2>Shipping Adress:</h2>
                    <br></br>
                    <div className='adress'>
                        <input className='input' type="text" placeholder="Street:" {...register("Street", {required: true})} />
                        <input className='input' type="text" placeholder="ZIP Code:" {...register("ZipCode", {required: true})} value={zip} onChange={zipChange} required />
                        <input className='input' type="text" placeholder="City:" {...register("City", {required: true})} />
                    </div>
                    <h2>Payment Method</h2>
                    <br></br>
                    <div className='payment'>
                        <select onChange={(e) => {setDeliveryMethod(e.target.value)}} className='input' required>
                            <option selected disabled>Select Delivery Method</option>
                            <option value ="courier">Courier</option>
                            <option value ="easybox">Easybox</option>
                        </select>
                        <select className='input' onChange={(e) => {setPaymentMethod(e.target.value)}} required >
                            <option selected disabled value="">Select Payment Method</option>
                            <option disabled={deliveryMethod === 'easybox'} value="cash">Cash</option>
                            <option value="credit-card">Credit-Card</option>
                        </select>
                        {paymentMethod === "credit-card" && (
                            <div className='credit-card'>
                                <input className="card-input" type="text" placeholder='CARD NUMBER' value={cardNumber} onChange={cardNumberChange} maxLength="16"></input>
                                <input className="card-input" type="text" placeholder='MM/YY' value={expiryDate} onChange={expiryChange} maxLength="5"></input>
                                <input className="card-input" type="text" placeholder='CVV' value={cvv} onChange={cvvChange} maxLength="3"></input>
                            </div>
                        )}
                     </div>
                     <br></br>
                     <textarea className="notes"placeholder="Notes to the Order" {...register("Notes", {required: false})}></textarea>
                     <br></br>
                     <button className='placeorder'>Place Order</button>
                </form>
                <p className='total'>Your total is: {calculatePrice()} RON</p>

                  
            </div>
        </div>


          
        </>
    )
}

export default Order;