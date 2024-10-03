import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Funcionalidades do Save Date</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <FeatureCard
              title="Gerenciamento de Datas de Validade"
              description="Acompanhe facilmente as datas de validade de todos os seus produtos."
            />
            <FeatureCard
              title="Alertas Automáticos"
              description="Receba notificações por e-mail e WhatsApp sobre produtos próximos ao vencimento."
            />
            <FeatureCard
              title="Dashboard Multitenant"
              description="Gerencie múltiplas lojas ou locais a partir de uma única interface."
            />
            <FeatureCard
              title="Relatórios Avançados"
              description="Obtenha insights valiosos com nossos relatórios detalhados e personalizáveis."
            />
            <FeatureCard
              title="Integração com sistema PWA"
              description="Acesse o Save Date de qualquer dispositivo, a qualquer hora, sem precisar instalar nada."
            />
            <FeatureCard
              title="Suporte a Impressão de Etiquetas"
              description="Imprima etiquetas personalizadas diretamente do sistema."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
