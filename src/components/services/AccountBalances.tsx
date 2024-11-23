import React, { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  CreditCard, 
  ArrowDownRight, 
  ArrowUpRight, 
  Building2, 
  ShoppingCart, 
  Banknote, 
  CreditCard as CardIcon,
  Landmark,
  Plane,
  Music,
  Monitor,
  Car,
  Home,
  Coffee
} from 'lucide-react';

interface Movement {
  date: string;
  description: string;
  amount: string;
  entity: string;
  icon: React.ElementType;
}

export default function AccountBalances() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  
  const accounts = {
    cc: {
      type: 'Cuenta Corriente',
      balance: '$ 150.432,50',
      accountNumber: '0720-4108/9',
      icon: CreditCard,
      movements: [
        { date: '2024-03-15', description: 'Transferencia recibida', amount: '+ $ 50.000,00', entity: 'Banco Galicia', icon: ArrowDownRight },
        { date: '2024-03-14', description: 'Pago de servicios', amount: '- $ 15.432,00', entity: 'Edesur', icon: Building2 },
        { date: '2024-03-13', description: 'Compra con débito', amount: '- $ 8.750,00', entity: 'Mercado Libre', icon: ShoppingCart },
        { date: '2024-03-12', description: 'Depósito en efectivo', amount: '+ $ 25.000,00', entity: 'Sucursal Centro', icon: Banknote },
        { date: '2024-03-11', description: 'Pago de tarjeta', amount: '- $ 12.350,00', entity: 'Santander', icon: CardIcon },
        { date: '2024-03-10', description: 'Transferencia enviada', amount: '- $ 7.800,00', entity: 'BBVA', icon: ArrowUpRight },
        { date: '2024-03-09', description: 'Compra online', amount: '- $ 4.599,00', entity: 'Amazon', icon: ShoppingCart },
        { date: '2024-03-08', description: 'Sueldo', amount: '+ $ 180.000,00', entity: 'Empresa SA', icon: Building2 },
        { date: '2024-03-07', description: 'Netflix', amount: '- $ 3.999,00', entity: 'Débito automático', icon: Monitor },
        { date: '2024-03-06', description: 'Spotify', amount: '- $ 1.199,00', entity: 'Débito automático', icon: Music },
        { date: '2024-03-05', description: 'Transferencia recibida', amount: '+ $ 15.000,00', entity: 'Juan Pérez', icon: ArrowDownRight },
        { date: '2024-03-04', description: 'Supermercado', amount: '- $ 22.450,00', entity: 'Coto', icon: ShoppingCart },
        { date: '2024-03-03', description: 'Estación de servicio', amount: '- $ 18.500,00', entity: 'YPF', icon: Car },
        { date: '2024-03-02', description: 'Transferencia recibida', amount: '+ $ 8.500,00', entity: 'María González', icon: ArrowDownRight },
        { date: '2024-03-01', description: 'Alquiler', amount: '- $ 95.000,00', entity: 'Inmobiliaria', icon: Home }
      ]
    },
    ca: {
      type: 'Caja de Ahorro en Pesos',
      balance: '$ 75.890,30',
      accountNumber: '0720-4109/6',
      icon: Wallet,
      movements: [
        { date: '2024-03-15', description: 'Depósito en efectivo', amount: '+ $ 25.000,00', entity: 'Sucursal Centro', icon: Banknote },
        { date: '2024-03-14', description: 'Extracción ATM', amount: '- $ 10.000,00', entity: 'Cajero Link', icon: Landmark },
        { date: '2024-03-13', description: 'Transferencia recibida', amount: '+ $ 12.000,00', entity: 'Ana López', icon: ArrowDownRight },
        { date: '2024-03-12', description: 'Compra débito', amount: '- $ 5.430,00', entity: 'Farmacity', icon: ShoppingCart },
        { date: '2024-03-11', description: 'Transferencia enviada', amount: '- $ 8.000,00', entity: 'Carlos Ruiz', icon: ArrowUpRight },
        { date: '2024-03-10', description: 'Depósito cheque', amount: '+ $ 45.000,00', entity: 'Ventanilla', icon: Banknote },
        { date: '2024-03-09', description: 'Compra débito', amount: '- $ 3.200,00', entity: 'Kiosco', icon: Coffee },
        { date: '2024-03-08', description: 'Transferencia recibida', amount: '+ $ 7.500,00', entity: 'Pedro Sánchez', icon: ArrowDownRight },
        { date: '2024-03-07', description: 'Pago servicios', amount: '- $ 4.350,00', entity: 'Aysa', icon: Building2 },
        { date: '2024-03-06', description: 'Extracción ATM', amount: '- $ 15.000,00', entity: 'Cajero Banelco', icon: Landmark },
        { date: '2024-03-05', description: 'Transferencia recibida', amount: '+ $ 22.000,00', entity: 'Laura Martínez', icon: ArrowDownRight },
        { date: '2024-03-04', description: 'Compra débito', amount: '- $ 6.780,00', entity: 'Shell', icon: Car },
        { date: '2024-03-03', description: 'Depósito efectivo', amount: '+ $ 30.000,00', entity: 'Sucursal Microcentro', icon: Banknote },
        { date: '2024-03-02', description: 'Pago servicios', amount: '- $ 2.890,00', entity: 'Telecom', icon: Building2 },
        { date: '2024-03-01', description: 'Transferencia recibida', amount: '+ $ 5.000,00', entity: 'Julia García', icon: ArrowDownRight }
      ]
    },
    usd: {
      type: 'Caja de Ahorro en Dólares',
      balance: 'U$S 2.450,00',
      accountNumber: '0720-4110/2',
      icon: DollarSign,
      movements: [
        { date: '2024-03-15', description: 'Transferencia recibida', amount: '+ U$S 500,00', entity: 'Bank of America', icon: ArrowDownRight },
        { date: '2024-03-12', description: 'Compra de dólares', amount: '+ U$S 200,00', entity: 'Mercado Libre', icon: DollarSign },
        { date: '2024-03-10', description: 'Transferencia enviada', amount: '- U$S 300,00', entity: 'Chase Bank', icon: ArrowUpRight },
        { date: '2024-03-08', description: 'Depósito en efectivo', amount: '+ U$S 1.000,00', entity: 'Sucursal Centro', icon: Banknote },
        { date: '2024-03-06', description: 'Transferencia recibida', amount: '+ U$S 750,00', entity: 'Wells Fargo', icon: ArrowDownRight },
        { date: '2024-03-05', description: 'Compra de dólares', amount: '+ U$S 300,00', entity: 'Mercado Libre', icon: DollarSign },
        { date: '2024-03-04', description: 'Transferencia enviada', amount: '- U$S 200,00', entity: 'Citibank', icon: ArrowUpRight },
        { date: '2024-03-03', description: 'Depósito en efectivo', amount: '+ U$S 500,00', entity: 'Sucursal Microcentro', icon: Banknote },
        { date: '2024-03-02', description: 'Transferencia recibida', amount: '+ U$S 300,00', entity: 'HSBC USA', icon: ArrowDownRight },
        { date: '2024-03-01', description: 'Compra de dólares', amount: '+ U$S 150,00', entity: 'Mercado Libre', icon: DollarSign },
        { date: '2024-02-28', description: 'Transferencia enviada', amount: '- U$S 400,00', entity: 'JP Morgan', icon: ArrowUpRight },
        { date: '2024-02-27', description: 'Depósito en efectivo', amount: '+ U$S 800,00', entity: 'Sucursal Centro', icon: Banknote },
        { date: '2024-02-26', description: 'Transferencia recibida', amount: '+ U$S 250,00', entity: 'Deutsche Bank', icon: ArrowDownRight },
        { date: '2024-02-25', description: 'Compra de dólares', amount: '+ U$S 400,00', entity: 'Mercado Libre', icon: DollarSign },
        { date: '2024-02-24', description: 'Transferencia enviada', amount: '- U$S 150,00', entity: 'Bank of America', icon: ArrowUpRight }
      ]
    }
  };

  const renderMovementTicket = () => {
    if (!selectedMovement) return null;

    const Icon = selectedMovement.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
           onClick={() => setSelectedMovement(null)}>
        <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-6 
          animate-card-print relative mx-auto transform transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          {/* Logo */}
          <img 
            src="https://www.alvantia.com/wp-content/uploads/2019/10/Santander-Logo.png"
            alt="Santander"
            className="h-6 mx-auto mb-4"
          />
          
          {/* Movement Icon */}
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-lg ${
              selectedMovement.amount.startsWith('+') ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Icon size={28} className={
                selectedMovement.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
              } />
            </div>
          </div>
          
          {/* Movement Details */}
          <div className="text-center space-y-3">
            <h3 className="font-bold text-gray-800 text-lg">{selectedMovement.description}</h3>
            <p className="text-gray-600 text-base">{selectedMovement.entity}</p>
            <p className="text-sm text-gray-500">{selectedMovement.date}</p>
            <p className={`text-2xl font-bold ${
              selectedMovement.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedMovement.amount}
            </p>
          </div>
          
          {/* Dotted Line */}
          <div className="my-4 border-t border-dashed border-gray-300"></div>
          
          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(accounts).map(([key, account]) => {
          const Icon = account.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedAccount(selectedAccount === key ? null : key)}
              className={`${
                selectedAccount === key
                  ? 'ring-2 ring-santander-red shadow-lg scale-105'
                  : 'hover:shadow-lg hover:scale-105'
              } ${
                key === 'usd' ? 'bg-gray-100' : 'bg-white'
              } p-6 rounded-xl transition-all duration-300 text-left relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-santander-red/10 rounded-lg">
                    <Icon className="text-santander-red" size={24} />
                  </div>
                  <span className="text-2xl font-bold">{account.balance}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{account.type}</h3>
                <p className="text-sm text-gray-500">N° Cuenta: {account.accountNumber}</p>
                
                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 
                  w-24 h-24 bg-santander-red/5 rounded-full transition-transform duration-300 
                  group-hover:scale-150"></div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedAccount && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500">
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Últimos Movimientos</h3>
                <p className="text-gray-600">{accounts[selectedAccount as keyof typeof accounts].type}</p>
              </div>
              <p className="text-lg font-semibold text-gray-700">
                N° Cuenta: {accounts[selectedAccount as keyof typeof accounts].accountNumber}
              </p>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {accounts[selectedAccount as keyof typeof accounts].movements.map((movement, index) => {
              const Icon = movement.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedMovement(movement)}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedAccount === 'usd' ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        movement.amount.startsWith('+') ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon size={20} className={
                          movement.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        } />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{movement.description}</p>
                        <p className="text-sm text-gray-500">{movement.entity}</p>
                        <p className="text-xs text-gray-400">{movement.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      movement.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {movement.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedMovement && renderMovementTicket()}
    </div>
  );
}