import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Perguntas Frequentes</h1>
          <Accordion type="single" collapsible className="rounded-lg bg-white text-teal-800">
            <AccordionItem value="item-1">
              <AccordionTrigger>O que é o Save Date?</AccordionTrigger>
              <AccordionContent>
                Save Date é uma solução SaaS para gerenciamento de datas de validade e controle de
                estoque, projetada para ajudar empresas a reduzir perdas e otimizar seus processos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Como funciona o sistema de alertas?</AccordionTrigger>
              <AccordionContent>
                O Save Date envia alertas automáticos por e-mail e WhatsApp quando produtos estão
                próximos da data de vencimento, permitindo que você tome ações preventivas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>O Save Date é adequado para pequenas empresas?</AccordionTrigger>
              <AccordionContent>
                Sim, o Save Date foi projetado para atender empresas de todos os tamanhos.
                Oferecemos planos flexíveis que se adaptam às necessidades de pequenas, médias e
                grandes empresas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Como posso começar a usar o Save Date?</AccordionTrigger>
              <AccordionContent>
                Para começar, basta se cadastrar em nosso site, escolher um plano adequado às suas
                necessidades e seguir as instruções de configuração. Nosso suporte está disponível
                para ajudar em todo o processo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
