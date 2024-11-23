import React from 'react';
import { Wallet, CreditCard, UserCog, UserPlus, Printer, Key } from 'lucide-react';
import AccountBalances from './services/AccountBalances';
import PinReset from './services/PinReset';
import BankProducts from './services/BankProducts';
import PersonalData from './services/PersonalData';
import ClientRegistration from './services/ClientRegistration';
import CardPrinting from './services/CardPrinting';

interface ServiceContentProps {
  serviceId: string;
}

export default function ServiceContent({ serviceId }: ServiceContentProps) {
  const getServiceContent = () => {
    switch (serviceId) {
      case 'saldos':
        return {
          icon: Wallet,
          title: 'Consulta de Saldos',
          content: <AccountBalances />
        };
      case 'pin':
        return {
          icon: Key,
          title: 'Blanqueo de PIN',
          content: <PinReset />
        };
      case 'productos':
        return {
          icon: CreditCard,
          title: 'Productos Bancarios',
          content: <BankProducts />
        };
      case 'datos':
        return {
          icon: UserCog,
          title: 'Datos Personales',
          content: <PersonalData />
        };
      case 'alta':
        return {
          icon: UserPlus,
          title: 'Alta de Clientes',
          content: <ClientRegistration />
        };
      case 'tarjetas':
        return {
          icon: Printer,
          title: 'Impresión de Tarjetas',
          content: <CardPrinting />
        };
      default:
        return null;
    }
  };

  const content = getServiceContent();

  if (!content) {
    return <div>Servicio no disponible</div>;
  }

  const Icon = content.icon;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
        <Icon size={32} className="text-santander-red" />
        <h1 className="text-3xl font-bold">{content.title}</h1>
      </div>
      {content.content}
    </div>
  );
}