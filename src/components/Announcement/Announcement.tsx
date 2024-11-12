import {
  Carousel as CarouselShad,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import React from 'react'

const Carousel: React.FC = () => {
  const slides = [
      'https://vidacigana.com/wp-content/uploads/2020/11/O-que-fazer-no-Recife-23-praia-de-boa-viagem-aereab-990x518.jpg',
      'https://st4.depositphotos.com/22290170/23873/i/380/depositphotos_238732100-stock-photo-panoramic-view-marco-zero-square.jpg',
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  ]

  return (
      <div className="mx-auto w-full">
          <CarouselShad className="mx-auto h-[500px] w-1/2 bg-gray-700">
              <CarouselContent className="max-h-auto">
                  {slides.map((item, i) => {
                      return (
                          <CarouselItem
                              key={i}
                              className="max-h-[500px] w-full place-content-center place-items-center"
                          >
                              <img src={item} alt="" className="h-full" />
                          </CarouselItem>
                      )
                  })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </CarouselShad>
      </div>
  )
}

// Exportação do componente Announcement
function About() {
  return (
      <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              <div className="flex justify-center">
                  <Carousel />
              </div>
              <div className="mt-8 lg:py-24">
                  <h2 className="text-center text-3xl font-bold sm:text-4xl">
                      Tenha uma estação de monitoramento!
                  </h2>
                  <p className="mt-4 text-center text-gray-600">
                      Na softex desenvolvemos uma estação de monitoramento
                      meteorológico que você pode ter em seu local de
                      trabalho. Venha conhecer nosso projeto melhor e seja um
                      parceiro.
                  </p>
                  <div className="flex justify-center">
                      <a
                          href="#"
                          className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                          Conhecer o projeto.
                      </a>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default About