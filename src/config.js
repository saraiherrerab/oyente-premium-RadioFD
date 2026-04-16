/**
 * Configuración de la radio
 * Este archivo será generado automáticamente por la App de Escritorio
 * con los datos específicos de cada radio
 */

import { COLOR_API_PROVIDER, COLOR_API_URL, COLOR_API_AUTH } from '@env';

export const RADIO_CONFIG = {
  // Información básica de la radio
  name: "Estrella FM",
  tagline: "Tu música, tu radio",

  // Colores personalizados (se usarán en toda la app)
  colors: {
    primary: "#D4AF37",
    secondary: "#6B7280",
    background: "#111827"
  },

  // URLs de la infraestructura de la radio
  streamUrl: "https://streamingned.com:7190/stream",

  // API de metadatos de la radio
  // IMPORTANTE: Reemplaza esta URL con la API real de tu radio
  // Si no tienes API de metadatos, deja como null y se mostrará el nombre de la radio
  metadataUrl: null,

  // Flag para indicar si hay portada por defecto
  // Si es true, se intentará cargar default-cover.png de assets
  hasDefaultCover: false,

  // Redes sociales
  social: {
    facebook: "https://facebook.com/estrellafm",
    instagram: "https://instagram.com/estrellafm",
    twitter: "https://twitter.com/estrellafm",
    youtube: "https://youtube.com/@estrellafm",
    tiktok: "https://tiktok.com/@estrellafm",
    website: "https://www.estrellafm.com"
  },

  // Intervalo de actualización de metadatos (en milisegundos)
  metadataRefreshInterval: 10000, // 10 segundos

  // Configuración de viewers
  viewers: {
    enabled: true,
    count: 1
  },

  // Configuración opcional para API externa de extracción de colores
  colorApi: {
    // provider: 'imagga' or 'generic'
    provider: COLOR_API_PROVIDER || '',
    // url del endpoint (p.ej. 'https://api.imagga.com/v2/colors')
    url: COLOR_API_URL || '',
    // auth header si el servicio lo requiere, p.ej. 'Basic base64(key:secret)'
    auth: COLOR_API_AUTH || '',
  },
};
