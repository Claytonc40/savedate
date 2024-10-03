'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardData {
  validProducts: any[];
  expiredProducts: any[];
}

interface LabelsPrinted {
  week: number;
  month: number;
}

export default function EnhancedExpirationDashboard() {
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [labelsPrinted, setLabelsPrinted] = useState<LabelsPrinted>({ week: 0, month: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [alertsResponse, printsResponse] = await Promise.all([
          fetch('/api/alerts/dashboard'),
          fetch('/api/print/dashboard'),
        ]);
        const alertsData: DashboardData = await alertsResponse.json();
        const printsData: LabelsPrinted = await printsResponse.json();

        setDashboardData(alertsData);
        setLabelsPrinted(printsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  const totalProducts = dashboardData
    ? dashboardData.validProducts.length + dashboardData.expiredProducts.length
    : 0;
  const validProductsCount = dashboardData?.validProducts.length ?? 0;
  const expiredProductsCount = dashboardData?.expiredProducts.length ?? 0;
  const expiredNotDiscardedCount = dashboardData
    ? dashboardData.expiredProducts.filter((product) => product.status === 'pending').length
    : 0;

  const validProductsPercentage = (validProductsCount / totalProducts) * 100 || 0;
  const expiredProductsPercentage = (expiredProductsCount / totalProducts) * 100 || 0;
  const expiredNotDiscardedPercentage =
    (expiredNotDiscardedCount / expiredProductsCount) * 100 || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Expiração</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Produtos na Validade */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos na Validade</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[72px] bg-meta-6" />
            ) : (
              <>
                <div className="text-2xl font-bold text-green-500">{validProductsCount}</div>
                <Progress value={validProductsPercentage} className="mt-2 bg-green-500" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {validProductsPercentage.toFixed(1)}% do total de produtos
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Etiquetas Impressas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Etiquetas Impressas</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[72px] bg-meta-7" />
            ) : (
              <Tabs defaultValue="week" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="week">Esta Semana</TabsTrigger>
                  <TabsTrigger value="month">Este Mês</TabsTrigger>
                </TabsList>
                <TabsContent value="week" className="mt-2">
                  <div className="text-2xl font-bold">{labelsPrinted.week}</div>
                  <p className="text-xs text-muted-foreground">etiquetas impressas esta semana</p>
                </TabsContent>
                <TabsContent value="month" className="mt-2">
                  <div className="text-2xl font-bold">{labelsPrinted.month}</div>
                  <p className="text-xs text-muted-foreground">etiquetas impressas este mês</p>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        {/* Vencido sem Descarte */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencido sem Descarte</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[72px] bg-meta-7" />
            ) : (
              <>
                <div className="text-2xl font-bold text-rose-500">{expiredNotDiscardedCount}</div>
                <Progress value={expiredNotDiscardedPercentage} className="mt-2 bg-rose-500" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {expiredNotDiscardedPercentage.toFixed(1)}% dos produtos vencidos
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Produtos</CardTitle>
          <CardDescription>Distribuição de produtos válidos e vencidos</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[200px] bg-meta-7" />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 text-sm font-medium">Válidos</div>
                <div className="w-full">
                  <div className="flex items-center">
                    <Progress value={validProductsPercentage} className="h-2 flex-1 bg-green-500" />
                    <span className="ml-2 text-sm">{validProductsPercentage.toFixed(1)}%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {validProductsCount} produtos
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 text-sm font-medium">Vencidos</div>
                <div className="w-full">
                  <div className="flex items-center">
                    <Progress
                      value={expiredProductsPercentage}
                      className="h-2 flex-1 bg-rose-500"
                    />
                    <span className="ml-2 text-sm text-rose-500">
                      {expiredProductsPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {expiredProductsCount} produtos
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
