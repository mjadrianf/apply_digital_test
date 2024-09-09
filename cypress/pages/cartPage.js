// cartPage.js
class CartPage {
    proceedToCheckout() {
      cy.get('.checkout-button').click();
      cy.get('#loginModal').should('be.visible'); // Validación de la aparición del modal de Login/Registro
    }
  }
  
  export default CartPage;