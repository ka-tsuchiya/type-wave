import { TypingWordBase, convert } from "./TypingCore"
import { randomOne } from "./sanpleWords"

export type TypewellWord = {
  hiragana: string
  kanji: string
}

export function generateWord(length: number): TypewellWord {
  let totalLength = 0
  let words: TypingWordBase[] = []
  let hiragana: string = ""
  let kanji: string = ""
  while(totalLength < length) {
    let word = randomOne()
    words.push(word)
    hiragana = words.map((word) => word.hiragana).join("　")
    kanji = words.map((word) => word.kanji).join("　")
    let ramans = convert(hiragana)
    totalLength = ramans[0].length
  }
  return {
    hiragana: hiragana,
    kanji: kanji
  }
}