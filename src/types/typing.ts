import { TypewellWord } from '../core/TypeWell';
import { TypingState as TypingCoreState } from '../core/TypingCore';

// TypingCoreのTypingState型を使用
export interface State {
  index: number;
  lastResult: boolean;
}

// タイピングの進捗状態
export interface TypingProgress {
  word: TypewellWord;
  completed: boolean;
  kpm?: number;
}

// タイピングの設定
export interface TypingSettings {
  wordLength: number;
  baseKPM: number;
}

// タイピングのタイミング
export interface TypingTiming {
  startTime: number;
  finishTime: number;
  checkPointTime: number;
  checkPoint: number;
}

// タイピングの状態
export interface TypingState {
  completedWords: number;
  isTyping: boolean;
  wordLength: number;
  baseKPM: number;
  word: TypewellWord;
  words: TypewellWord[];
  state: TypingCoreState;
  count: number;
  buttonEnabled: boolean;
  startTime: number;
  finishTime: number;
  checkPointTime: number;
  checkPoint: number;
  currentIndex: number;
}

// タイピングロジックの戻り値
export interface TypingLogicReturn {
  typingState: TypingState;
  resultText: string;
  newWord: () => void;
  sortWord: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  escape: () => void;
  start: () => void;
  countDown: (n: number) => void;
  selectLength: (value: string) => void;
  selectBaseKPM: (value: string) => void;
}

// タイピングエリアのプロパティ
export interface TypeAreaWithRubyProps {
  words: TypewellWord[];
  state: TypingCoreState;
  baseKPM: number;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

// 結果表示のプロパティ
export interface ResultDisplayProps {
  state: TypingCoreState;
  finishTime: number;
} 