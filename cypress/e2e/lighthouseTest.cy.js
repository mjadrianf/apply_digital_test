// lighthouseTest.cy.js
describe('Accessibility and Performance Test with Lighthouse', () => {
    it('should run Lighthouse audit on the home page', () => {
      cy.visit('https://automationexercise.com/');
  
      // Ejecutar Lighthouse y evaluar accesibilidad, rendimiento, etc.
      cy.lighthouse({
        performance: 85, // Valores de referencia (thresholds) para rendimiento
        accessibility: 90, // Valores de referencia para accesibilidad
        'best-practices': 85,
        seo: 85,
        pwa: 50, // Opcional: puntuación para Progressive Web App
      }).then((results) => {
        cy.log('Lighthouse Results:', results);
      });
    });
  });
  
