import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Documentação do Save Date</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <DocSection
              title="Guia de Início Rápido"
              description="Aprenda como configurar e começar a usar o Save Date em minutos."
              link="/docs/quick-start"
            />
            <DocSection
              title="API de Integração"
              description="Documentação completa da nossa API para integrar o Save Date com seus sistemas existentes."
              link="/docs/api"
            />
            <DocSection
              title="Melhores Práticas"
              description="Dicas e truques para aproveitar ao máximo o Save Date em seu negócio."
              link="/docs/best-practices"
            />
            <DocSection
              title="Atualizações e Changelog"
              description="Fique por dentro das últimas atualizações e melhorias do Save Date."
              link="/docs/changelog"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DocSection({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 text-teal-800 shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-4">{description}</p>
      <Link href={link} className="text-teal-600 hover:underline">
        Ler mais →
      </Link>
    </div>
  );
}
