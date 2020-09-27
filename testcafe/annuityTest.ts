import { Selector } from 'testcafe'

fixture('Getting started').page('http://localhost:3000/annuity')

async function checkValueByTitle (t: TestController, title: string, value: string) {
  return t
    .expect(Selector('th').withText(title)
      .parent().find('td > input').value)
    .eql(value)
}

test('My first test', async (t: TestController) => {
  await checkValueByTitle(t, '納付年数', '10')

  // ------ Sample ------
  // await t
  //   .typeText('#developer-name', 'wakamsha') // 2.
  //   .click('#submit-button') // 3.
  //   .expect(Selector('#article-header').innerText) // 4-a.
  //   .eql('Thank you, wakamsha!') // 4-b.
})
