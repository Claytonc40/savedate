import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function GeneralSettings({ config, onChange }: any) {
  const handleChange = (field: string, value: string | number | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paperSize">Tamanho do Papel</Label>
          <Select
            onValueChange={(value) => handleChange('paperSize', value)}
            defaultValue={config?.paperSize || ''}
          >
            <SelectTrigger id="paperSize">
              <SelectValue placeholder="Selecione o tamanho do papel" />
            </SelectTrigger>
            <SelectContent className="bg-meta-6 text-white">
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="A5">A5</SelectItem>
              <SelectItem value="Letter">Carta</SelectItem>
              <SelectItem value="Custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="numberOfLabelsPerPage">Etiquetas por Página</Label>
          <Input
            id="numberOfLabelsPerPage"
            type="number"
            value={config?.numberOfLabelsPerPage || ''}
            onChange={(e) => handleChange('numberOfLabelsPerPage', parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cutLineEnabled">Linha de Corte</Label>
        <Select
          onValueChange={(value) => handleChange('cutLineEnabled', value === 'true')}
          defaultValue={
            config?.cutLineEnabled !== undefined ? config.cutLineEnabled.toString() : 'false'
          }
        >
          <SelectTrigger id="cutLineEnabled">
            <SelectValue placeholder="Habilitar linha de corte?" />
          </SelectTrigger>
          <SelectContent className="bg-meta-6 text-white">
            <SelectItem value="true">Habilitado</SelectItem>
            <SelectItem value="false">Desabilitado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
