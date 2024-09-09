// cypress/e2e/lighthouseTest.cy.js
describe('Accessibility and Performance Test with Lighthouse', () => {
  it('should run Lighthouse audit on the home page', () => {

    cy.visit('https://automationexercise.com/');

  
    cy.task('lighthouse', {
      performance: 85,         // Umbral de rendimiento
      accessibility: 90,       // Umbral de accesibilidad
      'best-practices': 85,    // Umbral de mejores prácticas
      seo: 85,                 // Umbral de SEO
      pwa: 50,                 // Umbral de PWA (opcional)
    }).then((results) => {
      // Verifica que los resultados no sean null o undefined
      if (results) {
       
        cy.writeFile('cypress/reports/lighthouseResults.json', results);
       
        cy.log('Lighthouse Results:', results);
      } else {
      
        cy.log('Lighthouse did not return valid results.');
        throw new Error('Lighthouse results are null or undefined.');
      }
    });
  });
});
