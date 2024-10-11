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
import React from 'react';

export default function ImageSettings({ config, onChange }: any) {
  const handleChange = (field: string, value: string | number | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="customImageEnabled"
          checked={config?.customImageEnabled || false}
          onCheckedChange={(checked) => handleChange('customImageEnabled', checked)}
        />
        <Label htmlFor="customImageEnabled">Habilitar Imagem Personalizada</Label>
      </div>
      {config?.customImageEnabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="imagePosition">Posição da Imagem</Label>
            <Select
              onValueChange={(value) => handleChange('imagePosition', value)}
              defaultValue={config?.imagePosition || ''}
            >
              <SelectTrigger id="imagePosition">
                <SelectValue placeholder="Selecione a posição da imagem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Left">Esquerda</SelectItem>
                <SelectItem value="Right">Direita</SelectItem>
                <SelectItem value="Center">Centro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageOpacity">Opacidade da Imagem</Label>
            <Input
              id="imageOpacity"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config?.imageOpacity || 1.0}
              onChange={(e) => handleChange('imageOpacity', parseFloat(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoWidth">Largura da Logo (mm)</Label>
              <Input
                id="logoWidth"
                type="number"
                value={config?.logoWidth || 50}
                onChange={(e) => handleChange('logoWidth', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoHeight">Altura da Logo (mm)</Label>
              <Input
                id="logoHeight"
                type="number"
                value={config?.logoHeight || 50}
                onChange={(e) => handleChange('logoHeight', parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoTop">Posição Superior da Logo (mm)</Label>
              <Input
                id="logoTop"
                type="number"
                value={config?.logoTop || 10}
                onChange={(e) => handleChange('logoTop', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoLeft">Posição Esquerda da Logo (mm)</Label>
              <Input
                id="logoLeft"
                type="number"
                value={config?.logoLeft || 10}
                onChange={(e) => handleChange('logoLeft', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
