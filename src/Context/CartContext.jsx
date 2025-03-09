import axios from "axios";
import { createContext } from "react";

// 1 ==> create a variable

export let CartContext = createContext()

// 2 ==> create a function

export default function CartContextProvider(props) {





    let headers = { token: localStorage.getItem("userToken") }

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((err) => err)

    }
    function updateCartPoductQuantity(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((err) => err)

    }

    function deleteCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((res) => res)
            .catch((err) => err)

    }

    function checkout(cardId, url, formData) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
            { shippingAddress: formData },
            { headers } // Properly passing headers & params
        )
            .then((res) => res)
            .catch((err) => err)
    }

    return <CartContext.Provider value={{ addProductToCart, getLoggedUserCart, updateCartPoductQuantity, deleteCartItem, checkout }}>

        {props.children}
    </CartContext.Provider>
}


