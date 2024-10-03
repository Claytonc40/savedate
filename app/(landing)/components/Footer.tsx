import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sobre SaveDate</h3>
            <p className="text-sm">
              Save Date é uma solução SaaS inovadora para gerenciamento de datas de validade e
              controle de estoque, projetada para otimizar seus processos e reduzir perdas.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="hover:underline">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:underline">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:underline">
                  Suporte Técnico
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contate-nos</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:contato@dateguard.com" className="hover:underline">
                  contato@savedate.com.br
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <a href="tel:+551199999999" className="hover:underline">
                  +55 34 99940-6117
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-teal-700 pt-8 text-center">
          <p>&copy; 2024 Save Date. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
