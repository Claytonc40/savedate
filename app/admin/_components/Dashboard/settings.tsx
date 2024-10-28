'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CompanySettings {
  companyName: string;
  emailDefault: string;
  phoneDefault: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  autoRenew: boolean;
}

interface SubscriptionData {
  planName: string;
  maxProducts: number;
  maxUsers: number;
  licenseExpirationDate: string;
  autoRenew: boolean;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}

const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export default function CompanyConfiguration() {
  const [settings, setSettings] = useState<CompanySettings>({
    companyName: '',
    emailDefault: '',
    phoneDefault: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    autoRenew: false,
  });

  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsResponse = await fetch('/api/company/settings');
        const settingsData = await settingsResponse.json();
        setSettings({
          companyName: settingsData.name,
          emailDefault: settingsData.emailDefault,
          phoneDefault: settingsData.phoneDefault,
          street: settingsData.street,
          number: settingsData.number,
          complement: settingsData.complement,
          neighborhood: settingsData.neighborhood,
          city: settingsData.city,
          state: settingsData.state,
          zipCode: settingsData.zipCode,
          autoRenew: settingsData.autoRenew,
        });

        const subscriptionResponse = await fetch('/api/company/subscription-plan');
        const subscriptionData = await subscriptionResponse.json();
        setSubscriptionData({
          planName: subscriptionData.plan.name,
          maxProducts: subscriptionData.plan.maxProducts,
          maxUsers: subscriptionData.plan.maxUsers,
          licenseExpirationDate: subscriptionData.endDate,
          autoRenew: settingsData.autoRenew,
        });

        const historyResponse = await fetch('/api/company/payment-history');
        const historyData = await historyResponse.json();
        setPaymentHistory(historyData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load company data');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = async (checked: boolean) => {
    setSettings((prev) => ({ ...prev, autoRenew: checked }));
    try {
      await fetch('/api/company/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, autoRenew: checked }),
      });
      toast.success('Auto-renew setting updated successfully');
    } catch (error) {
      console.error('Error updating auto-renew:', error);
      toast.error('Failed to update auto-renew setting');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/company/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      toast.success('Company settings saved successfully');
    } catch (error) {
      console.error('Error saving company settings:', error);
      toast.error('Failed to save company settings');
    }
  };

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-4xl bg-white dark:bg-boxdark">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-bodydark">
          Configurações da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="subscription">Assinatura</TabsTrigger>
            <TabsTrigger value="history">Histórico de Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-black dark:text-bodydark">
                  Nome da Empresa
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                  placeholder="Digite o nome da sua empresa"
                  className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailDefault" className="text-black dark:text-bodydark">
                  Email
                </Label>
                <Input
                  id="emailDefault"
                  name="emailDefault"
                  type="email"
                  value={settings.emailDefault}
                  onChange={handleInputChange}
                  placeholder="email@empresa.com"
                  className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneDefault" className="text-black dark:text-bodydark">
                  Telefone
                </Label>
                <Input
                  id="phoneDefault"
                  name="phoneDefault"
                  value={settings.phoneDefault}
                  onChange={handleInputChange}
                  placeholder="(XX) XXXXX-XXXX"
                  className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                />
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-black dark:text-bodydark">
                  Endereço
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-black dark:text-bodydark">
                      Rua
                    </Label>
                    <Input
                      id="street"
                      name="street"
                      value={settings.street}
                      onChange={handleInputChange}
                      placeholder="Nome da rua"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number" className="text-black dark:text-bodydark">
                      Número
                    </Label>
                    <Input
                      id="number"
                      name="number"
                      value={settings.number}
                      onChange={handleInputChange}
                      placeholder="Número"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement" className="text-black dark:text-bodydark">
                      Complemento
                    </Label>
                    <Input
                      id="complement"
                      name="complement"
                      value={settings.complement}
                      onChange={handleInputChange}
                      placeholder="Apto, Sala, etc. (opcional)"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="text-black dark:text-bodydark">
                      Bairro
                    </Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={settings.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Nome do bairro"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-black dark:text-bodydark">
                      Cidade
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={settings.city}
                      onChange={handleInputChange}
                      placeholder="Nome da cidade"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-black dark:text-bodydark">
                      Estado
                    </Label>
                    <Select
                      value={settings.state}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          state: value,
                        }))
                      }
                    >
                      <SelectTrigger className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-meta-6 dark:text-white">
                        {brazilianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-black dark:text-bodydark">
                      CEP
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={settings.zipCode}
                      onChange={handleInputChange}
                      placeholder="XXXXX-XXX"
                      className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-meta-7 text-white hover:bg-primary/90">
                Salvar Configurações
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-black dark:text-bodydark">Plano de Assinatura</Label>
                <Input
                  value={subscriptionData?.planName || ''}
                  readOnly
                  className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black dark:text-bodydark">
                  Data de Expiração da Licença
                </Label>
                <Input
                  value={
                    subscriptionData?.licenseExpirationDate
                      ? formatExpirationDate(subscriptionData.licenseExpirationDate)
                      : ''
                  }
                  readOnly
                  className="border-stroke bg-gray-2 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={settings.autoRenew} onCheckedChange={handleSwitchChange} />

                <Label htmlFor="autoRenew" className="text-black dark:text-bodydark">
                  Renovação Automática
                </Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-bodydark">
                Histórico de Pagamentos
              </h3>
              <div className="space-y-2">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded bg-gray-2 p-2 dark:bg-boxdark-2"
                  >
                    <span className="text-black dark:text-bodydark">{payment.date}</span>
                    <span className="text-black dark:text-bodydark">
                      {payment.currency} {payment.amount.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm ${
                        payment.status === 'paid' ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
