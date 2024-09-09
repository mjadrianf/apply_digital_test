// cypress.config.js
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = {
  projectId: '8j5ed9', // Asegúrate de que este ID coincida con tu Project ID en Cypress Cloud
  e2e: {
    setupNodeEvents(on, config) {
      // Configuración para preparar el navegador para Lighthouse
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      // Registro de la tarea de Lighthouse
      on('task', {
        lighthouse: lighthouse(), // Registra la tarea de Lighthouse
      });

      return config;
    },
  },
};