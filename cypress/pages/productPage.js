// productPage.js
class ProductPage {
    selectThirdProduct() {
      cy.get('div:nth-of-type(5) > .product-image-wrapper > .choose > .nav.nav-justified.nav-pills  a').click(); // Selecciona el tercer producto
    }
  
    enterRandomQuantity() {
    
      const randomQuantity = Math.floor(Math.random() * 20) + 1;
      cy.get('input#quantity').clear().type(randomQuantity.toString());
    }
  
    addToCart() {
      cy.get('.btn.btn-default.cart').click();
      cy.get('.btn.btn-block.btn-success.close-modal').click();
    }
  }
  
  export default ProductPage;