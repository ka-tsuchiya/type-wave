

type ConvertElement = {
  hiragana: string
  ramans: string[]
}

export type TypingWordBase = {
  kanji: string
  hiragana: string
}

type TypingRamans = string[]

const conversionTable: ConvertElement[] = [
  {hiragana: "んあ", ramans: ["nna", "xna"]},
  {hiragana: "んい", ramans: ["nni", "xni"]},
  {hiragana: "んう", ramans: ["nnu", "xnu"]},
  {hiragana: "んえ", ramans: ["nne", "xne"]},
  {hiragana: "んお", ramans: ["nno", "xno"]},
  {hiragana: "んにゃ", ramans: ["nnnya", "xnnya"]},
  {hiragana: "んにゅ", ramans: ["nnnyu", "xnnyu"]},
  {hiragana: "んにょ", ramans: ["nnnyo", "xnnyo"]},
  {hiragana: "んな", ramans: ["nnna", "xnna"]},
  {hiragana: "んに", ramans: ["nnni", "xnni"]},
  {hiragana: "んぬ", ramans: ["nnnu", "xnnu"]},
  {hiragana: "んね", ramans: ["nnne", "xnne"]},
  {hiragana: "んの", ramans: ["nnno", "xnno"]},
  {hiragana: "んや", ramans: ["nnya", "xnya"]},
  {hiragana: "んゆ", ramans: ["nnyu", "xnyu"]},
  {hiragana: "んよ", ramans: ["nnyo", "xnyo"]},
  {hiragana: "きゃ", ramans: ["kya"]},
  {hiragana: "きゅ", ramans: ["kyu"]},
  {hiragana: "きょ", ramans: ["kyo"]},
  {hiragana: "しゃ", ramans: ["sha", "sya"]},
  {hiragana: "しゅ", ramans: ["shu", "syu"]},
  {hiragana: "しぇ", ramans: ["she", "sye"]},
  {hiragana: "しょ", ramans: ["sho", "syo"]},
  {hiragana: "ちゃ", ramans: ["cha", "Tya", "cya"]},
  {hiragana: "ちゅ", ramans: ["chu", "Tyu", "cyu"]},
  {hiragana: "ちぇ", ramans: ["che", "Tye", "cye"]},
  {hiragana: "ちょ", ramans: ["cho", "Tyo", "cyo"]},
  {hiragana: "にゃ", ramans: ["nya"]},
  {hiragana: "にゅ", ramans: ["nyu"]},
  {hiragana: "にょ", ramans: ["nyo"]},
  {hiragana: "ひゃ", ramans: ["hya"]},
  {hiragana: "ひゅ", ramans: ["hyu"]},
  {hiragana: "ひょ", ramans: ["hyo"]},
  {hiragana: "みゃ", ramans: ["mya"]},
  {hiragana: "みゅ", ramans: ["myu"]},
  {hiragana: "みょ", ramans: ["myo"]},
  {hiragana: "りゃ", ramans: ["rya"]},
  {hiragana: "りゅ", ramans: ["ryu"]},
  {hiragana: "りょ", ramans: ["ryo"]},
  {hiragana: "ぎゃ", ramans: ["gya"]},
  {hiragana: "ぎゅ", ramans: ["gyu"]},
  {hiragana: "ぎょ", ramans: ["gyo"]},
  {hiragana: "じゃ", ramans: ["Ja", "Za"]},
  {hiragana: "じゅ", ramans: ["Ju", "Zu"]},
  {hiragana: "じぇ", ramans: ["Je", "Ze"]},
  {hiragana: "じょ", ramans: ["Jo", "Zo"]},
  {hiragana: "びゃ", ramans: ["bya"]},
  {hiragana: "びゅ", ramans: ["byu"]},
  {hiragana: "びょ", ramans: ["byo"]},
  {hiragana: "ぴゃ", ramans: ["pya"]},
  {hiragana: "ぴゅ", ramans: ["pyu"]},
  {hiragana: "ぴょ", ramans: ["pyo"]},
  {hiragana: "てゃ", ramans: ["tha"]},
  {hiragana: "てぃ", ramans: ["thi"]},
  {hiragana: "てゅ", ramans: ["thu"]},
  {hiragana: "てぇ", ramans: ["the"]},
  {hiragana: "てょ", ramans: ["tho"]},
  {hiragana: "つぁ", ramans: ["tsa"]},
  {hiragana: "つぇ", ramans: ["tse"]},
  {hiragana: "つぉ", ramans: ["tso"]},
  {hiragana: "でゃ", ramans: ["dha"]},
  {hiragana: "でぃ", ramans: ["dhi"]},
  {hiragana: "でゅ", ramans: ["dhu"]},
  {hiragana: "でょ", ramans: ["dho"]},
  {hiragana: "うぁ", ramans: ["wha"]},
  {hiragana: "うぃ", ramans: ["Wi", "Wi"]},
  {hiragana: "うぇ", ramans: ["We", "We"]},
  {hiragana: "うぉ", ramans: ["who", "Uxo", "Ulo"]},
  {hiragana: "ふぁ", ramans: ["fa"]},
  {hiragana: "ふぃ", ramans: ["fi"]},
  {hiragana: "ふぇ", ramans: ["fe"]},
  {hiragana: "ふぉ", ramans: ["fo"]},
  {hiragana: "あ", ramans: ["a"]},
  {hiragana: "い", ramans: ["i"]},
  {hiragana: "う", ramans: ["u"]},
  {hiragana: "え", ramans: ["e"]},
  {hiragana: "お", ramans: ["o"]},
  {hiragana: "か", ramans: ["ka", "ca"]},
  {hiragana: "き", ramans: ["ki"]},
  {hiragana: "く", ramans: ["ku", "cu"]},
  {hiragana: "け", ramans: ["ke"]},
  {hiragana: "こ", ramans: ["ko", "co"]},
  {hiragana: "さ", ramans: ["sa"]},
  {hiragana: "し", ramans: ["Si"]},
  {hiragana: "す", ramans: ["su"]},
  {hiragana: "せ", ramans: ["se"]},
  {hiragana: "そ", ramans: ["so"]},
  {hiragana: "た", ramans: ["ta"]},
  {hiragana: "ち", ramans: ["ti", "Ci"]},
  {hiragana: "つ", ramans: ["tu", "tS"]},
  {hiragana: "て", ramans: ["te"]},
  {hiragana: "と", ramans: ["to"]},
  {hiragana: "な", ramans: ["na"]},
  {hiragana: "に", ramans: ["ni"]},
  {hiragana: "ぬ", ramans: ["nu"]},
  {hiragana: "ね", ramans: ["ne"]},
  {hiragana: "の", ramans: ["no"]},
  {hiragana: "は", ramans: ["ha"]},
  {hiragana: "ひ", ramans: ["hi"]},
  {hiragana: "ふ", ramans: ["hu", "fu"]},
  {hiragana: "へ", ramans: ["he"]},
  {hiragana: "ほ", ramans: ["ho"]},
  {hiragana: "ま", ramans: ["ma"]},
  {hiragana: "み", ramans: ["mi"]},
  {hiragana: "む", ramans: ["mu"]},
  {hiragana: "め", ramans: ["me"]},
  {hiragana: "も", ramans: ["mo"]},
  {hiragana: "や", ramans: ["ya"]},
  {hiragana: "ゆ", ramans: ["yu"]},
  {hiragana: "よ", ramans: ["yo"]},
  {hiragana: "ら", ramans: ["ra"]},
  {hiragana: "り", ramans: ["ri"]},
  {hiragana: "る", ramans: ["ru"]},
  {hiragana: "れ", ramans: ["re"]},
  {hiragana: "ろ", ramans: ["ro"]},
  {hiragana: "わ", ramans: ["wa"]},
  {hiragana: "を", ramans: ["wo"]},
  {hiragana: "が", ramans: ["ga"]},
  {hiragana: "ぎ", ramans: ["gi"]},
  {hiragana: "ぐ", ramans: ["gu"]},
  {hiragana: "げ", ramans: ["ge"]},
  {hiragana: "ご", ramans: ["go"]},
  {hiragana: "ざ", ramans: ["za"]},
  {hiragana: "じ", ramans: ["zi", "ji"]},
  {hiragana: "ず", ramans: ["zu"]},
  {hiragana: "ぜ", ramans: ["ze"]},
  {hiragana: "ぞ", ramans: ["zo"]},
  {hiragana: "だ", ramans: ["da"]},
  {hiragana: "ぢ", ramans: ["di"]},
  {hiragana: "づ", ramans: ["du"]},
  {hiragana: "で", ramans: ["de"]},
  {hiragana: "ど", ramans: ["do"]},
  {hiragana: "ば", ramans: ["ba"]},
  {hiragana: "び", ramans: ["bi"]},
  {hiragana: "ぶ", ramans: ["bu"]},
  {hiragana: "べ", ramans: ["be"]},
  {hiragana: "ぼ", ramans: ["bo"]},
  {hiragana: "ぱ", ramans: ["pa"]},
  {hiragana: "ぴ", ramans: ["pi"]},
  {hiragana: "ぷ", ramans: ["pu"]},
  {hiragana: "ぺ", ramans: ["pe"]},
  {hiragana: "ぽ", ramans: ["po"]},
  {hiragana: "ん", ramans: ["N", "X"]},
  {hiragana: "ー", ramans: ["-"]},
  {hiragana: "　", ramans: [" "]}
]

const xx = "qwrtypsdfghjkzcvbmQWRTYPSDFGHJKZCVBM"

export function convert(hiragana: string): TypingRamans {
  return [hiragana, hiragana, hiragana].map( (base: string, index: number) => {
    conversionTable.forEach( element => {
      let hira: RegExp = new RegExp(element.hiragana, 'g')
      let j = Math.min(element.ramans.length - 1, index)
      let raman: string = element.ramans[j]

      base = base.replace(hira, raman)
    })

    while(base.indexOf('っ') >= 0) {
      let kkIndex = base.indexOf('っ')

      let nextChar = base[kkIndex+1]
      if(nextChar === undefined || xx.indexOf(nextChar) < 0) {
        base = base.replace('っ', ['xtu', 'ltu', 'ltu'][index])
      } else {
        // 次の文字連打パターン
        base = base.replace('っ', nextChar.toLowerCase())
      }
    }
    return base
  })
}

export function initialState(hiragana: string): TypingState {
  let ramans = convert(hiragana)
  return {
    ramans: ramans,
    index: 0,
    lastResult: true,
    lastInput: "",
    mode: {
      mode: "Normal"
    }
  }
}

type DisplayRaman = string
export function displayTarget(ramans: TypingRamans): DisplayRaman {
  return ramans[0]
}

// かな入力用
type KeyState = {
  keyCode: number
  shift: boolean
}

type TypingInput = string

type Normal = {
  mode: "Normal"
}
type Force = {
  mode: "Force"
  forceKey: string
}
type Allow = {
  mode: "Allow"
  allowKey: string
}
type Ban = {
  mode: "Ban"
  banKey: string
}
type JudgeMode = Normal | Force | Allow | Ban

type KeyCheckResult = {
  success: boolean
  nextIndex: number
  nextMode: JudgeMode
  lastInput: TypingInput
}

export type TypingState = {
  ramans: TypingRamans
  index: number
  mode: JudgeMode
  lastResult: boolean
  lastInput: TypingInput
}

export function displayRaman(state: TypingState) {
  if(state.mode.mode === "Force") {
    return state.mode.forceKey + state.ramans[0].substr(state.index + 1)
  }
  return state.ramans[0].substr(state.index)
}

export function nextState(c: TypingInput, state: TypingState): TypingState {
  let i = state.index
  // モード別の処理
  if (state.mode.mode === "Force") {
    if(state.mode.forceKey === c) {
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Normal",
        },
        lastInput: c
      }
    } else {
      return {
        ramans: state.ramans,
        lastResult: false,
        index: i,
        mode: {
          mode: "Force",
          forceKey: state.mode.forceKey
        },
        lastInput: c
      }
    }
  }

  // AllowモードはallowKeyの場合はインクリメントしないけどtrue判定
  if (state.mode.mode === "Allow") {
    if(state.mode.allowKey === c) {
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i,
        mode: {
          mode: "Normal",
        },
        lastInput: c
      }
    }
  }

  // BanはbanKeyを打ってしまったらミス
  if (state.mode.mode === "Ban") {
    if(state.mode.banKey === c) {
      return {
        ramans: state.ramans,
        lastResult: false,
        index: i,
        mode: {
          mode: "Ban",
          banKey: state.mode.banKey
        },
        lastInput: c
      }
    }
  }
  
  // when reference is uppercase, using special methods
  if(state.ramans.some(x => x[i] === c.toUpperCase())) {
    let upper = c.toUpperCase()
    if (upper === "C") { // "ち"をchiで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i,
        mode: {
          mode: "Force",
          forceKey: "h"
        },
        lastInput: c
      }
    } else if (upper === "J"){ // "じゃ"をjyaで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Allow",
          allowKey: "y"
        },
        lastInput: c
      }
    } else if (upper === "N") { // "ん"をnnで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Allow",
          allowKey: "n"
        },
        lastInput: c
      }
    } else if (upper === "S") { // "し"をshiで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Allow",
          allowKey: "h"
        },
        lastInput: c
      }
    } else if (upper === "T") { // "ちゃ"をthaで打たせない
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Ban",
          banKey: "h"
        },
        lastInput: c
      }
    } else if (upper === "U") { // "うぉ"をuhoで打たせない
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Ban",
          banKey: "h"
        },
        lastInput: c
      }
    } else if (upper === "W") { // "うぃ"をwhiでミスにしない
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i+1,
        mode: {
          mode: "Allow",
          allowKey: "h"
        },
        lastInput: c
      }
    } else if (upper === "X") { // "ん"をxnで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i,
        mode: {
          mode: "Force",
          forceKey: "n"
        },
        lastInput: c
      }
    } else if (upper === "Z") { // "じゃ"をzyaで打つ
      return {
        ramans: state.ramans,
        lastResult: true,
        index: i,
        mode: {
          mode: "Force",
          forceKey: "y"
        },
        lastInput: c
      }
    }
  }

  if(state.ramans.some(x => x[i] === c)) {
    return {
      ramans: state.ramans,
      lastResult: true,
      index: i+1,
      mode: {
        mode: "Normal",
      },
      lastInput: c
    }
  }
  return {
    ramans: state.ramans,
    lastResult: false,
    index: i,
    mode: state.mode,
    lastInput: c
  }
}