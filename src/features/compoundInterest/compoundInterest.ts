// 複利の計算

export interface CompoundInterestProps {
  presentAmount?: number, //開始時資産
  reserveAmount: number, // 毎年加算する金額
  reserveYears: number,
  annualInterest: number, // 5%の場合5が入る
}

interface CompoundInterestByYear {
  year: number, // 何年目か。0〜reserveYearsを表す
  amount: number,
}

export interface CompoundInterestResult {
  result: CompoundInterestByYear[],
}

// 計算方法
// ・積立金額は年末に試算に追加される計算
export function calcCompoundInterestResult(
  props: CompoundInterestProps): CompoundInterestResult {

  console.log('props', props)

  let present = props.presentAmount || 0;
  let result: CompoundInterestByYear[] = [];
  for (let y = 0; y <= props.reserveYears; y++) {
    result.push({year: y, amount: present});
    present = (present * (1.0 + props.annualInterest/100) + props.reserveAmount)
  }
  return {result: result}
}
