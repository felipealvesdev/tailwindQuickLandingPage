import { useState, useEffect } from "react";
import {
  Carousel as CarouselShad,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

const Carousel: React.FC = () => {
  const slides = [
    "https://vidacigana.com/wp-content/uploads/2020/11/O-que-fazer-no-Recife-23-praia-de-boa-viagem-aereab-990x518.jpg",
    "https://st4.depositphotos.com/22290170/23873/i/380/depositphotos_238732100-stock-photo-panoramic-view-marco-zero-square.jpg",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl mb-8">
      <div className="relative">
        <CarouselShad className="mx-auto h-[300px] sm:h-[400px] md:h-[500px] w-full bg-gray-700 rounded-lg shadow-lg">
          <CarouselContent
            className="max-h-auto"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} 
          >
            {slides.map((item, i) => (
              <CarouselItem
                key={i}
                className="max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full flex-shrink-0 place-content-center place-items-center"
              >
                <img
                  src={item}
                  alt={`Slide ${i + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselShad>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index
                  ? "bg-blue-400"
                  : "bg-gray-300"
              } transition-all duration-300`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
