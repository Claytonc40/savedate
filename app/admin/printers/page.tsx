'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BarcodeSettings from './_components/BarcodeSettings';
import FontSettings from './_components/FontSettings';
import GeneralSettings from './_components/GeneralSettings';
import ImageSettings from './_components/ImageSettings';
import LabelSettings from './_components/LabelSettings';
import PrinterConfigPreview from './_components/PrinterConfigPreview';

type PrinterConfig = {
  id: string;
  tenantId: string;
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
  labelsPerRow: number;
  labelsPerColumn: number;
  numberOfLabelsPerPage: number;
  cutLineEnabled: boolean;
  useCustomMargins: boolean;
  logoWidth: number;
  logoHeight: number;
  logoTop: number;
  logoLeft: number;
  lineHeight: number;
  titleAlignment: 'center' | 'left' | 'right' | 'justify';
  bodyAlignment: 'left' | 'right' | 'center' | 'justify';
  titleFontSize: number;
  titleFontFamily: string;
  titleFontColor: string;
  titleBoldText: boolean;
  titleItalicText: boolean;
  titleUnderlineText: boolean;
  titleLineHeight: number;
  bodyFontSize: number;
  bodyFontFamily: string;
  bodyFontColor: string;
  bodyBoldText: boolean;
  bodyItalicText: boolean;
  bodyUnderlineText: boolean;
  bodyLineHeight: number;
};

export default function PrinterConfigPage() {
  const [config, setConfig] = useState<PrinterConfig | null>(null);
  const [configs, setConfigs] = useState<PrinterConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConfigId, setSelectedConfigId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConfigName, setNewConfigName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/printer-config');
      if (!response.ok) throw new Error('Falha ao buscar as configurações');
      const data = await response.json();
      setConfigs(data);
      if (data.length > 0) {
        setSelectedConfigId(data[0].id);
        setConfig(data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar as configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (updatedConfig: PrinterConfig) => {
    try {
      console.log('Salvando configuração:', updatedConfig);
      const response = await fetch('/api/printer-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedConfig,
          titleFontSize: updatedConfig.titleFontSize || 12,
          titleFontFamily: updatedConfig.titleFontFamily || 'Arial',
          titleFontColor: updatedConfig.titleFontColor || '#000000',
          titleBoldText: updatedConfig.titleBoldText ?? false,
          titleItalicText: updatedConfig.titleItalicText ?? false,
          titleUnderlineText: updatedConfig.titleUnderlineText ?? false,
          titleLineHeight: updatedConfig.titleLineHeight || 1.5,
          bodyFontSize: updatedConfig.bodyFontSize || 12,
          bodyFontFamily: updatedConfig.bodyFontFamily || 'Arial',
          bodyFontColor: updatedConfig.bodyFontColor || '#000000',
          bodyBoldText: updatedConfig.bodyBoldText ?? false,
          bodyItalicText: updatedConfig.bodyItalicText ?? false,
          bodyUnderlineText: updatedConfig.bodyUnderlineText ?? false,
          bodyLineHeight: updatedConfig.bodyLineHeight || 1.5,
        }),
      });
      if (!response.ok) throw new Error('Falha ao salvar a configuração');
      setConfig(updatedConfig);
      toast.success('Configuração da impressora salva com sucesso');
    } catch (error) {
      console.error('Erro ao salvar a configuração:', error);
      toast.error('Falha ao salvar a configuração da impressora');
    }
  };

  const handleConfigChange = (updatedConfig: PrinterConfig) => {
    setConfig(updatedConfig);
  };

  const createNewConfig = async () => {
    const newConfig: PrinterConfig = {
      id: '',
      tenantId: '',
      name: newConfigName,
      paperSize: 'A4',
      labelWidth: 100,
      labelHeight: 50,
      marginTop: 10,
      horizontalSpacing: 5,
      verticalSpacing: 5,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      fontSize: 12,
      fontFamily: 'Arial',
      fontColor: '#000000',
      boldText: true,
      italicText: false,
      rotation: 0,
      barcodeEnabled: true,
      barcodeType: 'QR Code',
      barcodePosition: 'Centro',
      labelBorder: true,
      borderColor: '#FF0000',
      backgroundColor: '#FFFFFF',
      customImageEnabled: false,
      imagePosition: 'Esquerda',
      imageOpacity: 1.0,
      labelsPerRow: 3,
      labelsPerColumn: 7,
      numberOfLabelsPerPage: 21,
      cutLineEnabled: true,
      useCustomMargins: true,
      logoWidth: 50,
      logoHeight: 50,
      logoTop: 10,
      logoLeft: 10,
      lineHeight: 1.5,
      titleAlignment: 'center',
      titleFontSize: 16,
      titleFontFamily: 'Arial',
      titleFontColor: '#000000',
      titleBoldText: false,
      titleItalicText: false,
      titleUnderlineText: false,
      titleLineHeight: 1.5,
      bodyAlignment: 'left',
      bodyFontSize: 12,
      bodyFontFamily: 'Arial',
      bodyFontColor: '#000000',
      bodyBoldText: false,
      bodyItalicText: false,
      bodyUnderlineText: false,
      bodyLineHeight: 1.5,
    };

    try {
      const response = await fetch('/api/printer-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a nova configuração');
      }

      const savedConfig = await response.json();
      setConfigs((prevConfigs) => [...prevConfigs, savedConfig]);
      setSelectedConfigId(savedConfig.id);
      setConfig(savedConfig);
      toast.success('Configuração de impressora criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar a nova configuração:', error);
      toast.error('Falha ao criar a nova configuração');
    } finally {
      setIsModalOpen(false);
      setNewConfigName('');
    }
  };

  const deleteConfig = async () => {
    if (!selectedConfigId) return;
    try {
      const response = await fetch(`/api/printer-config/${selectedConfigId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao excluir a configuração');

      setConfigs(configs.filter((config) => config.id !== selectedConfigId));
      setSelectedConfigId(undefined);
      setConfig(null);
      toast.success('Configuração excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir a configuração:', error);
      toast.error('Falha ao excluir a configuração');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleSelectConfig = (configId: string | undefined) => {
    const selectedConfig = configs.find((config) => config.id === configId);
    if (selectedConfig) {
      setConfig(selectedConfig);
      setSelectedConfigId(configId);
    } else {
      setConfig(null);
      setSelectedConfigId(undefined);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <Card className="mx-auto w-full max-w-4xl bg-white dark:bg-boxdark">
        <div className="mb-6">{config && <PrinterConfigPreview config={config} />}</div>
        <CardHeader>
          <CardTitle className="text-black dark:text-bodydark">
            Configurações de Impressora
          </CardTitle>
          <CardDescription className="text-body dark:text-bodydark1">
            Selecione ou crie uma nova configuração de impressora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {configs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                  <div className="mb-4 w-full sm:mb-0 sm:w-3/4">
                    <label
                      htmlFor="config-select"
                      className="mb-2 block text-sm font-medium text-graydark dark:text-bodydark"
                    >
                      Selecione uma configuração existente
                    </label>
                    <Select
                      onValueChange={handleSelectConfig}
                      value={selectedConfigId ?? undefined}
                    >
                      <SelectTrigger
                        id="config-select"
                        className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
                      >
                        <SelectValue placeholder="Selecione uma configuração" />
                      </SelectTrigger>
                      <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        {configs.map((config) => (
                          <SelectItem key={config.id} value={config.id}>
                            {config.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-success text-white hover:bg-success/90 sm:w-auto"
                  >
                    Nova Configuração
                  </Button>
                </div>

                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="flex flex-wrap gap-2 bg-gray-2 p-2 dark:bg-form-input">
                    {['general', 'label', 'font', 'barcode', 'image'].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="border-gray-300 flex-grow basis-[calc(50%-0.25rem)] border px-2 py-1 text-center data-[state=active]:bg-white dark:border-strokedark dark:data-[state=active]:bg-boxdark sm:w-auto sm:flex-grow-0 sm:basis-auto"
                      >
                        {tab === 'general' && 'Geral'}
                        {tab === 'label' && 'Etiqueta'}
                        {tab === 'font' && 'Fonte'}
                        {tab === 'barcode' && 'Código de Barras'}
                        {tab === 'image' && 'Imagem'}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="mt-20">
                    <TabsContent value="general">
                      <GeneralSettings config={config} onChange={handleConfigChange} />
                    </TabsContent>
                    <TabsContent value="label">
                      <LabelSettings config={config} onChange={handleConfigChange} />
                    </TabsContent>
                    <TabsContent value="font">
                      <FontSettings config={config} onChange={handleConfigChange} />
                    </TabsContent>
                    <TabsContent value="barcode">
                      <BarcodeSettings config={config} onChange={handleConfigChange} />
                    </TabsContent>
                    <TabsContent value="image">
                      <ImageSettings config={config} onChange={handleConfigChange} />
                    </TabsContent>
                  </div>
                </Tabs>

                <div className="mt-6 flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button
                    onClick={() => config && saveConfig(config)}
                    className="w-full bg-success text-white hover:bg-success/90 sm:w-auto"
                  >
                    Salvar Configuração
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-full bg-danger text-white hover:bg-danger/90 sm:w-auto"
                  >
                    Excluir Configuração
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold text-black dark:text-bodydark">
                Nenhuma configuração encontrada
              </h2>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full bg-primary text-white hover:bg-primary/90"
              >
                Criar Configuração de Impressora
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white dark:bg-boxdark">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-bodydark">
              Nova Configuração de Impressora
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}
            placeholder="Nome da nova configuração"
            className="mb-4 border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
          />
          <DialogFooter>
            <Button onClick={createNewConfig} className="bg-primary text-white hover:bg-primary/90">
              Criar Configuração
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-white dark:bg-boxdark">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-bodydark">
              Excluir Configuração
            </DialogTitle>
          </DialogHeader>
          <p className="text-body dark:text-bodydark1">
            Tem certeza que deseja excluir esta configuração?
          </p>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={deleteConfig}
              className="bg-danger text-white hover:bg-danger/90"
            >
              Excluir
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-2 text-black dark:bg-form-input dark:text-bodydark"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
