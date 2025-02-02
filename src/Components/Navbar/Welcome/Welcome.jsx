import React, { useEffect } from 'react'
import welcomeImg from '../../../assets/Imges/Payment Information-amico.png'
import AOS from "aos";
import "aos/dist/aos.css";



export default function () {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true, // Whether animation should happen only once
        });
      }, []);
  return (
    <>
    <div data-aos="fade-down" className="container m-5 flex flex-row justify-around items-center">
        <div className="img-holder">
            <img className='w-170' src={welcomeImg} />
        </div>
        <div className="text-holder text-center">
            <h2 className='text-5xl font-bold'>Welcome to our Site</h2>
            <p className='mt-4 text-gray-700'> Enjoy your shopping in an easy and interesting way </p>
        </div>
    </div>
    </>

  )
}
