import { ServerlessBlogPage } from './app.po';

describe('serverless-blog App', () => {
  let page: ServerlessBlogPage;

  beforeEach(() => {
    page = new ServerlessBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
