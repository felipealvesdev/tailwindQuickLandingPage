import { Carousel as CarouselShad, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Separator } from "@/components/ui/separator"
import React from 'react'

const Carousel: React.FC = () => {
    const slides = [
        'https://vidacigana.com/wp-content/uploads/2020/11/O-que-fazer-no-Recife-23-praia-de-boa-viagem-aereab-990x518.jpg',
        'https://st4.depositphotos.com/22290170/23873/i/380/depositphotos_238732100-stock-photo-panoramic-view-marco-zero-square.jpg',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    ]

    return (
        <div className="mx-auto w-full max-w-4xl mb-8"> {/* Contêiner do Carousel ajustado */}
            <CarouselShad className="mx-auto h-[500px] w-full bg-gray-700 rounded-lg shadow-lg">
                <CarouselContent className="max-h-auto">
                    {slides.map((item, i) => {
                        return (
                            <CarouselItem
                                key={i}
                                className="max-h-[500px] w-full place-content-center place-items-center"
                            >
                                <img src={item} alt="" className="h-full rounded-lg" />
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

const links = [
    { name: 'Nossos Projetos', href: '#' },
    { name: 'Como participar', href: '#' },
    { name: 'Artigos', href: '#' },
]

function About() {
    return (
        <section className="flex flex-col items-center py-8 bg-gray-50">
            <Carousel /> 
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 border-2"> 
                <div className="text-center mb-6">
                    <h4 className="text-xl font-semibold text-gray-800">SOFTEXLABS</h4>
                </div>

                <div className="flex justify-around text-lg font-medium text-gray-700"> {/* Links centralizados */}
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`cursor-pointer ${link.name === 'Artigos' ? 'text-blue-500' : ''}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <Separator className="my-6 h-px bg-gray-200" /> {/* Separador horizontal menor */}

                <div className="flex items-start space-x-4">
                    {/* Imagem de exemplo */}
                    <div className="w-1/3 p-2 bg-blue-100 rounded-lg">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Exemplo de Artigo"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Texto do artigo */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Artigos</h3>
                        <p className="text-gray-600 mb-4">
                            Lorem ipsum dolor sit amet consectetur. Faucibus volutpat purus
                            nisl massa. Egestas odio sagittis pulvinar sagittis id imperdiet
                            sapien amet. In urna mus vulputate duis tellus commodo augue
                            gravida tellus. Semper ante nam lorem nunc sit nunc. Fusce
                            adipiscing nibh ullamcorper lacus in mi aenean tincidunt.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Lorem ipsum dolor sit amet consectetur. Faucibus volutpat purus
                            nisl massa.
                        </p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Ver artigos
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
