'use client';

import Loading from '@/components/Loading/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Clock, Printer, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DashboardData {
  totalEtiquetasGeradas: number;
  totalProdutosMonitorados: number;
  produtosExpirando: number;
  etiquetasPorCategoria: { nome: string; valor: number }[];
  statusExpiracao: { nome: string; valor: number }[];
  impressoesRecentes: { id: string; produto: string; quantidade: number; data: string }[];
}

const CORES = ['#3C50E0', '#80CAEE', '#10B981', '#FFA70B', '#FB5454'];

export default function PainelAdministrador() {
  const [dadosPainel, setDadosPainel] = useState<DashboardData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [intervaloData, setIntervaloData] = useState('semana');
  const [termoPesquisa, setTermoPesquisa] = useState('');

  useEffect(() => {
    const buscarDadosPainel = async () => {
      setCarregando(true);
      try {
        const response = await fetch(
          `/api/admin/dashboard?intervalo=${intervaloData}&busca=${termoPesquisa}`,
        );
        if (!response.ok) throw new Error('Falha ao buscar dados do painel');
        const data = await response.json();
        setDadosPainel(data);
      } catch (error) {
        console.error('Erro ao buscar dados do painel:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosPainel();
  }, [intervaloData, termoPesquisa]);

  if (carregando) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-3 p-4 dark:bg-boxdark">
      <h1 className="mb-6 text-3xl font-bold text-black dark:text-bodydark">
        Painel do Sistema de Impressão de Etiquetas
      </h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <Select value={intervaloData} onValueChange={setIntervaloData}>
          <SelectTrigger className="w-[180px] bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
            <SelectValue placeholder="Selecionar intervalo de data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Última Semana</SelectItem>
            <SelectItem value="mes">Último Mês</SelectItem>
            <SelectItem value="ano">Último Ano</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Buscar produtos ou categorias"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="w-full max-w-xs bg-white text-black dark:bg-boxdark-2 dark:text-bodydark"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black dark:text-bodydark">
              Total de Etiquetas Geradas
            </CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-bodydark">
              {dadosPainel?.totalEtiquetasGeradas}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black dark:text-bodydark">
              Produtos Monitorados
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-bodydark">
              {dadosPainel?.totalProdutosMonitorados}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black dark:text-bodydark">
              Produtos Expirando
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{dadosPainel?.produtosExpirando}</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black dark:text-bodydark">
              Tempo Médio para Expiração
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">30 dias</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader>
            <CardTitle className="text-black dark:text-bodydark">Etiquetas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosPainel?.etiquetasPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#3C50E0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader>
            <CardTitle className="text-black dark:text-bodydark">Status de Expiração</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPainel?.statusExpiracao}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {dadosPainel?.statusExpiracao.map((entrada, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader>
            <CardTitle className="text-black dark:text-bodydark">
              Impressões Recentes de Etiquetas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {dadosPainel?.impressoesRecentes.map((impressao) => (
                <div key={impressao.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black dark:text-bodydark">
                      {impressao.produto}
                    </p>
                    <p className="text-sm text-body dark:text-bodydark1">
                      Impresso em: {impressao.data}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{impressao.quantidade} etiquetas</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="bg-white dark:bg-boxdark-2">
          <CardHeader>
            <CardTitle className="text-black dark:text-bodydark">Ações do Administrador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-meta-7 text-white hover:bg-meta-6"
                onClick={() => (window.location.href = '/admin/products')}
              >
                Gerenciar Categorias e Produtos
              </Button>
              <Button
                className="bg-meta-7 text-white hover:bg-secondary/90"
                onClick={() => (window.location.href = '/admin/printers')}
              >
                Configurar Modelos de Etiquetas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
