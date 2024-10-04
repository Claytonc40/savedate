import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  disabledFeatures?: string[];
  isRecommended?: boolean;
  ctaText?: string;
  onClick?: () => void; // Adiciona um callback para manipular o clique
}

export default function PricingCard({
  title,
  price,
  features,
  disabledFeatures = [],
  isRecommended = false,
  ctaText = 'COMEÇAR',
  onClick,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col text-graydark dark:text-white ${isRecommended ? 'border-4 border-yellow-400' : ''}`}
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
          {isRecommended && (
            <span className="mt-2 block text-sm font-normal text-yellow-400">Recomendado</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6 text-center text-4xl font-bold">
          {price === 'Personalizado' ? (
            <span className="text-2xl">OUTROS</span>
          ) : (
            <div>
              R${price} <span className="text-xl font-normal">/mês</span>
            </div>
          )}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
          {disabledFeatures.map((feature, index) => (
            <li key={index} className="flex items-center text-meta-9">
              <X className="mr-2 h-5 w-5 text-rose-500" />
              <span className="opacity-50">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-graydark dark:text-white" onClick={onClick}>
          {' '}
          {/* Adiciona o evento de clique */}
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
