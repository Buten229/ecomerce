import { Product } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    nombre: 'MacBook Pro 16" M3 Max (2024)',
    descripcion: 'Laptop ultrarrápida con chip M3 Max 16-Core CPU, 40-Core GPU, 48GB RAM y 1TB SSD. Pantalla Liquid Retina XDR de 120Hz.',
    precio: 215000,
    precio_oferta: 199900,
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    categoria: 'Laptops',
    stock: 12,
    rating: 4.9,
    reviews_count: 84,
    destacado: true,
    specs: {
      Procesador: 'Apple M3 Max',
      RAM: '48GB Unified',
      Almacenamiento: '1TB NVMe SSD',
      Pantalla: '16.2" Liquid Retina XDR (3456x2234)',
    },
  },
  {
    id: 'prod-2',
    nombre: 'iPhone 15 Pro Max 256GB - Titanium Natural',
    descripcion: 'Diseño en Titanio grado aeroespacial, Chip A17 Pro, Cámara principal de 48MP con teleobjetivo 5x y Botón de Acción.',
    precio: 85000,
    precio_oferta: 78900,
    imagen: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    categoria: 'Smartphones',
    stock: 25,
    rating: 4.8,
    reviews_count: 142,
    destacado: true,
    specs: {
      Pantalla: '6.7" Super Retina XDR OLED',
      Procesador: 'A17 Pro (3nm)',
      Cámara: '48MP + 12MP + 12MP (5x Opt)',
      Batería: '4422 mAh (Carga rápida)',
    },
  },
  {
    id: 'prod-3',
    nombre: 'Sony WH-1000XM5 Audífonos Wireless',
    descripcion: 'Cancelación de ruido líder en la industria con 8 micrófonos y procesador V1. Hasta 30 horas de batería con audio Hi-Res.',
    precio: 26500,
    precio_oferta: 22900,
    imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    categoria: 'Audio',
    stock: 18,
    rating: 4.7,
    reviews_count: 96,
    destacado: true,
    specs: {
      Autonomía: '30 Horas (ANC On)',
      Conectividad: 'Bluetooth 5.2 + Codec LDAC',
      Peso: '250g',
    },
  },
  {
    id: 'prod-4',
    nombre: 'Samsung Galaxy S24 Ultra 512GB',
    descripcion: 'Inteligencia Artificial Galaxy AI integrada, Marco de Titanio, S-Pen incorporado y Cámara de 200MP con Space Zoom 100x.',
    precio: 92000,
    precio_oferta: 84900,
    imagen: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    categoria: 'Smartphones',
    stock: 15,
    rating: 4.8,
    reviews_count: 67,
    destacado: true,
    specs: {
      Pantalla: '6.8" Dynamic AMOLED 2X 120Hz',
      Procesador: 'Snapdragon 8 Gen 3 for Galaxy',
      Cámara: '200MP OIS',
    },
  },
  {
    id: 'prod-5',
    nombre: 'Monitor OLED Gaming Dell Alienware 34" Curvo',
    descripcion: 'Panel QD-OLED UWQHD 175Hz, tiempo de respuesta 0.1ms, certificado NVIDIA G-Sync Ultimate y curvatura 1800R.',
    precio: 68000,
    precio_oferta: 59900,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    categoria: 'Monitores',
    stock: 8,
    rating: 4.9,
    reviews_count: 38,
    destacado: true,
    specs: {
      Resolución: '3440 x 1440 (UWQHD)',
      TasaDeRefresco: '175Hz',
      Tecnología: 'Quantum Dot OLED',
    },
  },
  {
    id: 'prod-6',
    nombre: 'Apple Watch Ultra 2 Titanium 49mm',
    descripcion: 'Diseño para condiciones extremas en titanio, Pantalla de 3000 nits, Chip S9 SiP, GPS de doble frecuencia y hasta 72h de batería.',
    precio: 54000,
    precio_oferta: 48900,
    imagen: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    categoria: 'Smartwatches',
    stock: 20,
    rating: 4.9,
    reviews_count: 53,
    destacado: false,
  },
  {
    id: 'prod-7',
    nombre: 'Teclado Mecánico Custom Keychron Q1 Pro Wireless',
    descripcion: 'Cuerpo de aluminio CNC, Montaje Gasket, Switches lubricados Keychron K Pro, Keycaps PBT Double-shot y QMK/VIA.',
    precio: 14500,
    precio_oferta: 12900,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    categoria: 'Accesorios',
    stock: 30,
    rating: 4.8,
    reviews_count: 41,
    destacado: false,
  },
  {
    id: 'prod-8',
    nombre: 'Console PlayStation 5 Slim 1TB Disc Edition',
    descripcion: 'Nuevo diseño más delgado con SSD ultra veloz de 1TB, Audio 3D Tempest, DualSense con gatillos adaptativos y trazado de rayos 4K 120Hz.',
    precio: 38500,
    precio_oferta: 34900,
    imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    categoria: 'Gaming',
    stock: 10,
    rating: 4.9,
    reviews_count: 112,
    destacado: true,
  },
];

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        console.warn('Usando catálogo local por fallback:', e);
      }
    }
    return MOCK_PRODUCTS;
  },

  async getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Fallback a producto local:', e);
      }
    }
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter((p) => p.destacado);
  },

  async getProductsByCategory(categoria: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    if (categoria === 'Todos') return products;
    return products.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
  },
};
