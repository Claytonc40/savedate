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
import { Minus, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '../Loading';
import ManageCategoriesModal from './ManageCategoriesModal'; // Import the modal component

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
}

interface Product {
  id: string;
  name: string;
  setting?: number;
  settingUnit?: string;
  validity?: number;
  validityUnit?: string;
  quantity?: number;
  status?: string;
  createdAt: string;
  updatedAt: string;
  category: Category; // Add category as a part of the product
}

interface Category {
  id: string;
  name: string;
  notificationEnabled: boolean;
}

function NumberInput({ value, onChange, min = 0, max = Infinity }: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(Number(value) + 1, max);
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - 1, min);
    onChange(newValue.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || (Number(newValue) >= min && Number(newValue) <= max)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        className="h-8 w-16 rounded-none border-x-0 text-center"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={handleIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Products() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    setting: '',
    settingUnit: 'hours',
    validity: '',
    validityUnit: 'hours',
    quantity: '',
    status: 'active',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar categorias
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();

      // Verificar se a resposta contém o array de categorias
      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        toast.error('Erro: O retorno de categorias não é um array');
      }
    } catch (error) {
      toast.error('Erro ao buscar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && product.status === 'active') ||
      (filterStatus === 'inactive' && product.status === 'inactive');
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCloseProductModal = () => {
    setNewProduct({
      name: '',
      setting: '',
      settingUnit: 'hours',
      validity: '',
      validityUnit: 'hours',
      quantity: '',
      status: 'active',
      categoryId: '',
    });
    setSelectedProductId(null);
    setIsEditing(false);
  };

  async function handleAddProduct(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/products/${selectedProductId}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          setting: newProduct.setting ? parseInt(newProduct.setting, 10) : null,
          validity: newProduct.validity ? parseInt(newProduct.validity, 10) : null,
          quantity: newProduct.quantity ? parseInt(newProduct.quantity, 10) : null,
        }),
      });

      if (!res.ok) {
        throw new Error(isEditing ? 'Erro ao atualizar' : 'Erro ao adicionar produto');
      }

      await fetchProducts();

      toast.success(
        isEditing ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!',
      );
      handleCloseProductModal();
      setIsAddProductOpen(false);
    } catch (error) {
      toast.error('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  }

  function handleEditProduct(product: Product) {
    setIsEditing(true);
    setSelectedProductId(product.id);
    setNewProduct({
      name: product.name,
      setting: product.setting ? product.setting.toString() : '',
      settingUnit: product.settingUnit || 'hours',
      validity: product.validity ? product.validity.toString() : '',
      validityUnit: product.validityUnit || 'hours',
      quantity: product.quantity ? product.quantity.toString() : '',
      status: product.status || 'active',
      categoryId: product.category.id, // Set categoryId
    });
    setIsAddProductOpen(true);
  }

  async function handleDeleteProduct(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Erro ao deletar produto');
      }

      await fetchProducts();
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar produto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestor de Produtos</h1>
        <div className="flex space-x-4">
          <Dialog
            open={isAddProductOpen}
            onOpenChange={(open) => {
              setIsAddProductOpen(open);
              if (!open) handleCloseProductModal();
            }}
          >
            <DialogTrigger asChild>
              <Button className="text-white" onClick={() => setIsEditing(false)}>
                Add Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-meta-7 text-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Editar Produto' : 'Add Novo Produto'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="setting">Ambientação</Label>
                      <NumberInput
                        value={newProduct.setting}
                        onChange={(value) => setNewProduct({ ...newProduct, setting: value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="settingUnit">Unidade</Label>
                      <Select
                        value={newProduct.settingUnit}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, settingUnit: value })
                        }
                      >
                        <SelectTrigger id="settingUnit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-meta-7 text-white hover:text-meta-9">
                          <SelectItem value="hours">Horas</SelectItem>
                          <SelectItem value="days">Dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="validity">Validade</Label>
                      <NumberInput
                        value={newProduct.validity}
                        onChange={(value) => setNewProduct({ ...newProduct, validity: value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validityUnit">Unidade</Label>
                      <Select
                        value={newProduct.validityUnit}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, validityUnit: value })
                        }
                      >
                        <SelectTrigger id="validityUnit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-meta-7 text-white hover:text-meta-9">
                          <SelectItem value="hours">Horas</SelectItem>
                          <SelectItem value="days">Dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newProduct.categoryId}
                      onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-meta-7 text-white hover:text-meta-9">
                        {Array.isArray(categories) && categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value={''}>
                            Nenhuma categoria disponível
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProduct.status}
                      onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-meta-7 text-white hover:text-meta-9">
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading
                      ? isEditing
                        ? 'Atualizando...'
                        : 'Adicionando...'
                      : isEditing
                        ? 'Atualizar Produto'
                        : 'Adicionar Produto'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <ManageCategoriesModal />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent className="bg-meta-7 text-white hover:text-meta-9">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table>
            <TableCaption>Lista de todos produtos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Categoria</TableHead> {/* New Category Column */}
                <TableHead>Ambientação</TableHead>
                <TableHead>Ambientação em</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Validade em</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category?.name || 'N/A'}</TableCell> {/* Show category */}
                  <TableCell>{product.setting || 'N/A'}</TableCell>
                  <TableCell>{product.settingUnit || 'N/A'}</TableCell>
                  <TableCell>{product.validity || 'N/A'}</TableCell>
                  <TableCell>{product.validityUnit || 'N/A'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit product</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-rose-500"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete product</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex items-center justify-between">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 por página</SelectItem>
                <SelectItem value="10">10 por página</SelectItem>
                <SelectItem value="20">20 por página</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
                <Button
                  className="text-white"
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
