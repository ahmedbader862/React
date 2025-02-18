import axios from 'axios'
import React, { useEffect, useState } from 'react'

import CartProduct from './CartProduct'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Loading from '../Loading'
import { useSelector } from 'react-redux'



export default function Cart() {
  const curentLange = useSelector((state) => state.lange.lange);

  const text = useSelector((state) => state.lange[curentLange]);

  let [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(false)





  async function getUserCart() {
    setIsLoading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers: {

        token: localStorage.getItem('userToken')
      }
    }).finally(() => {
      setIsLoading(false)
    })



    setCart(data)




  }


  async function deleteUserCart() {
    setIsLoading(true)
    await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers: {

        token: localStorage.getItem('userToken')
      }
    }).finally(() => {
      setIsLoading(false)
      setCart(null)
    })






  }



  useEffect(() => {
    getUserCart()
  }, [])

  if (isLoading) {
    return <Loading></Loading>
  }



  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cart ? <div className='mt-24' >
        <h1 className="mb-10 text-center text-2xl  font-bold">{text.CartItems} {cart.numOfCartItems}</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">

            {cart?.data.products.map((product, index) => {
              return <CartProduct index={index} product={product} setCart={setCart} cart={cart} ></CartProduct>
            })}
            {cart?.data.products.length == 0 && deleteUserCart()}

          </div>


          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">{text.Subtotal}</p>
              <p className="text-gray-700">{cart?.data.totalCartPrice} EGP</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">{text.Shipping}</p>
              <p className="text-gray-700">0 EGP</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">{text.Total}</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{cart?.data.totalCartPrice} EGP</p>
                <p className="text-sm my-3 text-gray-700">including VAT</p>
              </div>
            </div>
            <div className="cursor-pointer text-black mt-5 pr-30 pl-30 hover:text-white border border-black hover:bg-black transition-[0.2] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">{text.Checkout}</div>
          </div>
        </div>
        <button onClick={deleteUserCart} className=' cursor-pointer text-red-500 border-2 m-auto border-red-500 block ms-auto py-2 px-4 mb-8 mt-4'> {text.Clearcart}</button>

      </div> : <h1 className='text-black mt-28 text-center font-bold'>{text.Noproductsinyourcart}</h1>}</>




  )
}
