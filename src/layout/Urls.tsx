export const myUrl = {
  top: '/', // FIREシミュレーターページ

  fukuri: '/fukuri',
  tax: '/tax',
  annuity: '/annuity',
  examKamiShimoById (id: string) {
    return '/exam/kamishimo/' + id
  },
  examShimoKamiById (id: string) {
    return '/exam/shimokami/' + id
  },
  examShimoKamiCardById (id: string) {
    return '/exam/shimokamicard/' + id
  }
}
