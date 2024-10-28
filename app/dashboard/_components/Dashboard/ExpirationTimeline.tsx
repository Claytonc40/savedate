'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AlertCircle, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExpiringProduct {
  productName: string;
  quantity: number;
  alertDate: string;
}

export default function AdjustedExpiringTodayLog() {
  const [expiringToday, setExpiringToday] = useState<ExpiringProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    async function fetchExpiringToday() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/alerts/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setExpiringToday(data.expiringToday);
      } catch (error) {
        console.error('Error fetching expiring today products:', error);
        setError('Failed to load expiring products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchExpiringToday();
  }, []);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollArea = document.querySelector('.scroll-area');
      if (scrollArea) {
        setShowScrollButtons(scrollArea.scrollHeight > scrollArea.clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [expiringToday]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    });
  };

  const handleScroll = (direction: 'up' | 'down') => {
    const scrollArea = document.querySelector('.scroll-area');
    if (scrollArea) {
      const scrollAmount = direction === 'up' ? -100 : 100;
      scrollArea.scrollTop += scrollAmount;
    }
  };

  return (
    <Card className="flex h-full w-full flex-col bg-white dark:bg-boxdark">
      <CardHeader className="bg-primary py-2 text-boxdark-2 dark:bg-boxdark-2 dark:text-white">
        <CardTitle className="flex items-center text-lg font-semibold">
          <AlertCircle className="mr-2 h-5 w-5" />
          Produtos Vencendo Hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-grow p-0">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-danger">{error}</div>
        ) : expiringToday.length === 0 ? (
          <div className="p-4 text-center text-body dark:text-bodydark">
            Nenhum produto vencendo hoje.
          </div>
        ) : (
          <div>
            <ScrollArea className="scroll-area h-[calc(100%-2rem)]">
              <ul className="divide-y divide-stroke dark:divide-strokedark">
                {expiringToday.map((product, index) => (
                  <li
                    key={index}
                    className="p-3 transition-colors hover:bg-gray-2 dark:hover:bg-boxdark-2"
                  >
                    <div className="flex items-start">
                      <Package className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-body dark:text-bodydark" />
                      <div className="min-w-0 flex-grow">
                        <p className="truncate font-medium text-black dark:text-bodydark">
                          {product.productName}
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className="flex-shrink-0 bg-gray-2 text-body dark:bg-boxdark-2 dark:text-bodydark"
                          >
                            {product.quantity} unidades
                          </Badge>
                          <span className="truncate text-sm text-body dark:text-bodydark">
                            Vence em:{' '}
                            <p className="inline-flex rounded-full bg-danger/10 px-2 text-xs font-semibold leading-5 text-danger">
                              {formatDate(product.alertDate)}
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            {showScrollButtons && (
              <div className="absolute bottom-0 right-0 flex flex-col p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleScroll('up')}
                  className="mb-1 text-body hover:bg-gray-2 dark:text-bodydark dark:hover:bg-boxdark-2"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleScroll('down')}
                  className="text-body hover:bg-gray-2 dark:text-bodydark dark:hover:bg-boxdark-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
