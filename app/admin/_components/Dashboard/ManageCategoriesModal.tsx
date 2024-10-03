'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '../Loading';

interface Category {
  id: string;
  name: string;
  notificationEnabled: boolean;
}

export default function ManageCategoriesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', notificationEnabled: false });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error('Erro ao buscar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar categoria');
      }

      toast.success('Categoria adicionada com sucesso!');
      setNewCategory({ name: '', notificationEnabled: false });
      fetchCategories(); // Refresh categories
    } catch (error) {
      toast.error('Erro ao adicionar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Erro ao deletar categoria');
      }

      toast.success('Categoria deletada com sucesso!');
      fetchCategories(); // Refresh categories
    } catch (error) {
      toast.error('Erro ao deletar categoria');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-white">Gerenciar Categorias</Button>
      </DialogTrigger>
      <DialogContent className="bg-meta-7 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gerenciar Categorias</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Nome da Categoria</Label>
            <Input
              id="categoryName"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newCategory.notificationEnabled}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, notificationEnabled: e.target.checked })
                }
              />
              <span className="ml-2">Habilitar Notificações</span>
            </label>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adicionando...' : 'Adicionar Categoria'}
            </Button>
          </DialogFooter>
        </form>

        <div className="mt-6">
          <h3 className="text-xl">Categorias Criadas</h3>
          {loading ? (
            <Loading />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Notificação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.notificationEnabled ? 'Habilitado' : 'Desabilitado'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="text-rose-500"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
