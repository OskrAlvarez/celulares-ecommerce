import { MdLocalShipping } from 'react-icons/md';
import { HiMiniReceiptRefund } from 'react-icons/hi2';
import { FaHammer } from 'react-icons/fa6';
import { BiWorld } from 'react-icons/bi';

export const featureInfo = [
  {
    id: 1,
    title: 'Envío gratis',
    shortDescription: 'En todos nuestros productos',
    icon: <MdLocalShipping size={40} className='text-slate-600' />
  },
  {
    id: 2,
    title: 'Devoluciones',
    shortDescription: 'Devuelve el equipo si no te satisface la compra dentro de 72 horas',
    icon: <HiMiniReceiptRefund size={40} className='text-slate-600' />
  },
  {
    id: 3,
    title: 'Soporte 24/7',
    shortDescription: 'Soporte técnico en cualquier momento',
    icon: <FaHammer size={40} className='text-slate-600' />
  },
  {
    id: 4,
    title: 'Garantía',
    shortDescription: 'Garantía de 1 año en todos los equipos',
    icon: <BiWorld size={40} className='text-slate-600' />
  },
]
