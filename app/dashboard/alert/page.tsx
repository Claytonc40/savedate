'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Bell, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '../_components/Loading';

interface Alert {
  id: string;
  productName: string;
  lot: string;
  expiryDate: string; // A data de vencimento
  daysUntilExpiry: number;
  status: string;
  quantity: number; // Adicionado o campo quantidade
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlerts(data.alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleDiscard = async (alertId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alertId, newStatus: 'discarded' }), // Passa o ID e o novo status corretamente
      });

      if (response.ok) {
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === alertId ? { ...alert, status: 'discarded' } : alert,
          ),
        );
        toast.success('Produto marcado como descartado.');
      } else {
        toast.error('Erro ao marcar produto como descartado.');
      }
    } catch (error) {
      console.error('Erro ao descartar produto:', error);
      toast.error('Erro ao descartar produto.');
    } finally {
      fetchAlerts();
      setLoading(false);
    }
  };

  // Formata a data para o padrão dd/MM/yyyy
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  // Função para filtrar os alertas com base no vencimento
  const filterAlerts = (alert: Alert) => {
    const today = new Date();
    const expiryDate = new Date(alert.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (filter) {
      case '7days':
        return diffDays <= 7 && diffDays > 0;
      case '15days':
        return diffDays <= 15 && diffDays > 0;
      case 'month':
        return diffDays <= 30 && diffDays > 0;
      default:
        return true;
    }
  };

  // Função para buscar os alertas com base no nome ou data
  const searchAlerts = (alert: Alert) => {
    return (
      alert.productName.toLowerCase().includes(search.toLowerCase()) ||
      alert.expiryDate.includes(search)
    );
  };

  // Filtros combinados: busca e filtro por data de vencimento
  const filteredAlerts = alerts.filter((alert) => filterAlerts(alert) && searchAlerts(alert));

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alertas</h1>
      </div>

      <div className="mb-4 flex space-x-4">
        <Input
          placeholder="Buscar por nome ou data"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por vencimento" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black dark:bg-meta-7 dark:text-white">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="7days">Próximos 7 dias</SelectItem>
            <SelectItem value="15days">Próximos 15 dias</SelectItem>
            <SelectItem value="month">Próximo mês</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>Produtos próximos do vencimento ou expirados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>Lote</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Vencimento (Data)</TableHead>
            <TableHead>Dias até o vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.productName}</TableCell>
                <TableCell>{alert.lot}</TableCell>
                <TableCell>{alert.quantity}</TableCell>
                <TableCell>{formatDate(alert.expiryDate)}</TableCell>
                <TableCell>
                  {alert.daysUntilExpiry > 0 ? `${alert.daysUntilExpiry} dias` : 'Expirado'}
                </TableCell>
                <TableCell>
                  {alert.daysUntilExpiry > 7 ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Vencimento distante
                    </span>
                  ) : alert.daysUntilExpiry > 0 ? (
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                      Expirando em breve
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-rose-100 px-2 text-xs font-semibold leading-5 text-rose-800">
                      Expirada
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {alert.daysUntilExpiry <= 0 && alert.status === 'pending' ? (
                    <Button variant="ghost" onClick={() => handleDiscard(alert.id)}>
                      <Trash2 className="mr-2 h-4 w-4 text-rose-700 hover:text-rose-400" />
                      Descartar
                    </Button>
                  ) : (
                    <Button variant="ghost">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Nenhum alerta disponível
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Itens por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 por página</SelectItem>
            <SelectItem value="10">10 por página</SelectItem>
            <SelectItem value="20">20 por página</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
