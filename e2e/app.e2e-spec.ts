import { JokesAppPage } from './app.po';

describe('jokes-app App', () => {
  let page: JokesAppPage;

  beforeEach(() => {
    page = new JokesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
