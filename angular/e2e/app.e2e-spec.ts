import { LibraryTemplatePage } from './app.po';

describe('Library App', function() {
  let page: LibraryTemplatePage;

  beforeEach(() => {
    page = new LibraryTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
