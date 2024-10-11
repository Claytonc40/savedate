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
import Loading from '../_components/Loading';

// Função para formatar data e hora
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

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

interface PrinterConfig {
  id: string;
  name: string;
  paperSize: string;
  labelWidth: number;
  labelHeight: number;
  marginTop: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  boldText: boolean;
  italicText: boolean;
  rotation: number;
  barcodeEnabled: boolean;
  barcodeType: string;
  barcodePosition: string;
  labelBorder: boolean;
  borderColor: string;
  backgroundColor: string;
  customImageEnabled: boolean;
  imagePosition: string;
  imageOpacity: number;
  numberOfLabelsPerPage: number;
  cutLineEnabled: boolean;
  useCustomMargins: boolean;
  logoWidth: number;
  logoHeight: number;
  logoTop: number;
  logoLeft: number;
  labelsPerRow: number;
  labelsPerColumn: number;
}

export default function ProductLabelPrinter() {
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
  const [printerConfig, setPrinterConfig] = useState<PrinterConfig[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<string[]>([]); // Campos personalizados para adicionar nas etiquetas
  const [newField, setNewField] = useState(''); // Estado para o novo campo

  useEffect(() => {
    const fetchConfigs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/printer-config');
        const data = await response.json();
        setPrinterConfig(data);
      } catch (error) {
        toast.error('Erro ao buscar configurações de impressão');
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/prints');
        const data = await response.json();
        setCategories(data.categories || []);
        setProducts(data.products || []);
        setTenantImage(data.tenantImage);
      } catch (error) {
        toast.error('Erro ao buscar dados');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product) => product.categoryId === selectedCategory);
      setFilteredProducts(filtered);
      setSelectedProduct(null);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handlePrint = useReactToPrint({
    content: () => {
      const printContainer = document.createElement('div');
      printContainer.id = 'print-container';

      const printer = printerConfig.find((p) => p.id === selectedPrinter);

      if (printer) {
        printContainer.style.display = 'grid';
        printContainer.style.gridTemplateColumns = `repeat(${printer.labelsPerRow}, ${printer.labelWidth}mm)`;
        printContainer.style.gridTemplateRows = `repeat(${printer.labelsPerColumn}, ${printer.labelHeight}mm)`;
        printContainer.style.gap = `${printer.verticalSpacing}mm ${printer.horizontalSpacing}mm`;

        printContainer.style.fontSize = `${printer.fontSize}px`;
        printContainer.style.fontFamily = printer.fontFamily;
        printContainer.style.color = printer.fontColor;
        printContainer.style.fontWeight = printer.boldText ? 'bold' : 'normal';
        printContainer.style.fontStyle = printer.italicText ? 'italic' : 'normal';
        printContainer.style.marginTop = `${printer.marginTop}mm`;
        printContainer.style.marginBottom = `${printer.marginBottom}mm`;
        printContainer.style.marginLeft = `${printer.marginLeft}mm`;
        printContainer.style.marginRight = `${printer.marginRight}mm`;
        printContainer.style.backgroundColor = printer.backgroundColor;
        printContainer.style.transform = `rotate(${printer.rotation}deg)`;

        if (printer.labelBorder) {
          printContainer.style.border = `1px solid ${printer.borderColor}`;
        }
        if (printer.cutLineEnabled) {
          printContainer.style.borderStyle = 'dotted';
        }
        if (printer.customImageEnabled && tenantImage) {
          const logo = document.createElement('img');
          logo.src = tenantImage;
          logo.style.position = 'absolute';
          logo.style.width = `${printer.logoWidth}px`;
          logo.style.height = `${printer.logoHeight}px`;
          logo.style.top = `${printer.logoTop}px`;
          logo.style.left = `${printer.logoLeft}px`;
          logo.style.opacity = `${printer.imageOpacity}`;
          printContainer.appendChild(logo);
        }
      }

      // Clona o conteúdo e aplica à área de impressão
      for (let i = 0; i < quantity; i++) {
        const clone = componentRef.current?.cloneNode(true);
        if (clone) {
          const element = clone as HTMLElement;
          element.style.height = '100%';
          element.style.width = '100%';
          printContainer.appendChild(element);
        }
      }

      document.body.appendChild(printContainer);
      return printContainer;
    },
    documentTitle: 'Etiquetas',
    onAfterPrint: () => {
      const printContainer = document.getElementById('print-container');
      if (printContainer) document.body.removeChild(printContainer);
      registerPrint();
    },
  });

  const registerPrint = async () => {
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct?.id,
          quantity,
          lotNumber: batchNumber,
          timestamp,
        }),
      });

      if (response.ok) {
        toast.success('Impressão registrada com sucesso!');
      } else {
        toast.error('Erro ao registrar a impressão');
      }
    } catch (error) {
      toast.error('Erro ao registrar impressão');
    }
  };

  const handleAddField = () => {
    if (newField) {
      setFields([...fields, newField]);
      setNewField(''); // Limpa o campo após adicionar
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
                className="w-85 border-gray-400 mb-4 flex flex-col justify-between space-y-3 border-2 border-dashed p-4 text-left"
              >
                <div className="content-to-print flex flex-col items-start">
                  {tenantImage && (
                    <Image
                      src={tenantImage}
                      alt="Logo"
                      width={printerConfig[0]?.logoWidth || 48}
                      height={printerConfig[0]?.logoHeight || 48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <h3 className="product-name">
                    {selectedProduct ? selectedProduct.name : 'Produto'}
                  </h3>
                  <div className="divider"></div>

                  {selectedProduct?.ambientDateTime && (
                    <p>Ambientação: {formatDateTime(selectedProduct.ambientDateTime)}</p>
                  )}

                  {selectedProduct?.expirationDate && (
                    <p>Validade: {formatDateTime(selectedProduct.expirationDate)}</p>
                  )}

                  {fields.map((field, index) => (
                    <p key={index}>{field} </p>
                  ))}
                </div>
              </div>
            </Card>

            <div>
              <div className="mb-4">
                <Label>Selecionar Impressora</Label>
                <Select
                  onValueChange={(value) => setSelectedPrinter(value)}
                  defaultValue={printerConfig[0]?.id || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma impressora" />
                  </SelectTrigger>
                  <SelectContent>
                    {printerConfig.map((printer) => (
                      <SelectItem key={printer.id} value={printer.id}>
                        {printer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {selectedCategory && filteredProducts.length > 0 && (
                <ProductSelect
                  products={filteredProducts}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                />
              )}

              <div className="mt-4">
                <Label htmlFor="new-field">Adicionar Novo Campo:</Label>
                <Input
                  id="new-field"
                  value={newField}
                  onChange={(e) => setNewField(e.target.value)}
                  placeholder="Digite o nome do campo"
                />
                <Button className="mt-2" onClick={handleAddField}>
                  Adicionar Campo
                </Button>
              </div>

              <Button onClick={() => setModalOpen(true)} className="mt-4 w-full text-white">
                <Printer className="mr-2 h-4 w-4" /> Imprimir Etiqueta
              </Button>
            </div>
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-graydark text-white">
              <DialogHeader>
                <DialogTitle>Configurações de Impressão</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="quantity-input">Quantidade de Etiquetas</Label>
                <Input
                  id="quantity-input"
                  type="number"
                  value={quantity.toString()}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
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

// Componente para Seleção de Categoria
const CategorySelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
}) => (
  <div>
    <Label htmlFor="category-select">Selecione uma Categoria</Label>
    <Select onValueChange={(value) => setSelectedCategory(value)}>
      <SelectTrigger id="category-select">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Componente para Seleção de Produto
const ProductSelect = ({
  products,
  selectedProduct,
  setSelectedProduct,
}: {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}) => (
  <div>
    <Label htmlFor="product-select">Selecione um Produto</Label>
    <Select
      onValueChange={(value) => {
        const foundProduct = products.find((p) => p.id === value);
        setSelectedProduct(foundProduct ?? null);
      }}
    >
      <SelectTrigger id="product-select">
        <SelectValue placeholder="Selecione um produto" />
      </SelectTrigger>
      <SelectContent>
        {products.map((product) => (
          <SelectItem key={product.id} value={product.id}>
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
