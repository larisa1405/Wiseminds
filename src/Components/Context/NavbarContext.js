// BasketContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const [basketQuantity, setBasketQuantity] = useState([]);
  const [loginState, setLoginState] = useState();

  const changeBasketQuantity = (string, quantity) => {
    switch(string){
      case '-':
        setBasketQuantity(q => q-quantity);
        break;
      case '+':
        setBasketQuantity(q => q+quantity);
    }
  }

  const changeLoginState = () => {
    const userJSON = sessionStorage.getItem('user');
    const user = JSON.parse(userJSON);
    let state = '';

    if(user){
      state = user.isUserAdmin ? 'admin' : 'customer'
    }
    
    setLoginState(state);
  }

  useEffect(() => {
    const basketJSON = sessionStorage.getItem('bookItems');
    const basket = basketJSON ? JSON.parse(basketJSON) : [];
    let quantity = 0;

    if(basket.length > 0){
      basket.forEach(b => {
        quantity += b.quantity
      })
    }
    setBasketQuantity(quantity);

    changeLoginState();
  }, [])

  // if(basket.length == 0){
  //   const basket = sessionStorage.getItem('bookItems');
  //   setBasket(basket ? JSON.parse(basket) : []);
  // }

  return (
    <NavbarContext.Provider value={{ basketQuantity, loginState, changeBasketQuantity, changeLoginState }}>
      {children}
    </NavbarContext.Provider>
  );
};
