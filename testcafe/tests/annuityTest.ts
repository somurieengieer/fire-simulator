import { Selector } from 'testcafe'

// ---------------------------------------------------------
// 全体のテスト方針
// ・主要なケースのみをテスト対象とする
// ・パターン1のみテスト
// ・
// ---------------------------------------------------------

fixture('年金計算テスト').page('http://web:3000/annuity')

async function replaceValue (t: TestController, selector: Selector, value: string) {
  await t
    .click(selector)
    .pressKey('ctrl+a delete')
    .typeText(selector, value) // 追加入力
    .pressKey('delete')
}

function getElementBy (title: string): Selector {
  return Selector('th').withText(title)
    .parent().find('td > input')
}

async function checkValueByTitle (t: TestController, title: string, value: string) {
  return t.expect(Selector('th').withText(title)
    .parent().find('td > input').value)
    .eql(value)
  // 以下の書き方をしてSelectorをメソッド化するとWarningが出る（解決策なさそうなので諦め）
  // const selector = getElementBy(title)
  // return t
    // .expect(selector.value)
    // .eql(value)
}
interface ValueAndTitle {
  title: string
  value: string
}
async function checkValueByTitleAll (t: TestController, valueAndTitles: ValueAndTitle[]) {
  return Promise.all(valueAndTitles.map(async ({ title, value }) => {
    await checkValueByTitle(t, title, value)
  }))
}

async function replaceValueByTitle (t: TestController, title: string, value: string) {
  const selector = getElementBy(title)
  await replaceValue(t, selector, value)
}
async function replaceValueByTitleAll (t: TestController, valueAndTitles: ValueAndTitle[]) {
  return Promise.all(valueAndTitles.map(async ({ title, value }) => {
    await replaceValueByTitle(t, title, value)
  }))
}

// ==========================================================================================
// ここから下テストケース
// ==========================================================================================

test('初期表示（国民年金＋厚生年金）', async (t: TestController) => {
  await checkValueByTitleAll(t, [
    { title: '納付年数', value: '10' },
    { title: '納付年数1', value: '10' },
    { title: '平均標準報酬額1', value: '600' },
    { title: '納付年数2', value: '20' },
    { title: '平均標準報酬額2', value: '300' },
    { title: '納付年数3', value: '0' },
    { title: '平均標準報酬額3', value: '0' },
    { title: '納付年数4', value: '0' },
    { title: '平均標準報酬額4', value: '0' },
    { title: '受取年金', value: '144' },
    { title: '老齢基礎年金', value: '78' },
    { title: '老齢厚生年金', value: '66' },
    { title: '納付金額合計', value: '1296' },
    { title: '受取年金合計(65〜84歳受取)', value: '2880' },
    { title: 'リターン率', value: '2.22' },
    { title: '納付金額合計(法人支払い分を含む)', value: '2394' },
    { title: 'リターン率(法人支払い分を含む)', value: '1.2' }
  ])
})

test('国民年金のみ', async (t: TestController) => {
  await replaceValueByTitleAll(t, [
    { title: '納付年数', value: '40' },
    { title: '納付年数1', value: '0' },
    { title: '平均標準報酬額1', value: '0' },
    { title: '納付年数2', value: '0' },
    { title: '平均標準報酬額2', value: '0' },
    { title: '納付年数3', value: '0' },
    { title: '平均標準報酬額3', value: '0' },
    { title: '納付年数4', value: '0' },
    { title: '平均標準報酬額4', value: '0' }
  ])

  await checkValueByTitleAll(t, [
    { title: '納付年数', value: '40' },
    { title: '納付年数1', value: '0' },
    { title: '平均標準報酬額1', value: '0' },
    { title: '納付年数2', value: '0' },
    { title: '平均標準報酬額2', value: '0' },
    { title: '納付年数3', value: '0' },
    { title: '平均標準報酬額3', value: '0' },
    { title: '納付年数4', value: '0' },
    { title: '平均標準報酬額4', value: '0' },
    { title: '受取年金', value: '78' },
    { title: '老齢基礎年金', value: '78' },
    { title: '老齢厚生年金', value: '0' },
    { title: '納付金額合計', value: '794' },
    { title: '受取年金合計(65〜84歳受取)', value: '1560' },
    { title: 'リターン率', value: '1.97' },
    { title: '納付金額合計(法人支払い分を含む)', value: '794' },
    { title: 'リターン率(法人支払い分を含む)', value: '1.97' }
  ])
})

test('厚生年金のみ', async (t: TestController) => {
  await replaceValueByTitleAll(t, [
    { title: '納付年数', value: '0' },
    { title: '納付年数1', value: '40' },
    { title: '平均標準報酬額1', value: '600' },
    { title: '納付年数2', value: '0' },
    { title: '平均標準報酬額2', value: '0' },
    { title: '納付年数3', value: '0' },
    { title: '平均標準報酬額3', value: '0' },
    { title: '納付年数4', value: '0' },
    { title: '平均標準報酬額4', value: '0' }
  ])

  await checkValueByTitleAll(t, [
    { title: '納付年数', value: '0' },
    { title: '納付年数1', value: '40' },
    { title: '平均標準報酬額1', value: '600' },
    { title: '納付年数2', value: '0' },
    { title: '平均標準報酬額2', value: '0' },
    { title: '納付年数3', value: '0' },
    { title: '平均標準報酬額3', value: '0' },
    { title: '納付年数4', value: '0' },
    { title: '平均標準報酬額4', value: '0' },
    { title: '受取年金', value: '210' },
    { title: '老齢基礎年金', value: '78' },
    { title: '老齢厚生年金', value: '132' },
    { title: '納付金額合計', value: '2196' },
    { title: '受取年金合計(65〜84歳受取)', value: '4200' },
    { title: 'リターン率', value: '1.91' },
    { title: '納付金額合計(法人支払い分を含む)', value: '4392' },
    { title: 'リターン率(法人支払い分を含む)', value: '0.96' }
  ])
})
