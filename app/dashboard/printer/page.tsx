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
import { Switch } from '@/components/ui/switch';
import { Plus, Printer } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import Loading from '../_components/Loading';

// Função para formatar data e hora
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date
    .toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-'); // Substitui a barra (/) por hífen (-)

  const formattedTime = date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate} ${formattedTime}`;
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
  lineHeight: number;
  titleFontSize: number;
  titleFontFamily: string;
  titleFontColor: string;
  titleBoldText: boolean;
  titleItalicText: boolean;
  titleUnderlineText: boolean;
  titleLineHeight: number;
  bodyAlignment: 'left' | 'center' | 'right' | 'justify';
  titleAlignment: 'left' | 'center' | 'right' | 'justify';
  bodyFontSize: number;
  bodyFontFamily: string;
  bodyFontColor: string;
  bodyBoldText: boolean;
  bodyItalicText: boolean;
  bodyUnderlineText: boolean;
  bodyLineHeight: number;
}

export default function PrintPage() {
  const { data: session } = useSession();
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
  const [selectedPrinter, setSelectedPrinter] = useState<PrinterConfig | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState('');
  const [showPrintedBy, setShowPrintedBy] = useState(false);
  const [showDateMake, setShowDateMake] = useState(false);
  const [dateAgo, setDateAgo] = useState<string | null>(null);

  // Carregar as configurações de impressora do banco de dados
  useEffect(() => {
    const fetchConfigs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/printer-config');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPrinterConfig(data);
          setSelectedPrinter(data[0]); // Seleciona a primeira impressora por padrão
        } else {
          setPrinterConfig([]);
          setSelectedPrinter(null);
        }
      } catch (error) {
        toast.error('Erro ao buscar configurações de impressão');
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  // Carregar produtos
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

  const handlePrinterChange = (printerId: string) => {
    const selected = printerConfig.find((printer) => printer.id === printerId);
    if (selected) {
      setSelectedPrinter(selected);
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

  const handlePrint = useReactToPrint({
    content: () => {
      const printContainer = document.createElement('div');
      printContainer.id = 'print-container';

      const printer = selectedPrinter;

      if (!printer) {
        toast.error('Erro: Impressora não encontrada');
        return printContainer;
      }

      // Configurações de layout da etiqueta
      printContainer.style.display = 'grid';
      printContainer.style.gridTemplateColumns = `repeat(${printer.labelsPerRow || 1}, ${printer.labelWidth || 100}mm)`;
      printContainer.style.gridTemplateRows = `repeat(${printer.labelsPerColumn || 1}, ${printer.labelHeight || 50}mm)`;
      printContainer.style.gap = `${printer.verticalSpacing || 0}mm ${printer.horizontalSpacing || 0}mm`;

      // Configurações de fonte e estilo do corpo da etiqueta
      printContainer.style.fontSize = `${printer.bodyFontSize || 12}px`;
      printContainer.style.fontFamily = printer.bodyFontFamily || 'Arial';
      printContainer.style.color = printer.bodyFontColor || '#000000';
      printContainer.style.fontWeight = printer.bodyBoldText ? 'bold' : 'normal';
      printContainer.style.fontStyle = printer.bodyItalicText ? 'italic' : 'normal';
      printContainer.style.backgroundColor = printer.backgroundColor || '#FFFFFF';
      printContainer.style.transform = `rotate(${printer.rotation || 0}deg)`;
      printContainer.style.lineHeight = `${printer.bodyLineHeight || 1.5}`; // Espaçamento do corpo

      if (printer.cutLineEnabled) {
        printContainer.style.borderStyle = 'dotted';
      }

      // Configuração da imagem/logo
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

      // Clone o conteúdo que será impresso
      for (let i = 0; i < quantity; i++) {
        const clone = componentRef.current?.cloneNode(true);
        if (clone) {
          const element = clone as HTMLElement;
          element.style.height = `${printer.labelHeight}mm`;
          element.style.width = `${printer.labelWidth}mm`;

          // Aplicando o espaçamento entre linhas da configuração do banco de dados
          element.style.lineHeight = `${printer.bodyLineHeight || 1.5}`; // Espaçamento entre linhas

          const pageContainer = document.createElement('div');
          pageContainer.style.marginTop = `${printer.marginTop}mm`;
          pageContainer.style.marginBottom = `${printer.marginBottom}mm`;
          pageContainer.style.marginLeft = `${printer.marginLeft}mm`;
          pageContainer.style.marginRight = `${printer.marginRight}mm`;
          pageContainer.style.display = 'grid';
          pageContainer.style.gridTemplateColumns = `repeat(${printer.labelsPerRow}, ${printer.labelWidth}mm)`;
          pageContainer.style.gridTemplateRows = `repeat(${printer.labelsPerColumn}, ${printer.labelHeight}mm)`;
          pageContainer.style.gap = `${printer.verticalSpacing}mm ${printer.horizontalSpacing}mm`;

          pageContainer.appendChild(element);

          if ((i + 1) % (printer.labelsPerRow * printer.labelsPerColumn) === 0) {
            pageContainer.style.pageBreakAfter = 'always';
          }

          printContainer.appendChild(pageContainer);
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

  const handleAddField = () => {
    if (newField) {
      setFields([...fields, newField]);
      setNewField('');
    }
  };
  // Função para mostrar a data de manipulação
  const handleShowDateAgo = (checked: boolean | ((prevState: boolean) => boolean)) => {
    setShowDateMake(checked);
    if (checked) {
      const currentDate = new Date()
        .toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-');
      const currentTime = new Date().toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
      });
      setDateAgo(`${currentDate} ${currentTime}`);
    }
  };
  return (
    <div className="container mx-auto bg-gray-3 p-4 dark:bg-boxdark">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow dark:bg-boxdark-2">
            <h1 className="text-2xl font-bold text-black dark:text-bodydark">
              Impressão de Validade
            </h1>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div className="flex w-full items-center justify-center p-4">
              <Card
                ref={componentRef}
                className="overflow-hidden"
                style={{
                  width: `${selectedPrinter?.labelWidth || 100}mm`,
                  height: `${selectedPrinter?.labelHeight || 50}mm`,
                  padding: `${selectedPrinter?.marginTop || 10}px ${selectedPrinter?.marginRight || 10}px ${selectedPrinter?.marginBottom || 10}px ${selectedPrinter?.marginLeft || 10}px`,
                  backgroundColor: selectedPrinter?.backgroundColor || '#FFFFFF',
                  border: selectedPrinter?.labelBorder
                    ? `1px solid ${selectedPrinter?.borderColor || '#000000'}`
                    : 'none',
                  fontFamily: selectedPrinter?.bodyFontFamily || 'Arial',
                  fontSize: `${selectedPrinter?.bodyFontSize || 12}px`,
                  fontWeight: selectedPrinter?.bodyBoldText ? 'bold' : 'normal',
                  fontStyle: selectedPrinter?.bodyItalicText ? 'italic' : 'normal',
                  lineHeight: `${selectedPrinter?.bodyLineHeight || 1.5}`,
                  color: selectedPrinter?.bodyFontColor || '#000000',
                  textAlign: selectedPrinter?.bodyAlignment || 'left',
                }}
              >
                <h3
                  className="product-name font-semibold text-black dark:text-bodydark"
                  style={{
                    fontSize: `${selectedPrinter?.titleFontSize || 16}px`,
                    fontWeight: selectedPrinter?.titleBoldText ? 'bold' : 'normal',
                    fontStyle: selectedPrinter?.titleItalicText ? 'italic' : 'normal',
                    textDecoration: selectedPrinter?.titleUnderlineText ? 'underline' : 'none',
                    lineHeight: `${selectedPrinter?.titleLineHeight || 1.5}`,
                    fontFamily: selectedPrinter?.titleFontFamily || 'Arial',
                    color: selectedPrinter?.titleFontColor || '#000000',
                    textAlign: selectedPrinter?.titleAlignment || 'center',
                  }}
                >
                  {selectedProduct ? selectedProduct.name : 'Produto'}
                </h3>

                <div className="bt-2 mb-2 w-full border-t border-stroke dark:border-strokedark"></div>
                {showDateMake && dateAgo && (
                  <p
                    style={{
                      textAlign: selectedPrinter?.bodyAlignment || 'left',
                    }}
                  >
                    Manipulação: {dateAgo}
                  </p>
                )}
                {selectedProduct?.ambientDateTime && (
                  <p style={{ textAlign: selectedPrinter?.bodyAlignment || 'left' }}>
                    Ambientação: {formatDateTime(selectedProduct.ambientDateTime)}
                  </p>
                )}
                {selectedProduct?.expirationDate && (
                  <p style={{ textAlign: selectedPrinter?.bodyAlignment || 'left' }}>
                    Validade: {formatDateTime(selectedProduct.expirationDate)}
                  </p>
                )}
                {fields.map((field, index) => (
                  <p key={index} style={{ textAlign: selectedPrinter?.bodyAlignment || 'left' }}>
                    {field}
                  </p>
                ))}
                {showPrintedBy && session?.user?.name && (
                  <p
                    style={{
                      textAlign: selectedPrinter?.bodyAlignment || 'left',
                    }}
                  >
                    Impresso por: {session.user.name}
                  </p>
                )}
              </Card>
            </div>

            <Card className="bg-white dark:bg-boxdark-2">
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="printed-by-switch" className="text-black dark:text-bodydark">
                    Mostrar quem Imprimiu
                  </Label>
                  <Switch
                    id="printed-by-switch"
                    checked={showPrintedBy}
                    onCheckedChange={setShowPrintedBy}
                    className="bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="printed-by-switch" className="text-black dark:text-bodydark">
                    Exibir data de Manipulação
                  </Label>
                  <Switch
                    id="printed-by-switch"
                    checked={showDateMake}
                    onCheckedChange={handleShowDateAgo}
                    className="bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
                  />
                </div>

                <div>
                  <Label className="text-black dark:text-bodydark">Selecionar Impressora</Label>
                  <Select
                    onValueChange={handlePrinterChange}
                    defaultValue={selectedPrinter?.id || ''}
                  >
                    <SelectTrigger className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark">
                      <SelectValue placeholder="Selecione uma impressora" />
                    </SelectTrigger>
                    <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      {printerConfig.map((printer) => (
                        <SelectItem
                          key={printer.id}
                          value={printer.id}
                          className="text-black dark:text-bodydark"
                        >
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

                <div>
                  <Label htmlFor="new-field" className="text-black dark:text-bodydark">
                    Adicionar Novo Campo:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="new-field"
                      value={newField}
                      onChange={(e) => setNewField(e.target.value)}
                      placeholder="Digite o nome do campo"
                      className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
                    />
                    <Button
                      onClick={handleAddField}
                      className="bg-success text-white hover:bg-success/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-success text-white hover:bg-success/90"
                >
                  <Printer className="mr-2 h-4 w-4" /> Imprimir Etiqueta
                </Button>
              </div>
            </Card>
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-white dark:bg-boxdark">
              <DialogHeader>
                <DialogTitle className="text-black dark:text-bodydark">
                  Configurações de Impressão
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="quantity-input" className="text-black dark:text-bodydark">
                  Quantidade de Etiquetas
                </Label>
                <Input
                  id="quantity-input"
                  type="number"
                  value={quantity.toString()}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
                />
              </div>
              <DialogFooter>
                <Button onClick={handlePrint} className="bg-success text-white hover:bg-success/90">
                  Confirmar Impressão
                </Button>
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
    <Label htmlFor="category-select" className="text-black dark:text-bodydark">
      Selecione uma Categoria
    </Label>
    <Select onValueChange={(value) => setSelectedCategory(value)}>
      <SelectTrigger
        id="category-select"
        className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
      >
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
            className="text-black dark:text-bodydark"
          >
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
    <Label htmlFor="product-select" className="text-black dark:text-bodydark">
      Selecione um Produto
    </Label>
    <Select
      onValueChange={(value) => {
        const foundProduct = products.find((p) => p.id === value);
        setSelectedProduct(foundProduct ?? null);
      }}
    >
      <SelectTrigger
        id="product-select"
        className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
      >
        <SelectValue placeholder="Selecione um produto" />
      </SelectTrigger>
      <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        {products.map((product) => (
          <SelectItem key={product.id} value={product.id} className="text-black dark:text-bodydark">
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
