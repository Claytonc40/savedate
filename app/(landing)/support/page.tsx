import { LifeBuoy, MessageCircle, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import SupportCard from '../components/SupportCard';

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Suporte Técnico</h1>
          <div className="grid gap-8 md:grid-cols-3">
            <SupportCard
              icon={<MessageCircle className="mb-4 h-12 w-12" />}
              title="Chat ao Vivo"
              description="Converse com nossa equipe de suporte em tempo real para obter ajuda imediata."
              action="Iniciar Chat"
            />
            <SupportCard
              icon={<Phone className="mb-4 h-12 w-12" />}
              title="Suporte por Telefone"
              description="Ligue para nossa equipe de suporte para assistência personalizada."
              action="Ligar Agora"
            />
            <SupportCard
              icon={<LifeBuoy className="mb-4 h-12 w-12" />}
              title="Base de Conhecimento"
              description="Explore nossa extensa base de conhecimento para encontrar respostas rápidas."
              action="Acessar Base"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
