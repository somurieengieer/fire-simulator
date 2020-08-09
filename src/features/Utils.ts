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