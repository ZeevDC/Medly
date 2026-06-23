/**
 * Cutesy Theme Styles for Medly
 * Provides dynamic, cutesy pastel aesthetic stylings for each theme option
 */

export interface ThemeConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  bgClass: string;          // Global theme background layout wrapper
  cardBg: string;           // Card background (e.g. bg-white)
  borderClass: string;      // Border colors
  textPrimary: string;      // Body text color
  textColor: string;        // Alias for body text color for generic access
  textSecondary: string;    // Subtitles and metadata
  accentBg: string;         // Badge background
  accentText: string;       // Badge text
  accentBorder: string;     // Badge border
  btnPrimary: string;       // Primary button (e.g. bg-sky-600)
  btnSecondary: string;     // Secondary button (e.g. light gray, pastel border)
  bannerGradient: string;   // Dashboard welcome/banner gradient classes
  iconColor: string;        // Accent icons color
  bubbleStyle: string;      // Styling of the container card roundness (super pill)
}

export const themesMap: Record<string, ThemeConfig> = {
  'cozy-bear': {
    id: 'cozy-bear',
    name: 'Cozy Bear',
    emoji: '🐻',
    description: 'Soft slate-gray & sky-blue highlights',
    bgClass: 'bg-[#EBF1FA]',
    cardBg: 'bg-white',
    borderClass: 'border-[#CFDDF0]/60',
    textPrimary: 'text-slate-800',
    textColor: 'text-slate-800',
    textSecondary: 'text-slate-500',
    accentBg: 'bg-sky-50',
    accentText: 'text-[#1b4cb4]',
    accentBorder: 'border-sky-100',
    btnPrimary: 'bg-[#1b4cb4] hover:bg-indigo-750 text-white shadow-sm hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-slate-50 text-slate-700 border-[#CFDDF0]/80 border',
    bannerGradient: 'from-sky-900 via-[#1b4cb4] to-slate-900',
    iconColor: 'text-[#1b4cb4]',
    bubbleStyle: 'rounded-[28px]'
  },
  'strawberry-matcha': {
    id: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    emoji: '🍵',
    description: 'Cream canvas, matcha green & strawberry rose accents',
    bgClass: 'bg-[#F4F1EA]',
    cardBg: 'bg-[#FDFCF7]',
    borderClass: 'border-[#D3E2C4]/80',
    textPrimary: 'text-[#2C3E2B]',
    textColor: 'text-[#2C3E2B]',
    textSecondary: 'text-[#7A6A53]',
    accentBg: 'bg-[#FFECEF]',
    accentText: 'text-[#D0485C]',
    accentBorder: 'border-[#FFD0D4]',
    btnPrimary: 'bg-[#5D824B] hover:bg-[#4E6D3E] text-white shadow-xs hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#F3EFE6] text-[#5D824B] border-[#C3D5B3] border',
    bannerGradient: 'from-[#2C3E2B] via-[#5D824B] to-[#916853]',
    iconColor: 'text-[#5D824B]',
    bubbleStyle: 'rounded-[32px]'
  },
  'lilac-dream': {
    id: 'lilac-dream',
    name: 'Lilac Dream',
    emoji: '💜',
    description: 'Soft lavender, violet text & cloud backgrounds',
    bgClass: 'bg-[#F4EFFF]',
    cardBg: 'bg-white',
    borderClass: 'border-[#E1D3FF]/80',
    textPrimary: 'text-[#3B1E7B]',
    textColor: 'text-[#3B1E7B]',
    textSecondary: 'text-[#6A4E9E]',
    accentBg: 'bg-[#FAF0FF]',
    accentText: 'text-[#9030FF]',
    accentBorder: 'border-[#E8C4FF]',
    btnPrimary: 'bg-[#8253E6] hover:bg-[#6D3ECF] text-white shadow-sm hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#FAF6FF] text-[#8253E6] border-[#D7C2FF] border',
    bannerGradient: 'from-[#3B1E7B] via-[#8253E6] to-[#6A4E9E]',
    iconColor: 'text-[#8253E6]',
    bubbleStyle: 'rounded-[28px]'
  },
  'pastel-pink-coquette': {
    id: 'pastel-pink-coquette',
    name: 'Pastel Pink Coquette',
    emoji: '🎀',
    description: 'Fairy pink, coquette lace border & rose gold buttons',
    bgClass: 'bg-[#FFF0F4]',
    cardBg: 'bg-[#FFFAF2]',
    borderClass: 'border-[#FFD2DF]/90',
    textPrimary: 'text-[#66162C]',
    textColor: 'text-[#66162C]',
    textSecondary: 'text-[#8C4155]',
    accentBg: 'bg-[#FFE2EC]',
    accentText: 'text-[#E03A6D]',
    accentBorder: 'border-[#FFA6C1]',
    btnPrimary: 'bg-[#E56A8F] hover:bg-[#CE4E74] text-white shadow-md hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#FFF5F7] text-[#E56A8F] border-[#FFA6C1] border',
    bannerGradient: 'from-[#66162C] via-[#E56A8F] to-[#E9967A]',
    iconColor: 'text-[#E56A8F]',
    bubbleStyle: 'rounded-[34px]'
  },
  'winter': {
    id: 'winter',
    name: 'Winter Frost',
    emoji: '❄️',
    description: 'Glacial winter-blue borders with ice-white panels',
    bgClass: 'bg-[#EFF7FC]',
    cardBg: 'bg-white',
    borderClass: 'border-[#CDE2F0]',
    textPrimary: 'text-[#0E294B]',
    textColor: 'text-[#0E294B]',
    textSecondary: 'text-[#3A5D7C]',
    accentBg: 'bg-[#E0F2FE]',
    accentText: 'text-[#0369A1]',
    accentBorder: 'border-[#BAE6FD]',
    btnPrimary: 'bg-[#0369A1] hover:bg-[#025684]/90 text-white shadow-sm hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#F0F8FF] text-[#0369A1] border-[#B9E0FF] border',
    bannerGradient: 'from-[#0E294B] via-[#0369A1] to-[#3A5D7C]',
    iconColor: 'text-[#0369A1]',
    bubbleStyle: 'rounded-[26px]'
  },
  'red-blush': {
    id: 'red-blush',
    name: 'Red Blush',
    emoji: '🍷',
    description: 'Warm deep red highlights with rosy secondary borders',
    bgClass: 'bg-[#FFF2F2]',
    cardBg: 'bg-white',
    borderClass: 'border-[#FFD5D5]/90',
    textPrimary: 'text-[#6B1111]',
    textColor: 'text-[#6B1111]',
    textSecondary: 'text-[#9E4545]',
    accentBg: 'bg-[#FFE6E6]',
    accentText: 'text-[#D32F2F]',
    accentBorder: 'border-[#FFCCCC]',
    btnPrimary: 'bg-[#D32F2F] hover:bg-[#b71c1c] text-white shadow-sm hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#FFF5F5] text-[#D32F2F] border-[#FFB2B2] border',
    bannerGradient: 'from-[#500707] via-[#D32F2F] to-[#800000]',
    iconColor: 'text-[#D32F2F]',
    bubbleStyle: 'rounded-[28px]'
  },
  'moon-dream': {
    id: 'moon-dream',
    name: 'Moon Dream Yellow',
    emoji: '🌙',
    description: 'Nocturnal gold glow with starry outlines',
    bgClass: 'bg-[#FFFDE6]',
    cardBg: 'bg-white',
    borderClass: 'border-[#FCE8A3]/90',
    textPrimary: 'text-[#4D3F08]',
    textColor: 'text-[#4D3F08]',
    textSecondary: 'text-[#7A6A30]',
    accentBg: 'bg-[#FEF9C3]',
    accentText: 'text-[#A16207]',
    accentBorder: 'border-[#FEF08A]',
    btnPrimary: 'bg-[#CA8A04] hover:bg-[#A16207] text-white shadow-sm hover:scale-[1.01] transition-all',
    btnSecondary: 'bg-white hover:bg-[#FEFCE8] text-[#CA8A04] border-[#FDE047] border',
    bannerGradient: 'from-[#222530] via-[#CA8A04] to-[#453715]',
    iconColor: 'text-[#CA8A04]',
    bubbleStyle: 'rounded-[30px]'
  }
};

export function getTheme(themeId: string): ThemeConfig {
  return themesMap[themeId] || themesMap['cozy-bear'];
}
