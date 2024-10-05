import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PricingCard from './components/PricingCard';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400">
      <Navbar />

      <main className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-6xl space-y-8">
          <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-6xl">Save Date</h1>
          <h2 className="mb-8 text-center text-2xl font-semibold text-white md:text-4xl">Planos</h2>
          <div className="flex grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
            {/* <PricingCard
              title="STANDARD"
              price="99"
              features={[
                '5 Usuários',
                '150 Cadastro de Produtos',
                'Alerta por e-mail',
                'Dashboard Multitenant',
              ]}
              disabledFeatures={[
                'Alerta pelo WhatsApp',
                'Suporte a impressão',
                'Sua marca nas etiquetas',
              ]}
            /> */}
            <PricingCard
              title="PREMIUM"
              price="199"
              isRecommended={true}
              features={[
                '10 Usuários',
                'Ilimitado Cadastro de Produtos',
                'Alerta por e-mail',
                'Alerta pelo WhatsApp',
                'Suporte a impressão',
                'Sua marca nas etiquetas',
                'Suporte Prioritário',
              ]}
            />
            <PricingCard
              title="ENTERPRISE"
              price="Personalizado"
              features={[
                'Todas as Funcionalidades Premium',
                'Implementar Novas Funcionalidades',
                'Integração Personalizada',
                'Suporte 24/7',
                'Treinamento Dedicado',
                'SLA Garantido',
              ]}
              ctaText="ENTRAR EM CONTATO"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
