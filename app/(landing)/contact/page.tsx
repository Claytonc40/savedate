import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-teal-900 via-teal-600 to-teal-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Entre em Contato</h1>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Informações de Contato</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <Mail className="mr-2 h-6 w-6" />
                  contato@savedate.com.br
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-6 w-6" />
                  +55 34 99940-6117
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-6 w-6" />
                  Minas Gerais, MG
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Envie uma Mensagem</h2>
              <form className="space-y-4">
                <Input type="text" placeholder="Seu Nome" className="bg-white text-teal-800" />
                <Input type="email" placeholder="Seu E-mail" className="bg-white text-teal-800" />
                <Textarea placeholder="Sua Mensagem" className="bg-white text-teal-800" rows={4} />
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
