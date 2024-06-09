import './Admin.css'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavbar } from '../Context/NavbarContext';

const Admin = () => {

    const [book, setBook]=useState();
    const [params, setParams]=useState(useParams().id);
    const [files, setFiles] = useState([]);
    const ctxProviderRef = useRef(null);
    const [isBookCreated, setIsBookCreated] = useState(false);
    const [showWindowDimensions, setShowWindowDimensions] = useState(false);
    const {loginState} = useNavbar();

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        console.log(ctxProvider);
        if (!ctxProvider) return;
    
        const handleChangeEvent = (event) => {
          setFiles([...event.detail.allEntries.filter((file) => file.status === 'success')]);
        };
    
        ctxProvider.addEventListener('change', handleChangeEvent);
        console.log(files);
    
        return () => {
          ctxProvider.removeEventListener('change', handleChangeEvent);
        };

      }, [setFiles]);
    
    const {
        register,
        handleSubmit, 
        formState: { errors},
    } = useForm();

    const getBook = () => {
        axios.get(`http://localhost:3000/books/${params}`).then (res => {
            setBook(res.data);
        }) 
    }
    
    if(params && !book){
        getBook();
    }

    const createEditBook = (data) => {
        let newBook = data;
        if(files[0]){
            newBook.imageName = files[0].cdnUrl;
        }
        else{
            newBook.imageName = book.imageName;
        }
        if(params){
            axios.put(`http://localhost:3000/books/${params}`, data)
        } else {
            axios.post("http://localhost:3000/books", data);
        }
        setIsBookCreated(true); 
        setShowWindowDimensions(true);
    }

    return(
        <>
        <lr-upload-ctx-provider
          ctx-name="my-uploader"
          ref={ctxProviderRef}
        />
        {loginState == 'admin' ?
            (<form className='admin' onSubmit={handleSubmit(createEditBook)}>
                {(book || !params) && (
                    <div>
                    <div>
                        <label className='label'>Title: </label>
                        <input className='input-admin' type = "text" name = "title" {...register("title", {value: book ? book.title : ""}, {required: true})} ></input>
                    </div>
                    <div>
                        <label className='label'>Author: </label>
                        <input className='input-admin' type = "text" name = "author" {...register("author", {value: book ? book.author : ""}, {required: true})}></input>
                    </div>
                    <div>
                        <label className='label'>Year: </label>
                        <input className='input-admin'  type = "number" name = "year" {...register("year", {value: book ? book.year : ""}, {required: true})}></input>
                    </div>
                    <div>
                        <label className='label'>Pages: </label>
                        <input className='input-admin'  type = "number" name = "pages" {...register("pages", {value: book ? book.pages : ""}, {required: true})}></input>
                    </div><div>
                        <label className='label'>Price: </label>
                        <input className='input-admin' type = "number" name = "price" {...register("price", {value: book ? book.price : ""}, {required: true})}></input>
                    </div>
                    <div>
                        <label className='label'>Sale: </label>
                        <input className='input-admin' type = "number" name = "sale" {...register("sale", {value: book ? book.sale : ""}, {required: true})}></input>
                    </div>
                    <div>
                        <label className='label'>Description: </label>
                        <textarea className='input-admin' name = "description" {...register("description", {value: book ? book.description : ""}, {required: true})}></textarea>
                    </div>
                    <div>
                        <label className='label'>Genre: </label>
                        <select className='select-admin'  {...register("genre", {value: book ? book.genre : ""}, {required: true})}>
                                <option>ROMANCE</option>
                                <option>HISTORY</option>
                                <option>ACTION AND ADVENTURE</option>
                                <option>FICTION</option>
                                <option>NATURE</option>
                                <option>MISTERY & HORROR</option>
                                <option>SF</option>
                            </select>
                    </div>
                    <div>
                        <label className='label'>Stock: </label>
                        <input className='input-admin' type = "number" name = "stock" {...register("stock", {value: book ? book.stock : ""}, {required: true})}></input>
                    </div>

                    <lr-file-uploader-regular
                      css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
                      ctx-name="my-uploader"
                      class="my-config"
                    />
                    
                    <br></br>
                    <button className='btn-admin'>
                        {params ? "Edit Book" : "Create Book"}
                    </button>
                    </div>
                    )
                }
                </form>) : (<div>Login as admin to access this page</div>)
            }
             {isBookCreated && (
                    <div className='message'>
                        Book Succesfully Created! 
                    </div>
            )}
        </>
    )
}

export default Admin;