import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('fitness-tracker App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    // this is needed, because the app is still loading when I want to access an element, so it would crash
    browser.waitForAngularEnabled(false);
    page.navigateTo();
  });

  it('should login', () => {
    element(by.css('[name="login"]')).click();
    element(by.css('[name="email"]')).sendKeys('andrszollai@gmail.com');
    element(by.css('[name="password"]')).sendKeys('Abc123456');
    element(by.css('[type="submit"]')).click();
    browser.sleep(1000);
    expect(browser.driver.getCurrentUrl()).toEqual(browser.baseUrl + '/training');
    expect(element(by.css('.mat-card-title')).getText()).toEqual('Time to start workout!');
  });

  /*
   *We will be already logged in, because of firebase's token is already set.
   */
  it('should start and stop new Training and check if its created', () => {

    // Go to Past Exercises and check the number of the current number of trainings
    browser.sleep(5000);
    element.all(by.css('.mat-tab-label')).get(1).click();
    browser.sleep(1000);
    let numberOfTrainingsBeforeNewTraining = 0;
    element(by.css('.mat-paginator-range-label')).getText().then(text => {
      numberOfTrainingsBeforeNewTraining = +text.slice(-1)[0];
      console.log(numberOfTrainingsBeforeNewTraining);
    });

    // Go back to New Exercise, select Touched Toes, start training
    element.all(by.css('.mat-tab-label')).get(0).click();
    browser.sleep(1000);
    element(by.css('.mat-select-value')).click();
    element.all(by.css('.mat-option-text')).get(2).click();
    element(by.css('[type="submit"]')).click();

    // Wait a bit, stop training, click 'yes' on dialog
    browser.sleep(3000);
    element(by.css('.mat-raised-button')).click();
    browser.sleep(2000);
    element.all(by.css('.mat-button')).get(0).click();

    // (Automatically we are going back to New Exercise), go to Past Exercises, check the number of Exercises, compare
    browser.sleep(1000);
    element.all(by.css('.mat-tab-label')).get(1).click();
    browser.sleep(1000);
    let numberOfTrainingsAfterNewTraining = 0;
    element(by.css('.mat-paginator-range-label')).getText().then(text => {
      numberOfTrainingsAfterNewTraining = +text.slice(-1)[0];
      console.log(numberOfTrainingsBeforeNewTraining, numberOfTrainingsAfterNewTraining);
      expect(numberOfTrainingsAfterNewTraining).toEqual(numberOfTrainingsBeforeNewTraining + 1);
    });
  });
});
