// productPage.js
class ProductPage {
    selectThirdProduct() {
      cy.get('.product-grid .col-sm-4').eq(2).click(); // Selecciona el tercer producto
    }
  
    enterRandomQuantity() {
      const randomQuantity = Math.floor(Math.random() * 20) + 1;
      cy.get('#quantity').clear().type(randomQuantity.toString());
    }
  
    addToCart() {
      cy.get('.add-to-cart').click();
    }
  }
  
  export default ProductPage;