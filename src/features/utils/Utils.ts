// 汎用的処理

export function numberFixed(value: number): string {
  return value.toFixed(1)
}

// 数字を半角から全角に変換
export function numberFromHalfWidthToFullWidth(n: number): string {
  return n.toString()
    .replace(/[0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    })
}

export function manYen(yen: number | string | undefined): number {
  // return Number(yen || 0)
  return Math.round(Number(yen || 0) * 12 / 1000) / 10
}

export function empty(value: string | number): boolean {
  if (typeof value === "string") {
    return value.length === 0
  }
  return value.toString().length === 0
}

