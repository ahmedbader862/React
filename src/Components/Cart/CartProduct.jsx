import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import Loading from '../Loading'
import Swal from 'sweetalert2'


export default function CartProduct({ product, setCart, cart }) {
    let [productCount, setProductCount] = useState(product.count)
    const [isIncreaseLoading, setIsIncreaseLoading] = useState(false)
    const [isDecreaseLoading, setIsDecreaseLoading] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)


    async function removeCart(productId) {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this product from your cart. This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
        });


        if (result.isConfirmed) {
            setIsRemoving(true);
            try {
                let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                    headers: {
                        token: localStorage.getItem('userToken'),
                    },
                });
                setCart(data);



            } catch (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Failed to remove product',
                    text: 'An error occurred while removing the product. Please try again.',
                    showConfirmButton: false,
                    timer: 3000,
                    position: 'top-end',
                    toast: true,
                    background: '#f0f0f0',
                    iconColor: '#dc3545',
                    timerProgressBar: true,
                });
            } finally {
                setIsRemoving(false);
            }
        }
    }

    async function updateCount(productId, newCount) {
        if (newCount === product.count || newCount < 1) return

        if (newCount > product.count) {
            setIsIncreaseLoading(true)
        } else {
            setIsDecreaseLoading(true)
        }

        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
            setCart(data)
            // setProductCount(product.count)  bygeb al state al 2adema 3shan set cart  async function
        } catch (error) {
            toast.error("Failed to update product quantity.")
        } finally {
            setIsIncreaseLoading(false)
            setIsDecreaseLoading(false)
        }
    }

    useEffect(() => { setProductCount(product.count) }, [cart])

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start relative">
            {isRemoving && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center">
                    <Loading />
                </div>
            )}
            <img src={product?.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product?.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">{product?.price} EGP</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button
                            disabled={product.count === 1 || isDecreaseLoading}
                            onClick={() => updateCount(product.product._id, product.count - 1)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-blue-50"
                        >
                            {isDecreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : '-'}
                        </button>
                        <input
                            onBlur={() => product.count !== productCount && updateCount(product.product._id, productCount)}
                            onChange={(e) => setProductCount(e.target.value)}
                            className="h-8 w-8 bg-white text-center text-xs outline-none"

                            value={productCount}

                        />
                        <button
                            disabled={isIncreaseLoading}
                            onClick={() => updateCount(product.product._id, product.count + 1)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                            {isIncreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : '+'}
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{product?.price * product?.count} EGP</p>
                        <svg
                            onClick={() => removeCart(product.product._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`h-5 w-5 cursor-pointer duration-150 ${isRemoving ? 'text-gray-400' : 'hover:text-red-500'}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}


