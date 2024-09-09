// homePage.js
class HomePage {
    visitHomePage() {
      cy.visit('https://automationexercise.com/');
    }
  
    navigateToProducts() {
      cy.get('a[href="/products"]').click();
    }
  }
  
  export default HomePage;