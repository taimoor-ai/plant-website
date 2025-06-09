import React from 'react'
import signature from "../assets/signature.png"
export default function History() {
  return (
    <div className="container   mx-auto px-10 pt-12">
    <div className="flex flex-col  md:flex-row items-center  justify-between gap-8">
      {/* Right Side - Image */}
      <div className="md:w-1/2 flex  justify-center">
        <img
          src="//lukani-demo.myshopify.com/cdn/shop/files/img-top-vogue3_5986e97b-c157-496e-868a-7d758d8e1399_325x438.png?v=1614290751"
          alt="Lukani History"
          className="rounded-lg  max-w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 space-y-6">
        <div>
          <h2 className="plantify-header-welcome">Welcome to Plantify Store</h2>
          <h1 className="plantify-header-history">Plantify History</h1>
          <p className="text-gray-600 leading-relaxed">
          Plantify is a modern plant store born out of a love for nature and sustainable living, offering a curated selection of indoor and outdoor plants, stylish planters, and plant care essentials. Founded in 2020 by a group of passionate plant lovers, Plantify has grown from a small local nursery into a trusted brand known for quality greenery, expert advice, and eco-friendly practices. With a mission to bring the calming beauty of plants into every home, we aim to make plant care simple, joyful, and accessible for everyone — from beginners to seasoned gardeners.
          </p>
        </div>
  
        <div className="flex items-center gap-4">
          <img
            src={signature}
            alt="Signature"
            className="h-10"
          />
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Taimoor Arshad</span> – CEO Plantify
          </p>
        </div>
      </div>
    </div>
    <div className='border-b-1 border-black mt-20'></div>
  </div>
  )
}
