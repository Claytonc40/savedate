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
import React from 'react';

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
  const [paperSize, setPaperSize] = useState('A4');
  const [labelsPerRow, setLabelsPerRow] = useState(3);
  const [labelsPerColumn, setLabelsPerColumn] = useState(3);
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [customHeight, setCustomHeight] = useState<number | null>(null);
  const [isCustomEnabled, setIsCustomEnabled] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16); // Ajuste global do tamanho da fonte
  const [marginTop, setMarginTop] = useState<number>(10); // Margem superior
  const [marginBottom, setMarginBottom] = useState<number>(10); // Margem inferior
  const [marginLeft, setMarginLeft] = useState<number>(10); // Margem esquerda
  const [marginRight, setMarginRight] = useState<number>(10); // Margem direita
  const [labelSpacing, setLabelSpacing] = useState<number>(5); // Espaçamento entre as etiquetas
  const [logoWidth, setLogoWidth] = useState<number>(48); // Largura da logo
  const [logoHeight, setLogoHeight] = useState<number>(48); // Altura da logo
  const [logoTop, setLogoTop] = useState<number>(0); // Posição top da logo
  const [logoLeft, setLogoLeft] = useState<number>(0); // Posição left da logo
  const [logoFile, setLogoFile] = useState<File | null>(null); // Arquivo de logo
  const [categorySearch, setCategorySearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products/prints');
        const data = await response.json();
        setCategories(data.categories || []);
        setProducts(data.products || []);
        setTenantImage(data.tenantImage);
      } catch (error) {
        toast.error('Erro ao buscar dados');
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
      setSelectedProduct(null);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handlePrint = useReactToPrint({
    content: () => {
      const printContainer = document.createElement('div');
      printContainer.id = 'print-container';
      if (isCustomEnabled) {
        // Configuração de página e escala da etiqueta para modo personalizado
        printContainer.style.width = `${customWidth ? customWidth : 210}mm`;
        printContainer.style.height = `${customHeight ? customHeight : 297}mm`;
      } else {
        printContainer.style.display = 'grid';
        printContainer.style.gridTemplateColumns = `repeat(${labelsPerRow}, 1fr)`;
        printContainer.style.gridTemplateRows = `repeat(${labelsPerColumn}, 1fr)`;
        printContainer.style.gap = `${labelSpacing}px`; // Espaçamento entre etiquetas
      }

      printContainer.style.fontSize = `${fontSize}px`; // Aplicação do tamanho da fonte global
      printContainer.style.marginTop = `${marginTop}mm`;
      printContainer.style.marginBottom = `${marginBottom}mm`;
      printContainer.style.marginLeft = `${marginLeft}mm`;
      printContainer.style.marginRight = `${marginRight}mm`; // Aplicação das margens externas

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
    pageStyle: `
      @page {
        size: ${
          paperSize === 'Custom' && customWidth && customHeight
            ? `${customWidth}mm ${customHeight}mm`
            : paperSize
        };
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
      }
    `,
    onAfterPrint: () => {
      const printContainer = document.getElementById('print-container');
      if (printContainer) document.body.removeChild(printContainer);
      registerPrint();
    },
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTenantImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
                style={{
                  fontSize: `${fontSize}px`, // Aplicação do tamanho da fonte global no visualizador
                  width: isCustomEnabled && customWidth ? `${customWidth}mm` : 'auto',
                  height: isCustomEnabled && customHeight ? `${customHeight}mm` : 'auto',
                }}
              >
                <div
                  className="content-to-print flex flex-col items-start"
                  style={{ position: 'relative' }}
                >
                  {tenantImage && (
                    <Image
                      src={tenantImage}
                      alt="Logo"
                      width={logoWidth || 48} // Definindo largura da logo
                      height={logoHeight || 48} // Definindo altura da logo
                      className="rounded-full object-cover"
                      style={{
                        position: 'absolute',
                        top: `${logoTop}px`,
                        left: `${logoLeft}px`,
                      }}
                    />
                  )}
                  <h3 className="product-name">
                    {selectedProduct ? selectedProduct.name : 'Produto'}
                  </h3>
                  <div className="divider"></div>

                  {/* Display Ambient Date/Time */}
                  {selectedProduct?.ambientDateTime && (
                    <p>Ambientação: {formatDateTime(selectedProduct.ambientDateTime)}</p>
                  )}

                  {/* Display Expiration Date below Ambient */}
                  {selectedProduct?.expirationDate && (
                    <p>Validade: {formatDateTime(selectedProduct.expirationDate)}</p>
                  )}
                </div>
              </div>
            </Card>

            <div>
              <LabelInput label="Tamanho da Fonte (px)" value={fontSize} setValue={setFontSize} />{' '}
              {/* Campo de ajuste do tamanho da fonte global */}
              <LabelInput
                label="Margem Superior (mm)"
                value={marginTop}
                setValue={setMarginTop}
              />{' '}
              {/* Campo de margem superior */}
              <LabelInput
                label="Margem Inferior (mm)"
                value={marginBottom}
                setValue={setMarginBottom}
              />{' '}
              {/* Campo de margem inferior */}
              <LabelInput
                label="Margem Esquerda (mm)"
                value={marginLeft}
                setValue={setMarginLeft}
              />{' '}
              {/* Campo de margem esquerda */}
              <LabelInput
                label="Margem Direita (mm)"
                value={marginRight}
                setValue={setMarginRight}
              />{' '}
              {/* Campo de margem direita */}
              <LabelInput
                label="Espaçamento entre Etiquetas (mm)"
                value={labelSpacing}
                setValue={setLabelSpacing}
              />{' '}
              {/* Campo de espaçamento entre etiquetas */}
              {/* Campo para upload da logo */}
              <div>
                <Label htmlFor="logo-upload">Upload da Logo da Empresa</Label>
                <Input type="file" id="logo-upload" onChange={handleLogoUpload} />
              </div>
              <LabelInput label="Largura da Logo (px)" value={logoWidth} setValue={setLogoWidth} />{' '}
              {/* Campo para ajustar largura da logo */}
              <LabelInput
                label="Altura da Logo (px)"
                value={logoHeight}
                setValue={setLogoHeight}
              />{' '}
              {/* Campo para ajustar altura da logo */}
              <LabelInput
                label="Posição Superior da Logo (px)"
                value={logoTop}
                setValue={setLogoTop}
              />{' '}
              {/* Campo para ajustar posição superior da logo */}
              <LabelInput
                label="Posição Esquerda da Logo (px)"
                value={logoLeft}
                setValue={setLogoLeft}
              />{' '}
              {/* Campo para ajustar posição esquerda da logo */}
              <div className="mt-4">
                <Label htmlFor="custom-config-checkbox">Habilitar Configuração Personalizada</Label>
                <Input
                  type="checkbox"
                  id="custom-config-checkbox"
                  checked={isCustomEnabled}
                  onChange={(e) => setIsCustomEnabled(e.target.checked)}
                  className="ml-2"
                />
              </div>
              {/* Se as configurações personalizáveis estiverem habilitadas, mostre inputs customizados */}
              {isCustomEnabled ? (
                <>
                  <LabelInput
                    label="Largura da Etiqueta (mm)"
                    value={customWidth}
                    setValue={setCustomWidth}
                  />
                  <LabelInput
                    label="Altura da Etiqueta (mm)"
                    value={customHeight}
                    setValue={setCustomHeight}
                  />
                </>
              ) : (
                <>
                  <LabelInput
                    label="Etiquetas por Linha"
                    value={labelsPerRow}
                    setValue={setLabelsPerRow}
                  />
                  <LabelInput
                    label="Etiquetas por Coluna"
                    value={labelsPerColumn}
                    setValue={setLabelsPerColumn}
                  />
                </>
              )}
              <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
              />
              {selectedCategory && filteredProducts.length > 0 && (
                <ProductSelect
                  products={filteredProducts}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  productSearch={productSearch}
                  setProductSearch={setProductSearch}
                />
              )}
              <Button onClick={() => setModalOpen(true)} className="w-full text-white">
                <Printer className="mr-2 h-4 w-4" /> Imprimir Etiqueta
              </Button>
            </div>
          </div>

          {/* Modal de Configurações de Impressão */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Configurações de Impressão</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity-input">Quantidade de Etiquetas</Label>
                  <NumberInput
                    value={quantity.toString()}
                    onChange={(value) => setQuantity(Number(value))}
                  />
                </div>
                <div>
                  <Label htmlFor="paper-size-select">Tamanho da Folha</Label>
                  <Select onValueChange={(value) => setPaperSize(value)} defaultValue="A4">
                    <SelectTrigger id="paper-size-select">
                      <SelectValue placeholder="Selecione o tamanho da folha" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="A5">A5</SelectItem>
                      <SelectItem value="Letter">Carta</SelectItem>
                      <SelectItem value="Custom">Personalizado</SelectItem>
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

// Componente para Seleção de Categoria
const CategorySelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  categorySearch,
  setCategorySearch,
}: {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  categorySearch: string;
  setCategorySearch: (value: string) => void;
}) => (
  <div>
    <Label htmlFor="category-select">Selecione uma Categoria</Label>
    <Select
      onValueChange={(value) => {
        setSelectedCategory(value);
      }}
    >
      <SelectTrigger id="category-select">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <Input
          placeholder="Buscar categoria..."
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="mb-2"
        />
        {categories
          .filter((category) => category.name.toLowerCase().includes(categorySearch.toLowerCase()))
          .map((category) => (
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
  productSearch,
  setProductSearch,
}: {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  productSearch: string;
  setProductSearch: (value: string) => void;
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
        <Input
          placeholder="Buscar produto..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="mb-2"
        />
        {products
          .filter((product) => product.name.toLowerCase().includes(productSearch.toLowerCase()))
          .map((product) => (
            <SelectItem key={product.id} value={product.id}>
              {product.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
);

// Componente reutilizável para inputs
const LabelInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number | string | null;
  setValue: (value: number) => void;
}) => (
  <div>
    <Label>{label}</Label>
    <Input
      type="number"
      placeholder={`Ex: ${label}`}
      value={value?.toString() || ''}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  </div>
);
