import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

export default function BarcodeSettings({ config, onChange }: any) {
  const handleChange = (field: string, value: string | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="barcodeEnabled"
          checked={config?.barcodeEnabled || false}
          onCheckedChange={(checked) => handleChange('barcodeEnabled', checked)}
        />
        <Label htmlFor="barcodeEnabled">Habilitar Código de Barras</Label>
      </div>
      {config?.barcodeEnabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="barcodeType">Tipo de Código de Barras</Label>
            <Select
              onValueChange={(value) => handleChange('barcodeType', value)}
              defaultValue={config?.barcodeType || ''}
            >
              <SelectTrigger id="barcodeType">
                <SelectValue placeholder="Selecione o tipo de código de barras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QR Code">QR Code</SelectItem>
                <SelectItem value="Code 128">Code 128</SelectItem>
                <SelectItem value="EAN-13">EAN-13</SelectItem>
                <SelectItem value="UPC-A">UPC-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="barcodePosition">Posição do Código de Barras</Label>
            <Select
              onValueChange={(value) => handleChange('barcodePosition', value)}
              defaultValue={config?.barcodePosition || ''}
            >
              <SelectTrigger id="barcodePosition">
                <SelectValue placeholder="Selecione a posição do código de barras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Above">Acima</SelectItem>
                <SelectItem value="Below">Abaixo</SelectItem>
                <SelectItem value="Center">Centro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
