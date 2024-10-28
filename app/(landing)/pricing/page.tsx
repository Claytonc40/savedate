import Footer from '../components/Footer';
import Header from '../components/Navbar';
import PricingCard from '../components/PricingCard';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Planos e Preços</h1>
          <p className="mb-12 text-center text-xl">Escolha o plano perfeito para o seu negócio</p>
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
            {/* <PricingCard
              title="ELITE"
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
            /> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
