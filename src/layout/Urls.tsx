export const myUrl = {
  top: '/',

  fukuri: '/fukuri',
  fire: '/fire',
  tax: '/tax',
  annuity: '/annuity',
  examKamiShimoById(id: string) {
    return '/exam/kamishimo/' + id
  },
  examShimoKamiById(id: string) {
    return '/exam/shimokami/' + id
  },
  examShimoKamiCardById(id: string) {
    return '/exam/shimokamicard/' + id
  },
};
