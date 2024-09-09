// cypress/pages/registerPage.js
const { faker } = require('@faker-js/faker');

class RegisterPage {
  constructor() {
    // Selectores para el formulario de registro inicial
    this.nameInput = '[data-qa="signup-name"]';
    this.emailInput = '[data-qa="signup-email"]';
    this.signupButton = '[data-qa="signup-button"]';
    
    // Selectores para el formulario completo de detalles
    this.genderRadio = '#id_gender2';
    this.nameDetailInput = '[data-qa="name"]';
    this.emailDetailInput = '[data-qa="email"]';
    this.passwordInput = '[data-qa="password"]';
    this.daysSelect = '[data-qa="days"]';
    this.monthsSelect = '[data-qa="months"]';
    this.yearsSelect = '[data-qa="years"]';
    this.optinCheckbox = '#optin';
    this.firstNameInput = '[data-qa="first_name"]';
    this.lastNameInput = '[data-qa="last_name"]';
    this.addressInput = '[data-qa="address"]'; // Campo de dirección
    this.countrySelect = '[data-qa="country"]';
    this.stateInput = '[data-qa="state"]';
    this.cityInput = '[data-qa="city"]';
    this.zipcodeInput = '[data-qa="zipcode"]';
    this.mobileNumberInput = '[data-qa="mobile_number"]';
    this.createAccountButton = '[data-qa="create-account"]';
    this.accountCreatedNotification = '[data-qa="account-created"]';
    this.continueButton = '[data-qa="continue-button"]';
    this.finalNotification = '.active > :nth-child(1) > h1';
  }

  // Método para generar y guardar datos aleatorios
  generateRandomUserData() {
    const randomName = faker.name.firstName() + ' ' + faker.name.lastName();
    const randomEmail = faker.internet.email().toLowerCase();
    const randomPassword = faker.internet.password(12);
    const randomAddress = faker.address.streetAddress(); // Genera una dirección aleatoria
    const randomZipcode = faker.address.zipCode('#####');
    const randomMobile = faker.phone.number('#########');
    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();

    const userData = {
      name: randomName,
      email: randomEmail,
      password: randomPassword,
      address: randomAddress,
      zipcode: randomZipcode,
      mobile: randomMobile,
      firstName: randomFirstName,
      lastName: randomLastName,
    };

    // Guardar los datos generados en un archivo fixtures usando Cypress
    cy.writeFile('cypress/fixtures/data.json', userData);

    return userData;
  }

  // Método para llenar el formulario de registro inicial
  registerNewUser() {
    const userData = this.generateRandomUserData();

    // Verifica los valores antes de usarlos
    console.log('User Data:', userData);

    // Asegúrate de que name y email no sean undefined
    cy.get(this.nameInput).type(userData.name || 'Default Name'); // Llena el nombre
    cy.get(this.emailInput).type(userData.email || 'default@example.com'); // Llena el correo electrónico
    cy.get(this.signupButton).click(); // Clic en el botón de registro
  }

  // Método para llenar el formulario de detalles después del registro
  fillDetailsForm() {
    cy.fixture('data.json').then((user) => {
      cy.get(this.genderRadio).click();
      cy.get(this.nameDetailInput).should('have.value', user.name);
      cy.get(this.emailDetailInput).should('have.value', user.email);
      cy.get(this.passwordInput).type(user.password);
      cy.get(this.daysSelect).select(String(faker.number.int({ min: 1, max: 20 })));
      cy.get(this.monthsSelect).select(String(faker.number.int({ min: 1, max: 12 })));
      cy.get(this.yearsSelect).select('1980');
      cy.get(this.optinCheckbox).check();
      cy.get(this.firstNameInput).type(user.firstName);
      cy.get(this.lastNameInput).type(user.lastName);
      cy.get(this.addressInput).type(user.address); // Llenado del campo de dirección
      cy.get(this.countrySelect).select('United States');
      cy.get(this.stateInput).type('Santiago');
      cy.get(this.cityInput).type('Santiago');
      cy.get(this.zipcodeInput).type(user.zipcode);
      cy.get(this.mobileNumberInput).type(user.mobile);
      cy.get(this.createAccountButton).click();
      cy.get(this.accountCreatedNotification).should('be.visible');
      cy.get(this.continueButton).click();
      cy.get(this.finalNotification).should('contain', 'AutomationExercise');
    });
  }
}

export default RegisterPage;
