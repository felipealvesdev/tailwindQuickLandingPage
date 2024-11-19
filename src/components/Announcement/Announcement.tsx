import { useState } from "react";
import { Carousel as CarouselShad, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

interface Link {
  name: string;
  href: string;
}

interface SectionProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

const Carousel: React.FC = () => {
  const slides = [
    "https://vidacigana.com/wp-content/uploads/2020/11/O-que-fazer-no-Recife-23-praia-de-boa-viagem-aereab-990x518.jpg",
    "https://st4.depositphotos.com/22290170/23873/i/380/depositphotos_238732100-stock-photo-panoramic-view-marco-zero-square.jpg",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  return (
    <div className="mx-auto w-full max-w-4xl mb-8">
      <CarouselShad className="mx-auto h-[500px] w-full bg-gray-700 rounded-lg shadow-lg">
        <CarouselContent className="max-h-auto">
          {slides.map((item, i) => (
            <CarouselItem key={i} className="max-h-[500px] w-full place-content-center place-items-center">
              <img src={item} alt="" className="h-full rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselShad>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ title, description, imageUrl, buttonText }) => (
  <div className="flex items-start space-x-4">
    <div className="w-1/3 p-2 bg-blue-100 rounded-lg">
      <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{buttonText}</button>
    </div>
  </div>
);

const About = () => {
  const [selectedLink, setSelectedLink] = useState<string>("");

  const links: Link[] = [
    { name: "Nossos Projetos", href: "#" },
    { name: "Como participar", href: "#" },
    { name: "Artigos", href: "#" },
  ];

  const sections = {
    "Nossos Projetos": {
      title: "Nossos Projetos",
      description: "Explore nossos projetos inovadores que estão transformando a tecnologia e criando impacto positivo.",
      imageUrl: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Ver Projetos",
    },
    "Como participar": {
      title: "Como participar",
      description: "Junte-se à nossa comunidade vibrante e contribua com suas habilidades para projetos colaborativos.",
      imageUrl: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Saiba Mais",
    },
    "Artigos": {
      title: "Artigos",
      description: "Descubra artigos e estudos sobre as mais recentes inovações tecnológicas, tendências e desafios enfrentados pela indústria.",
      imageUrl: "https://images.pexels.com/photos/2333332/pexels-photo-2333332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Ver Artigos",
    },
  };

  return (
    <section className="flex flex-col items-center py-8 bg-gray-50">
      <Carousel />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 border-2">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-800">SOFTEXLABS</h4>
        </div>

        <div className="flex justify-around text-lg font-medium text-gray-700">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setSelectedLink(link.name);
              }}
              className={`cursor-pointer ${selectedLink === link.name ? "text-blue-500" : ""}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <Separator className="my-6 h-px bg-gray-200" />

        {/* Renderização condicional */}
        {selectedLink && sections[selectedLink] && (
          <Section {...sections[selectedLink]} />
        )}
      </div>
    </section>
  );
};

export default About;
