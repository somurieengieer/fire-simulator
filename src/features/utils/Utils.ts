// 汎用的処理

export function numberFixed (value: number): number {
  return Number(value.toFixed(0))
}

// 数字を半角から全角に変換
export function numberFromHalfWidthToFullWidth (n: number): string {
  return n.toString()
    .replace(/[0-9]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
    })
}

export function manYen (yen: number | string | undefined): number {
  return Math.round(Number(yen || 0) / 10000)
}

export function empty (value: string | number): boolean {
  if (typeof value === 'string') {
    return value.length === 0
  }
  return value.toString().length === 0
}

export function sumAmount (ary: { amount?: string | number }[]) {
  return Math.round(ary.map(ded => Number(ded.amount || 0))
    .reduce((a, b) => a + b) || 0)
}

export function sum (ary: number[]) {
  return Math.round(ary.reduce((a, b) => a + b) || 0)
}
