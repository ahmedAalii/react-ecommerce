import axios from "axios";
import { createContext } from "react";



// 1 ==> create a variable

export let WishlistContext = createContext()


// 2 ==> create a function


export default function WihlistsContextProvider(props) {

    let headers = { token: localStorage.getItem("userToken") }


    function addProductToWihlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }


    function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function deleteWishlistItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((res) => res)
            .catch((err) => err)

    }

    return <WishlistContext.Provider value={{ addProductToWihlist, getLoggedUserWishlist, deleteWishlistItem }}>
        {props.children}
    </WishlistContext.Provider>
}