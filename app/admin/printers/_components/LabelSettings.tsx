import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function LabelSettings({ config, onChange }: any) {
  const handleChange = (field: string, value: number | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="labelWidth">Largura da Etiqueta (mm)</Label>
          <Input
            id="labelWidth"
            type="number"
            value={config?.labelWidth || ''}
            onChange={(e) => handleChange('labelWidth', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="labelHeight">Altura da Etiqueta (mm)</Label>
          <Input
            id="labelHeight"
            type="number"
            value={config?.labelHeight || ''}
            onChange={(e) => handleChange('labelHeight', parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="horizontalSpacing">Espaçamento Horizontal (mm)</Label>
          <Input
            id="horizontalSpacing"
            type="number"
            value={config?.horizontalSpacing || ''}
            onChange={(e) => handleChange('horizontalSpacing', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="verticalSpacing">Espaçamento Vertical (mm)</Label>
          <Input
            id="verticalSpacing"
            type="number"
            value={config?.verticalSpacing || ''}
            onChange={(e) => handleChange('verticalSpacing', parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Controle de quantidade de etiquetas por linha e por coluna */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="labelsPerRow">Etiquetas por Linha</Label>
          <Input
            id="labelsPerRow"
            type="number"
            value={config?.labelsPerRow || ''}
            onChange={(e) => handleChange('labelsPerRow', parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="labelsPerColumn">Etiquetas por Coluna</Label>
          <Input
            id="labelsPerColumn"
            type="number"
            value={config?.labelsPerColumn || ''}
            onChange={(e) => handleChange('labelsPerColumn', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="useCustomMargins"
          checked={config?.useCustomMargins || false}
          onCheckedChange={(checked: boolean) => handleChange('useCustomMargins', checked)}
        />
        <Label htmlFor="useCustomMargins">Usar Margens Personalizadas</Label>
      </div>
      {config?.useCustomMargins && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marginTop">Margem Superior (mm)</Label>
            <Input
              id="marginTop"
              type="number"
              value={config?.marginTop || ''}
              onChange={(e) => handleChange('marginTop', parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marginBottom">Margem Inferior (mm)</Label>
            <Input
              id="marginBottom"
              type="number"
              value={config?.marginBottom || ''}
              onChange={(e) => handleChange('marginBottom', parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marginLeft">Margem Esquerda (mm)</Label>
            <Input
              id="marginLeft"
              type="number"
              value={config?.marginLeft || ''}
              onChange={(e) => handleChange('marginLeft', parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marginRight">Margem Direita (mm)</Label>
            <Input
              id="marginRight"
              type="number"
              value={config?.marginRight || ''}
              onChange={(e) => handleChange('marginRight', parseFloat(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}
