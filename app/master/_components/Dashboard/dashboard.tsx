'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertTriangle, Package, Users } from 'lucide-react';
import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Joyride from 'react-joyride'; // Importando o React Joyride

const Dashboard: React.FC = () => {
  const [tourState, setTourState] = useState({
    run: false, // Controla o estado do tour
    steps: [
      {
        target: '.store-select', // Classe ou ID de destino para o primeiro passo
        content:
          'Selecione uma loja aqui. caso não tenha lojas cadastradas, Procure um Administrador.',
        locale: { skip: 'Pular', next: 'Próximo', back: 'Voltar' },
      },
      {
        target: '.date-picker', // Classe ou ID de destino para o segundo passo
        content: 'Escolha uma data para gerar o relatório.',
        locale: { skip: 'Pular', next: 'Próximo', back: 'Voltar' },
      },
      {
        target: '.fetch-report-btn', // Classe ou ID de destino para o terceiro passo
        content: 'Clique para buscar os dados do relatório.',
        locale: { skip: 'Pular', next: 'Próximo', back: 'Voltar' },
      },
      {
        target: '.card-stats', // Classe ou ID de destino para os cards de dados
        content: 'Aqui estão os dados do relatório.',
        locale: { skip: 'Pular', next: 'Próximo', back: 'Voltar', last: 'Finalizar' },
      },
      {
        target: '.card-dados', // Classe ou ID de destino para os cards de dados
        content:
          'Caso não haja dados você pode clicar em "Importar dados" ao lado para inserir os dados manualmente.',
        locale: { skip: 'Pular', next: 'Próximo', back: 'Voltar', last: 'Finalizar' },
      },
    ],
  });

  const startTour = () => {
    setTourState((prevState) => ({ ...prevState, run: true }));
  };

  return (
    <>
      <div className="bg-gray-100 flex h-screen">
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Componente Joyride para o guia passo a passo */}
          <Joyride
            steps={tourState.steps}
            continuous
            showSkipButton
            run={tourState.run} // Define se o tour está rodando ou não
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
          />
          {/* Botão flutuante no canto inferior direito */}

          <motion.button
            onClick={startTour}
            className="fixed bottom-8 right-8 rounded-full bg-meta-7 p-3 text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-meta-10 focus:outline-none focus:ring-2 focus:ring-meta-6 focus:ring-offset-2 dark:bg-meta-10 dark:hover:bg-meta-6 dark:focus:ring-offset-boxdark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaQuestionCircle size={24} />
          </motion.button>

          {/* Dashboard Content */}
          <main className="bg-gray-100 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

              <div className="mt-4">
                <div className="-mx-6 flex flex-wrap">
                  <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,257</div>
                        <p className="text-xs text-muted-foreground">
                          +20% em relação ao mês passado
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-4 w-full px-6 sm:mt-0 sm:w-1/2 xl:w-1/3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Produtos Próximos do Vencimento
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">Necessitam atenção imediata</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-4 w-full px-6 sm:w-1/2 xl:mt-0 xl:w-1/3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                          3 novos usuários esta semana
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-green-500">•</span>
                        <p className="text-sm">João adicionou 50 novos produtos ao sistema</p>
                        <span className="text-gray-500 ml-auto text-xs">2 min atrás</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-yellow-500">•</span>
                        <p className="text-sm">Maria atualizou as configurações de impressão</p>
                        <span className="text-gray-500 ml-auto text-xs">1 hora atrás</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-500 mr-2">•</span>
                        <p className="text-sm">Sistema marcou 5 produtos como vencidos</p>
                        <span className="text-gray-500 ml-auto text-xs">3 horas atrás</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Ações em Lote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Button>Imprimir Etiquetas Selecionadas</Button>
                      <Button variant="outline">Marcar como Notificados</Button>
                      <Button variant="destructive">Marcar como Vencidos</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
