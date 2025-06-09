import React from 'react'
import { useEffect, useState } from 'react'
import { Leaf, ShoppingBag, ArrowRight } from 'lucide-react'
const images = [
    {
      src: "https://lukani-demo.myshopify.com/cdn/shop/files/slider6.jpg?v=1613791747",
      caption: "Grow Green at Home",
      title: "OUTDOOR",
      title2: "THE BEST CHOICE",
      message: "Discount 20% for Plantify Members"
    },
    {
      src: "https://lukani-demo.myshopify.com/cdn/shop/files/slider7.jpg?v=1614290583",
      caption: "Nature in Every Corner",
      title: "MAKES",
      title2: "HOME PARADISE",
      message: "Discount 20% for Plantify Members",
    },
    {
      src: "https://lukani-demo.myshopify.com/cdn/shop/files/slider5.jpg?v=1613791724",
      caption: "Breathe with Plants",
      title: "PLANTIFY",
      title2: "HOUSEPlANTS",
  
      message: "Discount 20% for Plantify Members",
    },
    {
      src: "https://lukani-demo.myshopify.com/cdn/shop/files/slider4.jpg?v=1613791723",
      caption: "Nature in Every Corner",
      title: "CACTUS",
      title2: "DECORATION",
      message: "Discount 20% Off for Plantify Members",
    },
  ]
export default function Carouser() {
    const [current, setCurrent] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
  
    // Auto-slide every 7 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length)
      }, 9000)
      return () => clearInterval(interval)
    }, [])
  
    useEffect(() => {
      setIsLoaded(true)
    }, [])
  
    const goToSlide = (index) => {
      setCurrent(index)
    }
  
    const nextSlide = () => {
      setCurrent((prev) => (prev + 1) % images.length)
    }
  
    const prevSlide = () => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length)
    }
  return (
    <>
     <section className="relative h-screen w-full overflow-hidden">
        {/* Slides container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <img src={item.src || "/placeholder.svg"} alt={item.caption} className="h-full w-full object-cover" />

              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-opacity-30"></div>

              {/* Content positioned on the left */}
              <div className={`absolute my-10 inset-0 flex  pt-10 items-center z-10 ${index === current ? "animate-slideIn" : ""}`}>
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                  <div className="max-w-2xl">
                    {/* Animated leaf icon */}
                    {/* <div className={`mb-4 ${index === current ? "animate-leafGrow" : "opacity-0"}`}>
                      <Leaf className="text-green-400 w-12 h-12 animate-sway" />
                    </div> */}

                    <h3 className='text-black mt-5 text-10 font-bold  border-l-3 px-1.5 border-black mb-4 leading-tight'>Amazing <br></br> from Plantify</h3>

                    {/* Main title */}
                    <h1
                      className={`text-black text-2xl md:text-6xl lg:text-5xl   leading-tight ${index === current ? "animate-fadeInUp delay-400" : "opacity-0"}`}
                    >
                      {item.title}
                    </h1>
                    <h1
                      className={`text-black text-4xl md:text-6xl lg:text-5xl font-bold mb-4 leading-tight ${index === current ? "animate-fadeInUp delay-400" : "opacity-0"}`}
                    >
                      {item.title2}
                    </h1>
                    {/* Subtitle */}
                    <p
                      className={`text-black text-lg md:text-xl font-medium mb-2 ${index === current ? "animate-fadeInUp delay-200" : "opacity-0"}`}
                    >
                      {item.message}
                    </p>

                    

                    {/* CTA Button */}
                    <div className={`${index === current ? "animate-fadeInUp delay-800"  : "opacity-0"} mt-10`}>
                      <button className="group bg-gradient-to-r bg-black  hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5" />
                            Discover More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black text-2xl z-20 bg-opacity-30 hover:bg-opacity-60 rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 text-black text-2xl z-20  bg-opacity-30 hover:bg-opacity-60 rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Next Slide"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-lime-600 scale-125 shadow-lg" : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Progress bar
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30 z-20">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-out"
            style={{ width: `${((current + 1) / images.length) * 100}%` }}
          ></div>
        </div> */}

      </section>
       {/* Custom Animations */}
       <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes leafGrow {
          from {
            opacity: 0;
            transform: scale(0) rotate(-45deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }

        .animate-leafGrow {
          animation: leafGrow 1s ease-out forwards;
        }

        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
      </>
  )
}
