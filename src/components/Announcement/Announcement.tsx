import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const [selectedLink, setSelectedLink] = useState<"Nossos Projetos"|"Como participar"|"Artigos">("Nossos Projetos"); // Estado para controlar o link selecionado

  const links:{name:"Nossos Projetos"|"Como participar"|"Artigos",href:string}[] = [
    { name: 'Nossos Projetos', href: '#' },
    { name: 'Como participar', href: '#' },
    { name: 'Artigos', href: '#' },
  ];

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
                setSelectedLink(link.name);
              }}
              className={`cursor-pointer ${selectedLink === link.name ? "text-orange-500" : ""}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <Separator className="my-6 h-px bg-gray-200 dark:bg-gray-50" />

        {/* Renderização condicional baseada no link selecionado */}
        <div className="flex items-start space-x-4">
          {selectedLink === "Nossos Projetos" && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Exemplo de Projeto"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Nossos Projetos</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore nossos projetos inovadores que estão transformando a tecnologia e criando impacto positivo.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Cada projeto visa resolver desafios reais e promover mudanças sustentáveis.
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none">
                  Ver Projetos
                </button>
              </div>
            </div>
          )}
          {selectedLink === "Como participar" && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Participação"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Como participar</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Junte-se à nossa comunidade vibrante e contribua com suas habilidades para projetos colaborativos.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Oferecemos oportunidades para aprender, crescer e impactar positivamente o setor de tecnologia.
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none">
                  Saiba Mais
                </button>
              </div>
            </div>
          )}
          {selectedLink === "Artigos" && (
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/2333332/pexels-photo-2333332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Exemplo de Artigo"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Artigos</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Descubra artigos e estudos sobre as mais recentes inovações tecnológicas, 
                  tendências e desafios enfrentados pela indústria. Estes artigos oferecem insights valiosos 
                  de especialistas e ajudam a expandir seu conhecimento no mundo da tecnologia.
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none">
                  Ver Artigos
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
