import { Asset } from 'expo-asset';
import { RADIO_CONFIG } from '../config';
import ImageColors from 'react-native-image-colors';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image as RNImage } from 'react-native';

function normalizeColorString(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (s.startsWith('#')) return s;
  if (/^[0-9A-Fa-f]{6}$/.test(s)) return `#${s}`;
  const rgbMatch = s.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const toHex = (n) => (`0${Math.max(0, Math.min(255, n)).toString(16)}`).slice(-2);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return null;
}

/**
 * getDominantColorFromAsset
 * - Recibe un `asset` local (módulo numérico) o una `uri` remota/archivo y
 *   devuelve un color hex (#rrggbb) aproximado usando `react-native-image-colors`.
 * - Si falla, devuelve el color primario de `RADIO_CONFIG.colors.primary`.
 */
export async function getDominantColorFromAsset(assetOrUri) {
  try {
    let uri = null;

    // Resolve local asset modules (numbers) via expo-asset
    if (typeof assetOrUri === 'number') {
      const asset = Asset.fromModule(assetOrUri);
      if (!asset.localUri && !asset.uri) {
        await asset.downloadAsync();
      }
      uri = asset.localUri || asset.uri || null;
    } else if (typeof assetOrUri === 'string') {
      uri = assetOrUri;
    } else if (assetOrUri && assetOrUri.uri) {
      uri = assetOrUri.uri;
    }

    if (!uri) return RADIO_CONFIG.colors.primary;

    // Try to crop central region to focus color extraction on image center.
    let colorsUri = uri;
    try {
      const sizeInfo = await new Promise((resolve, reject) => {
        RNImage.getSize(uri, (w, h) => resolve({ w, h }), reject);
      });
      const w = sizeInfo.w;
      const h = sizeInfo.h;
      const cropSize = Math.floor(Math.min(w, h) * 0.45);
      const originX = Math.max(0, Math.floor((w - cropSize) / 2));
      const originY = Math.max(0, Math.floor((h - cropSize) / 2));
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ crop: { originX, originY, width: cropSize, height: cropSize } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      if (manipResult && manipResult.uri) colorsUri = manipResult.uri;
    } catch (e) {
      // If cropping fails, continue with full image
    }

    // Request colors from native library
    const result = await ImageColors.getColors(colorsUri, { fallback: RADIO_CONFIG.colors.primary });

    let candidate = null;
    if (result) {
      const platform = result.platform || result.platformName || null;
      // Android / Web shape
      if (platform === 'android' || platform === 'web') {
        candidate = result.dominant || result.vibrant || result.average || result.lightVibrant || result.darkVibrant;
      } else if (platform === 'ios') {
        candidate = result.primary || result.background || result.secondary || result.detail;
      } else {
        candidate = result.dominant || result.primary || result.background || result.color || null;
      }
    }

    const normalized = normalizeColorString(candidate);
    if (normalized) return normalized;
    return RADIO_CONFIG.colors.primary;
  } catch (err) {
    try { console.warn('getDominantColorFromAsset failed', err); } catch (e) {}
    return RADIO_CONFIG.colors.primary;
  }
}
