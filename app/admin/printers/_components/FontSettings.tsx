import { Card } from '@/components/ui/card';
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
    <div className="space-y-8 rounded-lg bg-gray-3 p-6 dark:bg-boxdark">
      <Card className="bg-white p-6 dark:bg-boxdark-2">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-bodydark">
          Configurações de Título
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="titleFontSize" className="text-black dark:text-bodydark">
              Tamanho da Fonte do Título
            </Label>
            <Input
              id="titleFontSize"
              type="number"
              value={config?.titleFontSize || ''}
              onChange={(e) => handleChange('titleFontSize', parseFloat(e.target.value))}
              className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="titleFontFamily" className="text-black dark:text-bodydark">
              Família da Fonte do Título
            </Label>
            <Select
              onValueChange={(value) => handleChange('titleFontFamily', value)}
              defaultValue={config?.titleFontFamily || ''}
            >
              <SelectTrigger
                id="titleFontFamily"
                className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
              >
                <SelectValue placeholder="Selecione a família da fonte" />
              </SelectTrigger>
              <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark dark:text-white">
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier">Courier</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="titleFontColor" className="text-black dark:text-bodydark">
            Cor da Fonte do Título
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="titleFontColor"
              type="color"
              value={config?.titleFontColor || '#000000'}
              onChange={(e) => handleChange('titleFontColor', e.target.value)}
              className="h-10 w-10 border-stroke bg-gray-2 p-1 dark:border-form-strokedark dark:bg-form-input"
            />
            <span className="text-black dark:text-bodydark">
              {config?.titleFontColor || '#000000'}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="titleAlignment" className="text-black dark:text-bodydark">
            Alinhamento do Título
          </Label>
          <Select
            onValueChange={(value) => handleChange('titleAlignment', value)}
            defaultValue={config?.titleAlignment || 'center'}
          >
            <SelectTrigger
              id="titleAlignment"
              className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
            >
              <SelectValue placeholder="Selecione o alinhamento" />
            </SelectTrigger>
            <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark dark:text-white">
              <SelectItem value="left">Esquerda</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Direita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seção de Negrito, Itálico e Sublinhado com leve cor de fundo */}
        <div className="mt-4 flex flex-wrap gap-4 rounded-md">
          <div className="flex items-center space-x-2">
            <Switch
              id="titleBoldText"
              checked={config?.titleBoldText || false}
              onCheckedChange={(checked) => handleChange('titleBoldText', checked)}
            />
            <Label htmlFor="titleBoldText" className="text-black dark:text-bodydark">
              Negrito
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="titleItalicText"
              checked={config?.titleItalicText || false}
              onCheckedChange={(checked) => handleChange('titleItalicText', checked)}
            />
            <Label htmlFor="titleItalicText" className="text-black dark:text-bodydark">
              Itálico
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="titleUnderlineText"
              checked={config?.titleUnderlineText || false}
              onCheckedChange={(checked) => handleChange('titleUnderlineText', checked)}
            />
            <Label htmlFor="titleUnderlineText" className="text-black dark:text-bodydark">
              Sublinhado
            </Label>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="titleLineHeight" className="text-black dark:text-bodydark">
            Espaçamento entre Linhas do Título
          </Label>
          <Input
            id="titleLineHeight"
            type="number"
            step="0.1"
            value={config?.titleLineHeight || 1.5}
            onChange={(e) => handleChange('titleLineHeight', parseFloat(e.target.value))}
            className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
          />
        </div>
      </Card>

      <Card className="bg-white p-6 dark:bg-boxdark-2">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-bodydark">
          Configurações do Corpo da Etiqueta
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bodyFontSize" className="text-black dark:text-bodydark">
              Tamanho da Fonte
            </Label>
            <Input
              id="bodyFontSize"
              type="number"
              value={config?.bodyFontSize || ''}
              onChange={(e) => handleChange('bodyFontSize', parseFloat(e.target.value))}
              className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bodyFontFamily" className="text-black dark:text-bodydark">
              Família da Fonte
            </Label>
            <Select
              onValueChange={(value) => handleChange('bodyFontFamily', value)}
              defaultValue={config?.bodyFontFamily || ''}
            >
              <SelectTrigger
                id="bodyFontFamily"
                className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
              >
                <SelectValue placeholder="Selecione a família da fonte" />
              </SelectTrigger>
              <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark dark:text-white">
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier">Courier</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="bodyFontColor" className="text-black dark:text-bodydark">
            Cor da Fonte
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="bodyFontColor"
              type="color"
              value={config?.bodyFontColor || '#000000'}
              onChange={(e) => handleChange('bodyFontColor', e.target.value)}
              className="h-10 w-10 border-stroke bg-gray-2 p-1 dark:border-form-strokedark dark:bg-form-input"
            />
            <span className="text-black dark:text-bodydark">
              {config?.bodyFontColor || '#000000'}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="bodyAlignment" className="text-black dark:text-bodydark">
            Alinhamento do Corpo
          </Label>
          <Select
            onValueChange={(value) => handleChange('bodyAlignment', value)}
            defaultValue={config?.bodyAlignment || 'left'}
          >
            <SelectTrigger
              id="bodyAlignment"
              className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
            >
              <SelectValue placeholder="Selecione o alinhamento" />
            </SelectTrigger>
            <SelectContent className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark dark:text-white">
              <SelectItem value="left">Esquerda</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Direita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seção de Negrito, Itálico e Sublinhado com leve cor de fundo */}
        <div className="mt-4 flex flex-wrap gap-4 rounded-md">
          <div className="flex items-center space-x-2">
            <Switch
              id="bodyBoldText"
              checked={config?.bodyBoldText || false}
              onCheckedChange={(checked) => handleChange('bodyBoldText', checked)}
            />
            <Label htmlFor="bodyBoldText" className="text-black dark:text-bodydark">
              Negrito
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="bodyItalicText"
              checked={config?.bodyItalicText || false}
              onCheckedChange={(checked) => handleChange('bodyItalicText', checked)}
            />
            <Label htmlFor="bodyItalicText" className="text-black dark:text-bodydark">
              Itálico
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="bodyUnderlineText"
              checked={config?.bodyUnderlineText || false}
              onCheckedChange={(checked) => handleChange('bodyUnderlineText', checked)}
            />
            <Label htmlFor="bodyUnderlineText" className="text-black dark:text-bodydark">
              Sublinhado
            </Label>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="bodyLineHeight" className="text-black dark:text-bodydark">
            Espaçamento entre Linhas
          </Label>
          <Input
            id="bodyLineHeight"
            type="number"
            value={config?.bodyLineHeight || 1.5}
            onChange={(e) => handleChange('bodyLineHeight', parseFloat(e.target.value))}
            step="0.1"
            className="border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-bodydark"
          />
        </div>
      </Card>
    </div>
  );
}
