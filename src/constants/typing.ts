// タイピング設定の定数
export const TYPING_CONSTANTS = {
  // タイピング設定
  DEFAULT_WORD_LENGTH: 400,
  DEFAULT_BASE_KPM: 600,
  
  // タイミング設定
  FOCUS_DELAY: 30,
  COUNTDOWN_INTERVAL: 1000,
  
  // テキスト設定
  DEFAULT_RESULT_TEXT: "乗るしかない、このビッグウェーブに"
} as const;

// 単語長さのオプション
export const WORD_LENGTH_OPTIONS = [
  { value: "100", label: "100打" },
  { value: "200", label: "200打" },
  { value: "400", label: "400打" }
] as const;

// 基本速度のオプション
export const BASE_KPM_OPTIONS = [
  { value: "200", label: "200kpm" },
  { value: "300", label: "300kpm" },
  { value: "400", label: "400kpm" },
  { value: "500", label: "500kpm" },
  { value: "600", label: "600kpm" },
  { value: "700", label: "700kpm" },
  { value: "800", label: "800kpm" },
  { value: "900", label: "900kpm" },
  { value: "1000", label: "1000kpm" },
  { value: "1100", label: "1100kpm" },
  { value: "1200", label: "1200kpm" }
] as const; 