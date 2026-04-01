import { RADIO_CONFIG } from '../constants';

/**
 * Determina qué imagen mostrar basándose en la URL de portada
 * @param {string} coverUrl - URL de la portada de iTunes
 * @returns {object} - Source de la imagen a mostrar
 */
export const getCoverSource = (coverUrl) => {
  // Para pruebas, usar discoportada.jpg
  return require('../../assets/icons/discoportada.jpg');
  
  // Descomentar para comportamiento original:
  // if (coverUrl) {
  //   return { uri: coverUrl };
  // }
  // if (RADIO_CONFIG.defaultCover) {
  //   return RADIO_CONFIG.defaultCover;
  // }
  // return require('../../assets/icons/radiologo.png');
};

/**
 * Determina si mostrar el ícono del disco
 * @param {string} coverUrl - URL de la portada
 * @returns {boolean}
 */
export const shouldShowDiskIcon = (coverUrl) => {
  // Para pruebas, no mostrar ícono de disco
  return false;
  
  // Descomentar para comportamiento original:
  // return !coverUrl && !RADIO_CONFIG.defaultCover;
};
