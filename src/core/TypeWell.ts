import { TypingWordBase, convert } from "./TypingCore"
import { randomOne } from "./sanpleWords"

export type TypewellWord = {
  hiragana: string
  kanji: string
  completed: boolean | number
}

// ローマ字の長さが指定した長さ以上になる単語列を生成する
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
    kanji: kanji,
    completed: false
  }
}

// 速さの結果順で並び替える
export function sortAndJoin(words: TypewellWord[]) : TypewellWord {
  const sorted = words.sort((a,b) => {
    if (a.completed > b.completed) {
      return 1
    }
    if (a.completed < b.completed) {
      return -1
    }
    return 0
  })
  const hiragana = sorted.map((word) => word.hiragana.split("　")[0]).join("　")
  const kanji = sorted.map((word) => word.kanji.split("　")[0]).join("　")
  return {
    hiragana: hiragana,
    kanji: kanji,
    completed: false
  }
}