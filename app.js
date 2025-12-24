import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Camera } from 'lucide-react';

const App = () => {
  const [progress, setProgress] = useState(45); // Процент накопления
  const [amount, setAmount] = useState(45870);

  // Данные календаря
  const payments = [
    { month: 'Июль', status: 'paid' },
    { month: 'Август', status: 'paid' },
    { month: 'Сентябрь', status: 'waiting' },
    { month: 'Октябрь', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6 font-sans flex flex-col items-center overflow-hidden">
      
      {/* Шапка и поле подтверждения */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-[#161616] rounded-3xl p-6 mb-8 border border-gray-800 shadow-2xl"
      >
        <h2 className="text-gray-400 text-sm mb-1 text-center">Накоплено на авто</h2>
        <div className="text-3xl font-bold text-center mb-4">{amount.toLocaleString()} руб.</div>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(0,122,255,0.3)]">
          <Camera size={20} />
          <span className="font-semibold">Загрузить чек</span>
        </button>
      </motion.div>

      <div className="relative w-full max-w-md flex flex-1">
        
        {/* Центральная зона с машиной */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            src="https://открытый-источник-с-авто.png" // Замени на свой PNG авто
            alt="Car"
            className="w-full z-10 drop-shadow-[0_0_30px_rgba(0,122,255,0.2)]"
          />
          
          {/* Интерактивная волна топлива */}
          <div className="absolute bottom-20 w-full h-40 bg-[#111] rounded-2xl overflow-hidden border border-gray-900">
            <motion.div 
              className="absolute bottom-0 w-full bg-blue-600/30"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Эффект волны через SVG */}
              <svg className="absolute -top-5 left-0 w-[200%] h-10 fill-blue-500 animate-wave" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q25 0 50 10 T100 10 V20 H0 Z" />
              </svg>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-400">
              {progress}% топлива
            </div>
          </div>
        </div>

        {/* Правая панель (Календарь) */}
        <div className="w-24 flex flex-col gap-3 justify-center pl-4">
          {payments.map((item, index) => (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              key={index}
              className={`p-2 rounded-xl border text-[10px] flex flex-col items-center gap-1 ${
                item.status === 'paid' ? 'border-green-500/50 bg-green-500/10 text-green-400' :
                item.status === 'waiting' ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400 animate-pulse' :
                'border-gray-700 bg-gray-800/50 text-gray-500'
              }`}
            >
              <span className="font-bold uppercase">{item.month}</span>
              {item.status === 'paid' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
