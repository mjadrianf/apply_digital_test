// cartPage.js
class CartPage {
    proceedToCheckout() {
      cy.get('.nav.navbar-nav > li:nth-of-type(3) > a').click();
      cy.get('.btn.btn-default.check_out').should('be.visible').click();
       cy.get ('.modal-content u').click()// .modal-content u Validación de la aparición del modal de Login/Registro
    }
  }
  
  export default CartPage;