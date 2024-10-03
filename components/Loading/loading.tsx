'use client';
import React from 'react';
import { TbClockShield } from 'react-icons/tb';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-meta-7 bg-opacity-40 dark:bg-meta-4 dark:bg-opacity-75">
      <div className="relative flex items-center justify-center">
        {/* Círculo girando */}
        <div className="h-65 w-65 animate-spin rounded-full border-b-4 border-t-4 border-[#73A145]"></div>
        {/* Ícone centralizado e estático */}
        <TbClockShield className="absolute text-[8rem] text-[#73A145]" />
      </div>
      {/* Texto "Carregando..." com pontinhos piscando */}
      <h2 className="mt-6 flex items-center text-2xl font-semibold text-[#73A145]">
        Carregando
        <span className="dot-flash ml-1">
          <span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </span>
      </h2>
    </div>
  );
};

export default Loading;
