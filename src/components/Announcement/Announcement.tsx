import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import useTranslation from "@/hooks/useTranslation";

const About = () => {
  const { language } = useTranslation();
  const [selectedLink, setSelectedLink] = useState<number>(1); // Estado para controlar o link selecionado
  const links: {
    name:
      | "Nossos Projetos"
      | "Como participar"
      | "Artigos"
      | "Our Projects"
      | "How to participate"
      | "Articles";
    href: string;
    index: number;
  }[] = [
    {
      name: language === "pt-BR" ? "Nossos Projetos" : "Our Projects",
      href: "#",
      index: 1,
    },
    {
      name: language === "pt-BR" ? "Como participar" : "How to participate",
      href: "#",
      index: 2,
    },
    {
      name: language === "pt-BR" ? "Artigos" : "Articles",
      href: "#",
      index: 3,
    },
  ];

  const translateObject = {
    projects: {
      title: {
        "pt-BR": "Nossos Projetos",
        "en-US": "Our Projects",
      },
      description: {
        "pt-BR": `Explore nossos projetos inovadores que estão transformando a tecnologia e criando impacto positivo.\n\nCada projeto visa resolver desafios reais e promover mudanças sustentáveis.`,
        "en-US": `Explore our innovative projects that are transforming technology and creating positive impact.\n\nEach project aims to solve real challenges and promote sustainable changes.`,
      },
      button: {
        "pt-BR": "Ver Projetos",
        "en-US": "View Projects",
      },
    },
    participation: {
      title: {
        "pt-BR": "Como participar",
        "en-US": "How to participate",
      },
      description: {
        "pt-BR": `Junte-se à nossa comunidade vibrante e contribua com suas habilidades para projetos colaborativos.\n\nOferecemos oportunidades para aprender, crescer e impactar positivamente o setor de tecnologia.`,
        "en-US": `Join our vibrant community and contribute with your skills to collaborative projects.\n\nWe offer opportunities to learn, grow, and positively impact the technology sector.`,
      },
      button: {
        "pt-BR": "Saiba Mais",
        "en-US": "Learn More",
      },
    },
    articles: {
      title: {
        "pt-BR": "Artigos",
        "en-US": "Articles",
      },
      description: {
        "pt-BR":
          "Descubra artigos e estudos sobre as mais recentes inovações tecnológicas, tendências e desafios enfrentados pela indústria. Estes artigos oferecem insights valiosos de especialistas e ajudam a expandir seu conhecimento no mundo da tecnologia.",
        "en-US":
          "Discover articles and studies on the latest technological innovations, trends and challenges facing the industry. These articles offer valuable insights from experts and help expand your knowledge in the world of technology.",
      },
      button: {
        "pt-BR": "Ver Artigos",
        "en-US": "View Articles",
      },
    },
  };

  return (
    <section className="flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 border-2 dark:border-gray-700">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-50">SOFTEXLABS</h4>
        </div>

        <div className="flex justify-around text-lg font-medium text-gray-700 dark:text-gray-50">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setSelectedLink(link.index);
              }}
              className={`cursor-pointer ${
                selectedLink === link.index ? "text-orange-500" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <Separator className="my-6 h-px bg-gray-200 dark:bg-gray-50" />

        {/* Renderização condicional baseada no link selecionado */}
        <div className="flex items-start space-x-4">
          {selectedLink === 1 && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Exemplo de Projeto"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {language === "pt-BR"
                    ? translateObject.projects.title["pt-BR"]
                    : translateObject.projects.title["en-US"]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {language === "pt-BR"
                    ? translateObject.projects.description["pt-BR"]
                    : translateObject.projects.description["en-US"]}
                </p>

                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  {language === "pt-BR"
                    ? translateObject.projects.button["pt-BR"]
                    : translateObject.projects.button["en-US"]}
                </button>
              </div>
            </div>
          )}
          {selectedLink === 2 && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Participação"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {language === "pt-BR"
                    ? translateObject.participation.title["pt-BR"]
                    : translateObject.participation.title["en-US"]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {language === "pt-BR"
                    ? translateObject.participation.description["pt-BR"]
                    : translateObject.participation.description["en-US"]}
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none">
                  Saiba Mais
                </button>
              </div>
            </div>
          )}
          {selectedLink === 3 && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/2333332/pexels-photo-2333332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Exemplo de Artigo"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {language === "pt-BR"
                    ? translateObject.articles.title["pt-BR"]
                    : translateObject.articles.title["en-US"]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {language === "pt-BR"
                    ? translateObject.articles.description["pt-BR"]
                    : translateObject.articles.description["en-US"]}
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none">
                  {language === "pt-BR"
                    ? translateObject.articles.button["pt-BR"]
                    : translateObject.articles.button["en-US"]}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
