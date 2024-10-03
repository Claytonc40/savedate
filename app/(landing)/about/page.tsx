import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Sobre o Save Date</h1>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg">
                Save Date nasceu da necessidade de simplificar o gerenciamento de datas de validade
                para empresas de todos os tamanhos. Nossa missão é reduzir o desperdício e otimizar
                o controle de estoque através de tecnologia inovadora e fácil de usar.
              </p>
              <p className="mb-4 text-lg">
                Fundada em 2024, nossa equipe de especialistas em tecnologia e gestão de negócios
                trabalha incansavelmente para oferecer uma solução que atenda às necessidades
                específicas de nossos clientes.
              </p>
              <p className="text-lg">
                Com o Save Date, empresas podem focar no que realmente importa: crescer seus
                negócios e satisfazer seus clientes, enquanto nós cuidamos do resto.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/placeholder.svg"
                alt="Equipe DateGuard"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
