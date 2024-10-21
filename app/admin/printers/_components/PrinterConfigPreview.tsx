import { Card } from '@/components/ui/card';
import { FC, useState } from 'react';

type PrinterConfig = {
  id?: string;
  tenantId?: string;
  name?: string;
  paperSize?: string;
  labelWidth: number;
  labelHeight: number;
  marginTop: number;
  horizontalSpacing?: number;
  verticalSpacing?: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number; // Tamanho da fonte para o corpo
  fontFamily: string;
  fontColor: string;
  boldText: boolean;
  italicText: boolean;
  bodyBoldText: boolean; // Novo campo
  bodyItalicText: boolean; // Novo campo
  bodyUnderlineText: boolean; // Novo campo
  bodyFontSize: number; // Novo campo
  bodyFontFamily: string; // Novo campo
  bodyFontColor: string; // Novo campo
  bodyLineHeight: number; // Novo campo
  rotation: number;
  labelBorder: boolean;
  borderColor: string;
  backgroundColor: string;
  lineHeight: number;
  titleAlignment: 'left' | 'right' | 'center' | 'justify';
  bodyAlignment: 'left' | 'right' | 'center' | 'justify';
  titleFontSize: number;
  titleFontFamily: string;
  titleFontColor: string;
  titleBoldText: boolean;
  titleItalicText: boolean;
  titleUnderlineText: boolean;
  titleLineHeight: number;
};

interface PrinterConfigPreviewProps {
  config: PrinterConfig;
}

const PrinterConfigPreview: FC<PrinterConfigPreviewProps> = ({ config }) => {
  const [previewData, setPreviewData] = useState<string[]>([
    'Produção: 16-10-2024 18:01',
    'Ambientação: 16-10-2024 20:01',
    'Vencimento: 17-10-2024 18:01',
  ]);

  return (
    <div className="container mx-auto bg-gray-3 p-6 dark:bg-boxdark">
      <h1 className="mb-8 text-3xl font-bold text-black dark:text-bodydark">
        Pré-visualização da Etiqueta
      </h1>
      <div className="flex items-center justify-center rounded-lg bg-gray-2 p-4 dark:bg-form-input">
        <Card
          className="overflow-hidden"
          style={{
            width: `${config.labelWidth || 100}mm`,
            height: `${config.labelHeight || 50}mm`,
            padding: `${config.marginTop || 10}px ${config.marginRight || 10}px ${config.marginBottom || 10}px ${config.marginLeft || 10}px`,
            backgroundColor: config.backgroundColor || '#FFFFFF',
            border: config.labelBorder ? `1px solid ${config.borderColor || '#000000'}` : 'none',
            transform: `rotate(${config.rotation || 0}deg)`,
            lineHeight: `${config.bodyLineHeight || 1.5}`,
            fontFamily: config.bodyFontFamily || 'Arial',
            fontSize: `${config.bodyFontSize || 12}px`,
            fontWeight: config.bodyBoldText ? 'bold' : 'normal',
            fontStyle: config.bodyItalicText ? 'italic' : 'normal',
            textDecoration: config.bodyUnderlineText ? 'underline' : 'none',
            color: config.bodyFontColor || '#000000',
          }}
        >
          {/* Exibindo o título */}
          <h3
            style={{
              fontSize: `${config.titleFontSize || 16}px`,
              fontWeight: config.titleBoldText ? 'bold' : 'normal',
              fontStyle: config.titleItalicText ? 'italic' : 'normal',
              textDecoration: config.titleUnderlineText ? 'underline' : 'none',
              textAlign: config.titleAlignment || 'center',
              lineHeight: `${config.titleLineHeight || 1.5}`,
              fontFamily: config.titleFontFamily || 'Arial',
              color: config.titleFontColor || '#000000',
            }}
          >
            Título da Etiqueta
          </h3>

          {/* Exibindo o corpo */}
          {previewData.map((data, index) => (
            <p
              key={index}
              className="my-1"
              style={{
                textAlign: config.bodyAlignment || 'center',
                lineHeight: `${config.bodyLineHeight || 1.5}`,
                fontFamily: config.bodyFontFamily || 'Arial',
                fontSize: `${config.bodyFontSize || 12}px`,
                fontWeight: config.bodyBoldText ? 'bold' : 'normal',
                fontStyle: config.bodyItalicText ? 'italic' : 'normal',
                textDecoration: config.bodyUnderlineText ? 'underline' : 'none',
                color: config.bodyFontColor || '#000000',
              }}
            >
              {data}
            </p>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default PrinterConfigPreview;
