'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Printer } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import { NumberInput } from '../_components/Dashboard/NumberInput';
import Loading from '../_components/Loading';

export default function ProductLabelPrinter() {
  interface Category {
    id: string;
    name: string;
  }

  interface Product {
    id: string;
    name: string;
    price: number;
    expirationDate: string;
    ambientDateTime: string;
    categoryId: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [tenantImage, setTenantImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [batchNumber, setBatchNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [paperSize, setPaperSize] = useState('A4');
  const [categorySearch, setCategorySearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const componentRef = useRef<HTMLDivElement>(null);

  const labelsPerRow = paperSize === 'A4' ? 3 : 1;
  const spaceBetweenLabels = paperSize === 'A4' ? '10px' : '0px';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products/prints');
        const data = await response.json();
        setCategories(data.categories || []); // Garante que categories seja um array
        setProducts(data.products || []); // Garante que products seja um array
        setTenantImage(data.tenantImage);
      } catch (error) {
        toast.error('Erro ao buscar dados:');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product) => product.categoryId === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const formatDateToBrasilia = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
  };

  const handlePrint = useReactToPrint({
    content: () => {
      const printContainer = document.createElement('div');
      printContainer.setAttribute('id', 'print-container');
      printContainer.style.display = 'grid';
      printContainer.style.gridTemplateColumns = `repeat(${labelsPerRow}, 1fr)`;
      printContainer.style.gap = spaceBetweenLabels;

      for (let i = 0; i < quantity; i++) {
        const clone = componentRef.current?.cloneNode(true);
        if (clone) {
          const element = clone as HTMLElement;
          element.style.height = '100%';
          element.style.width = '100%';
          element.style.boxSizing = 'border-box';
          element.style.margin = '0';
          element.style.pageBreakInside = 'avoid';
          element.classList.add('text-print');
          printContainer.appendChild(element);
        }
      }

      document.body.appendChild(printContainer);

      return printContainer;
    },
    documentTitle: 'Etiquetas',
    pageStyle: `
      @page {
        size: ${paperSize === 'A4' ? 'A4' : '75mm 48mm'};
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
      }
      #print-container {
        display: grid;
        grid-template-columns: repeat(${labelsPerRow}, 1fr);
        gap: ${spaceBetweenLabels};
      }
      .content-to-print {
        page-break-inside: avoid;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: 'Arial', sans-serif;
      }
      .text-print {
        font-size: ${paperSize === 'A4' ? '2.5mm' : '1.2mm'};
        line-height: 1.2;
        margin-bottom: 1mm;
      }
      .product-name {
        font-size: ${paperSize === 'A4' ? '3.5mm' : '2mm'};
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 2mm;
        color: #333;
      }
      .divider {
        width: 100%;
        height: 1px;
        background-color: #ccc;
        margin: 5px 0;
      }
      .label-info {
        font-size: ${paperSize === 'A4' ? '2mm' : '1.5mm'};
        color: #666;
        margin-bottom: 1mm;
      }
    `,
    onAfterPrint: () => {
      const printContainer = document.getElementById('print-container');
      if (printContainer) {
        document.body.removeChild(printContainer);
      }
      registerPrint();
    },
  });

  function abbreviateProductName(name: string, maxLength: number): string {
    return name.length > maxLength ? name.substring(0, maxLength - 3) + '...' : name;
  }

  const registerPrint = async () => {
    const brasiliaTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct?.id,
          quantity,
          lotNumber: batchNumber,
          timestamp: brasiliaTime,
        }),
      });

      if (response.ok) {
        toast.success('Impressão registrada com sucesso!');
      } else {
        return toast.error('Erro ao registrar a impressão');
      }
    } catch (error) {
      toast.error('Erro ao registrar impressão:');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Impressão de Validade</h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="flex w-full items-center justify-center p-4">
              <div
                ref={componentRef}
                className="w-85 mb-4 flex flex-col justify-between space-y-3 border-2 border-dashed border-meta-6 p-4 text-left"
              >
                <div className="content-to-print flex flex-col items-start">
                  {tenantImage && (
                    <Image
                      src={tenantImage}
                      alt="Logo"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <h3 className="product-name">
                    {selectedProduct ? abbreviateProductName(selectedProduct.name, 25) : 'Produto'}
                  </h3>
                  <div className="divider"></div>
                </div>
                <div className="content-to-print flex flex-col space-y-1">
                  {batchNumber && <p className="label-info">Lote: {batchNumber}</p>}
                  {selectedProduct?.ambientDateTime && (
                    <p className="label-info">
                      Ambientação: {formatDateToBrasilia(selectedProduct.ambientDateTime)}
                    </p>
                  )}
                  <p className="label-info">
                    Vencimento:{' '}
                    {selectedProduct?.expirationDate
                      ? formatDateToBrasilia(selectedProduct.expirationDate)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category-select">Selecione uma Categoria</Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setSelectedProduct(null);
                    }}
                  >
                    <SelectTrigger id="category-select">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black dark:bg-meta-7 dark:text-white">
                      <Input
                        placeholder="Buscar categoria..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="mb-2"
                      />
                      {categories.length > 0 &&
                        categories
                          .filter((category) =>
                            category.name.toLowerCase().includes(categorySearch.toLowerCase()),
                          )
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedCategory && (
                  <div>
                    <Label htmlFor="product-select">Selecione um Produto</Label>
                    <Select
                      onValueChange={(value) => {
                        const foundProduct = filteredProducts.find((p) => p.id === value);
                        setSelectedProduct(foundProduct ?? null);
                      }}
                    >
                      <SelectTrigger id="product-select">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black dark:bg-meta-7 dark:text-white">
                        <Input
                          placeholder="Buscar produto..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="mb-2"
                        />
                        {filteredProducts.length > 0 &&
                          filteredProducts
                            .filter((product) =>
                              product.name.toLowerCase().includes(productSearch.toLowerCase()),
                            )
                            .map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label htmlFor="batch-input">Número do Lote</Label>
                  <Input
                    id="batch-input"
                    placeholder="Entre com o número do lote"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                  />
                </div>
                <Button onClick={() => setModalOpen(true)} className="w-full text-white">
                  <Printer className="mr-2 h-4 w-4" /> Imprimir Etiqueta
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-meta-7 text-white">
              <DialogHeader>
                <DialogTitle>Configurações de Impressão</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity-input">Quantidade de Etiquetas</Label>
                  <NumberInput
                    value={quantity.toString()}
                    onChange={(value: any) => setQuantity(Number(value))}
                  />
                </div>
                <div>
                  <Label htmlFor="paper-size-select">Tamanho da Folha</Label>
                  <Select onValueChange={(value) => setPaperSize(value)} defaultValue="A4">
                    <SelectTrigger id="paper-size-select">
                      <SelectValue placeholder="Selecione o tamanho da folha" />
                    </SelectTrigger>
                    <SelectContent className="bg-meta-7 text-white">
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="A5">A5</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handlePrint}>Confirmar Impressão</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
