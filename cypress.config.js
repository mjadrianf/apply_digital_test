// cypress.config.js
const { lighthouse, prepareAudit } = require('cypress-audit');
const webpack = require('@cypress/webpack-preprocessor');
const path = require('path'); // Importa el módulo path para manejar rutas

module.exports = {
  projectId: '8j5ed9', // Asegúrate de que este ID coincida con tu Project ID en Cypress Cloud
  experimentalStudio: true,
  e2e: {
    setupNodeEvents(on, config) {
      // Configuración de Lighthouse
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions); // Configura el navegador para realizar auditorías con Lighthouse
      });

      on('task', {
        lighthouse: lighthouse(), // Registra la tarea de Lighthouse
      });

      // Configuración de Webpack para el manejo de importaciones y alias
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              '@pages': path.resolve(__dirname, 'cypress/pages'), // Alias para acceder fácilmente a la carpeta de páginas
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensiones que Webpack reconocerá
          },
        },
      };

      // Registra el preprocesador de Webpack para manejar las rutas correctamente
      on('file:preprocessor', webpack(options));

      return config;
    },
  },
};

