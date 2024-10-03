'use client';
import FadeIn from '@/components/animation/FadeIn';

const BottomText = () => {
  return (
    <FadeIn delay={0.9} direction="up">
      <div className="border-t pt-12">
        <div className="space-y-2 text-center">
          <span className="text-gray-500 block text-sm tracking-wide">
            Save Date é uma Aplicação para gerenciamento de datas
          </span>
        </div>
      </div>
    </FadeIn>
  );
};

export default BottomText;
