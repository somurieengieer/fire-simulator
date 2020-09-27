import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'

fixture('Getting started').page('http://localhost:3000/annuity')

async function checkValueByTitle (t: TestController, title: string, value: string) {
  return t
    .expect(Selector('th').withText(title)
      .parent().find('td > input').value)
    .eql(value)
}

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
