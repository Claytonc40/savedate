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

export default function FontSettings({ config, onChange }: any) {
  const handleChange = (field: string, value: string | number | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fontSize">Tamanho da Fonte</Label>
          <Input
            id="fontSize"
            type="number"
            value={config?.fontSize || ''}
            onChange={(e) => handleChange('fontSize', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Família da Fonte</Label>
          <Select
            onValueChange={(value) => handleChange('fontFamily', value)}
            defaultValue={config?.fontFamily || ''}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Selecione a família da fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier">Courier</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontColor">Cor da Fonte</Label>
        <Input
          id="fontColor"
          type="color"
          value={config?.fontColor || '#000000'}
          onChange={(e) => handleChange('fontColor', e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="boldText"
            checked={config?.boldText || false}
            onCheckedChange={(checked) => handleChange('boldText', checked)}
          />
          <Label htmlFor="boldText">Negrito</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="italicText"
            checked={config?.italicText || false}
            onCheckedChange={(checked) => handleChange('italicText', checked)}
          />
          <Label htmlFor="italicText">Itálico</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rotation">Rotação do Texto (graus)</Label>
        <Input
          id="rotation"
          type="number"
          value={config?.rotation || 0}
          onChange={(e) => handleChange('rotation', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
