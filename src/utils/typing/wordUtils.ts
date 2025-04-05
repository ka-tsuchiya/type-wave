import { TypewellWord } from '../../core/TypeWell';

export function wordKPM(k: number, timems: number): number {
  return k * 60000 / timems
}

export function wordSplit(word: TypewellWord) {
  let result: TypewellWord[] = []
  let hiraganas = word.hiragana.split("　")
  let kanjis = word.kanji.split("　")
  for(let i = 0; i < hiraganas.length; i++) {
    result[i] = {
      hiragana: hiraganas[i] + "　",
      kanji: kanjis[i] + "　",
      completed: false
    }
  }
  return result
}

export function makeResultText(timems: number, length: number) : string {
  return length + "打を" + (timems / 1000).toFixed(3) + "秒で打って" + (length / timems * 60000).toFixed(2) + "kpmでした"
}