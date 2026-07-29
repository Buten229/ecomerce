import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  url: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-95"
    >
      <MessageSquare className="w-6 h-6 fill-white" /> Enviar Pedido por WhatsApp
    </a>
  );
};
