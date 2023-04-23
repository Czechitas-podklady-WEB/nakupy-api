export interface Recipe {
  id: string,
  title: string,
  imageUrl: string,
}

export const initRecipes = (serverUrl: string): Recipe[] => [
  {
    id: 'VAV9NU0U',
    title: 'Bábovka s ořechy',
    imageUrl: `${serverUrl}/assets/recipes/babovka-s-orechy.jpg`,
  },
  {
    id: 'KZ0FCiiX',
    title: 'Dukátové buchtičky s vanilkovým krémem',
    imageUrl: `${serverUrl}/assets/recipes/dukatove-buchticky-s-vanilkovym-kremem.jpg`,
  },
  {
    id: '6uphB7Ut',
    title: 'Hovězí guláš s karlovarským knedlíkem',
    imageUrl: `${serverUrl}/assets/recipes/hovezi-gulas-s-karlovarskym-knedlikem.jpg`,
  },
  {
    id: 'LIKtcsP5',
    title: 'Rajská omáčka s hovězím masem',
    imageUrl: `${serverUrl}/assets/recipes/rajska-omacka-s-hovezim-masem.jpg`,
  },
  {
    id: '8K9go0Pl',
    title: 'Sekaná',
    imageUrl: `${serverUrl}/assets/recipes/sekana.jpg`,
  },
  {
    id: 'f6C-qIzO',
    title: 'Vepřový vrabec',
    imageUrl: `${serverUrl}/assets/recipes/veprovy-vrabec.jpg`,
  },
];
