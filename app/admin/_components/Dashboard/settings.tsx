'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Tenant {
  id: string;
  name: string;
}

export default function TenantSettings() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTenantName, setNewTenantName] = useState('');

  // Função para buscar o nome atual do Tenant
  const fetchTenant = async () => {
    try {
      const response = await fetch('/api/profile/tenant');
      const data = await response.json();
      setTenant(data.tenant);
      setNewTenantName(data.tenant.name); // Preenche o campo com o nome atual
    } catch (error) {
      console.error('Erro ao buscar dados do tenant:', error);
      toast.error('Erro ao carregar o tenant.');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar o tenant no backend
  const handleSave = async () => {
    if (!newTenantName) {
      toast.error('O nome do tenant não pode estar vazio.');
      return;
    }

    try {
      const response = await fetch(`/api/profile/tenant/${tenant?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTenantName }),
      });

      if (response.ok) {
        toast.success('Nome do tenant atualizado com sucesso.');
        fetchTenant(); // Recarrega os dados do tenant
      } else {
        toast.error('Erro ao atualizar o nome do tenant.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o tenant:', error);
      toast.error('Erro ao salvar as alterações.');
    }
  };

  useEffect(() => {
    fetchTenant(); // Buscar dados do tenant quando o componente é montado
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Configurações do Tenant</h1>

      <div className="mb-6">
        <label className="text-gray-700 mb-2 block text-sm font-medium">Nome do Tenant</label>
        <Input
          value={newTenantName}
          onChange={(e) => setNewTenantName(e.target.value)}
          placeholder="Digite o novo nome do tenant"
        />
      </div>

      <Button onClick={handleSave} className="w-full text-white">
        Salvar Alterações
      </Button>
    </div>
  );
}
