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
import React from 'react';

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
  labelsPerRow: number; // Novo campo
  labelsPerColumn: number; // Novo campo
  numberOfLabelsPerPage: number;
  cutLineEnabled: boolean;
  useCustomMargins: boolean;
  logoWidth: number;
  logoHeight: number;
  logoTop: number;
  logoLeft: number;
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
      toast.error('Falha ao carregar as configurações da impressora');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (updatedConfig: PrinterConfig) => {
    try {
      const response = await fetch('/api/printer-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      });
      if (!response.ok) throw new Error('Falha ao salvar a configuração');
      setConfig(updatedConfig);
      toast.success('Configuração da impressora salva com sucesso');
    } catch (error) {
      console.error('Erro ao salvar a configuração:', error);
      toast.error('Falha ao salvar a configuração da impressora');
    }
  };

  const createNewConfig = async () => {
    const newConfig: PrinterConfig = {
      id: '', // ID será gerado pelo backend
      tenantId: '', // O tenantId será atribuído no backend
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
      labelsPerRow: 3, // Padrão 3 etiquetas por linha
      labelsPerColumn: 7, // Padrão 7 etiquetas por coluna
      numberOfLabelsPerPage: 21,
      cutLineEnabled: true,
      useCustomMargins: true,
      logoWidth: 50,
      logoHeight: 50,
      logoTop: 10,
      logoLeft: 10,
    };

    try {
      const response = await fetch('/api/printer-config', {
        method: 'POST', // POST para criar nova configuração
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
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Configurações de Impressora</CardTitle>
          <CardDescription>Selecione ou crie uma nova configuração de impressora.</CardDescription>
        </CardHeader>
        <CardContent>
          {configs.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="w-3/4">
                  <label
                    htmlFor="config-select"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Selecione uma configuração existente
                  </label>
                  <Select onValueChange={handleSelectConfig} value={selectedConfigId ?? undefined}>
                    <SelectTrigger id="config-select">
                      <SelectValue placeholder="Selecione uma configuração" />
                    </SelectTrigger>
                    <SelectContent>
                      {configs.map((config) => (
                        <SelectItem key={config.id} value={config.id}>
                          {config.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>Nova Configuração</Button>
              </div>

              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="label">Etiqueta</TabsTrigger>
                  <TabsTrigger value="font">Fonte</TabsTrigger>
                  <TabsTrigger value="barcode">Código de Barras</TabsTrigger>
                  <TabsTrigger value="image">Imagem</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <GeneralSettings config={config} onChange={setConfig} />
                </TabsContent>
                <TabsContent value="label">
                  <LabelSettings config={config} onChange={setConfig} />
                </TabsContent>
                <TabsContent value="font">
                  <FontSettings config={config} onChange={setConfig} />
                </TabsContent>
                <TabsContent value="barcode">
                  <BarcodeSettings config={config} onChange={setConfig} />
                </TabsContent>
                <TabsContent value="image">
                  <ImageSettings config={config} onChange={setConfig} />
                </TabsContent>
              </Tabs>
              <div className="mt-6 flex justify-end space-x-4">
                <Button onClick={() => config && saveConfig(config)}>Salvar Configuração</Button>
                <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                  Excluir Configuração
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold">Nenhuma configuração encontrada</h2>
              <Button onClick={() => setIsModalOpen(true)} className="mt-4 w-full">
                Criar Configuração de Impressora
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal para adicionar nova configuração */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Configuração de Impressora</DialogTitle>
          </DialogHeader>
          <Input
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}
            placeholder="Nome da nova configuração"
            className="mb-4"
          />
          <DialogFooter>
            <Button onClick={createNewConfig}>Criar Configuração</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Configuração</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir esta configuração?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={deleteConfig}>
              Excluir
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
