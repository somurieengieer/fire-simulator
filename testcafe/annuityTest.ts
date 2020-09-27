import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'

fixture('Getting started').page('http://localhost:3000/annuity')

async function checkValueByTitle (t: TestController, title: string, value: string) {
  return t
    .expect(Selector('th').withText(title)
      .parent().find('td > input').value)
    .eql(value)
}
// interface ValueAndTitle {
//   title: string
//   value: string
// }
// async function checkValueByTitleAll (t: TestController, title: string, value: string) {
//
// }

async function replaceInputValue (t: TestController, selector: Selector, value: string) {
  await t
    .click(selector)
    .pressKey('ctrl+a delete')
    .typeText(selector, value) // 追加入力
    .pressKey('delete')
}

test('My first test', async (t: TestController) => {
  await checkValueByTitle(t, '納付年数', '10')

  const annuityTable = ReactSelector('AnnuityTable').nth(0)
    .find('td > input')
  await replaceInputValue(t, annuityTable, '20')

  await checkValueByTitle(t, '納付年数', '20')

  // ------ Sample ------
  // await t
  //   .typeText('#developer-name', 'wakamsha') // 2.
  //   .click('#submit-button') // 3.
  //   .expect(Selector('#article-header').innerText) // 4-a.
  //   .eql('Thank you, wakamsha!') // 4-b.
})

test('Default Value', async (t: TestController) => {
  await checkValueByTitle(t, '納付年数', '10')
  await checkValueByTitle(t, '納付年数1', '10')
  await checkValueByTitle(t, '平均標準報酬額1', '600')
  await checkValueByTitle(t, '納付年数2', '20')
  await checkValueByTitle(t, '平均標準報酬額2', '300')
  await checkValueByTitle(t, '納付年数3', '0')
  await checkValueByTitle(t, '平均標準報酬額3', '0')
  await checkValueByTitle(t, '納付年数4', '0')
  await checkValueByTitle(t, '平均標準報酬額4', '0')
  await checkValueByTitle(t, '受取年金', '144')
  await checkValueByTitle(t, '老齢基礎年金', '78')
  await checkValueByTitle(t, '老齢厚生年金', '66')
  await checkValueByTitle(t, '納付金額合計', '1296')
  await checkValueByTitle(t, '受取年金合計(65〜84歳受取)', '2880')
  await checkValueByTitle(t, 'リターン率', '2.22')
  await checkValueByTitle(t, '納付金額合計(法人支払い分を含む)', '2394')
  await checkValueByTitle(t, 'リターン率(法人支払い分を含む)', '1.2')
})
