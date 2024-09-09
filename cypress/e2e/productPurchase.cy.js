import HomePage from '../pages/homePage';
import ProductPage from '../pages/productPage';
import CartPage from '../pages/cartPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

describe('Automated Purchase Flow', () => {
  it('Should navigate, add a random quantity of the third product to the cart, and proceed to checkout', () => {
    cy.viewport('macbook-15'); 
    homePage.visitHomePage();
    homePage.navigateToProducts();
    productPage.selectThirdProduct();
    productPage.enterRandomQuantity();
    productPage.addToCart();
    cartPage.proceedToCheckout();
  });
});