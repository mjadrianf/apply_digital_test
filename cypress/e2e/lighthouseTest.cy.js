// cypress/e2e/lighthouseTest.cy.js
describe('Accessibility and Performance Test with Lighthouse', () => {
  it('should run Lighthouse audit on the home page', () => {
    // Visita la URL de la página que deseas auditar
    cy.visit('https://automationexercise.com/');

    // Ejecuta la tarea de Lighthouse con los umbrales deseados
    cy.task('lighthouse', {
      performance: 85,         // Umbral de rendimiento
      accessibility: 90,       // Umbral de accesibilidad
      'best-practices': 85,    // Umbral de mejores prácticas
      seo: 85,                 // Umbral de SEO
      pwa: 50,                 // Umbral de PWA (opcional)
    }).then((results) => {
      // Verifica que los resultados no sean null o undefined
      if (results) {
        // Guarda los resultados completos de Lighthouse en un archivo JSON
        cy.writeFile('cypress/reports/lighthouseResults.json', results);
        // Muestra los resultados en la consola (resumido)
        cy.log('Lighthouse Results:', results);
      } else {
        // Muestra un mensaje de error si los resultados son null
        cy.log('Lighthouse did not return valid results.');
        throw new Error('Lighthouse results are null or undefined.');
      }
    });
  });
});
