'use client';

import { motion } from 'framer-motion';
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
      <div className="flex h-screen flex-col overflow-y-auto">
        {/* Conteúdo da página */}
        <div className="flex-grow overflow-y-auto">
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
            className="fixed bottom-8 right-8 rounded-full bg-meta-5 p-3 text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-meta-10 focus:outline-none focus:ring-2 focus:ring-meta-5 focus:ring-offset-2 dark:bg-meta-10 dark:hover:bg-meta-5 dark:focus:ring-offset-boxdark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaQuestionCircle size={24} />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
