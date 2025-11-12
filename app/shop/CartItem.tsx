"use client"
import CartProduct from '@/components/productCard/CartProduct'
import React, { useEffect, useState } from 'react'

function CartItem() {
    const [data , setData] = useState([])
    useEffect(()=>{
       async function loading(){
         const res =await fetch("/api/shop",{cache:'no-store'})
        const data =await res.json()
        const cart = data[0].cart
        setData(cart )
       }
       loading()
    },[])
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
       {
            data.map((item:any)=>(
                <li key={item._id}>
                    <CartProduct {...item} />
                </li>
            ))
       }
    </ul>
  )
}

export default CartItem