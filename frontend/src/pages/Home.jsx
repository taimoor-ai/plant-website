
import { useState, useEffect } from "react"
import { ArrowRight, Leaf, ShoppingBag } from "lucide-react"
import FeaturedProducts from "../components/FeaturedProducts"
import History from "./History"
import Carouser from "./Carouser"
import Cart from "../components/Cart"

export default function Home() {
 

  return (
    <>
      <Carouser/>
      <History />
      <FeaturedProducts/>
      {/* <Cart/> */}
    </>
  )
}
