# Cypress Automation Framework for Clothing Store Website

This project implements an automation framework using Cypress to test critical user flows on the [Automation Exercise](https://automationexercise.com/) website. The framework is designed to test a single user flow that adapts to both desktop and mobile viewports. Additionally, optional accessibility and performance testing is integrated using Lighthouse.

## Table of Contents

- [Framework Selection](#framework-selection)
- [Test Case Design](#test-case-design)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Tests](#running-the-tests)
- [Accessibility and Performance Testing](#accessibility-and-performance-testing)
- [Lighthouse Integration Documentation](#lighthouse-integration-documentation)
- [Test Report](#test-report)
- [Troubleshooting](#troubleshooting)
- [Feedback](#feedback)

## Framework Selection

**Chosen Framework: Cypress**

Cypress was chosen for its ease of use, strong community support, and robust testing features. It allows real-time reloading, easy debugging, and seamless integration with additional libraries such as Faker for generating random data and Lighthouse for accessibility and performance testing.

## Test Case Design

### Preconditions

- Cypress is installed and configured.
- The website `https://automationexercise.com/` is accessible.

### Test Steps

1. Navigate to the website.
2. Go to the Products section.
3. Choose the third product shown in the product list and view its details.
4. Enter a random quantity between 1 and 20.
5. Add the product to the cart.
6. Proceed to checkout.
7. (Optional) Register a new user account using random data.
8. (Optional) Confirm the order and log out.

### Expected Results

- The user should be able to add a product to the cart and proceed to checkout.
- (Optional) The user should be able to register, complete an order, and log out successfully.

## Project Structure

```plaintext
/cypress
  /e2e
    productPurchase.cy.js      # Main test script
    lighthouseTest.cy.js       # Accessibility and performance test script (optional)
  /pages
    homePage.js                # Page Object for the home page
    productPage.js             # Page Object for the product page
    cartPage.js                # Page Object for the cart and checkout
  /fixtures
    testData.json              # Fixture data for tests (optional)
  /support
    commands.js                # Custom commands
    index.js                   # Index file for support configurations
cypress.config.js              # Cypress configuration file
package.json                   # Node.js dependencies
README.md                      # Documentation


# Setup and Installation

## Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

## Install the dependencies:

```bash
npm install
```

## Ensure your Cypress Project ID and Record Key are set up correctly:

- Update `cypress.config.js` with your project ID.
- Use the Record Key provided to you when running tests with recording.

# Running the Tests

## To run the main test suite, use:

```bash
npx cypress run --record --key 7fd66628-1f11-4099-bb96-8ccaaa5b301f
```

## You can also run individual tests by specifying the spec file:

```bash
npx cypress run --spec "cypress/e2e/productPurchase.cy.js" --record --key 7fd66628-1f11-4099-bb96-8ccaaa5b301f
```

# Accessibility and Performance Testing

## Lighthouse Integration

Lighthouse tests are configured to assess accessibility, performance, and best practices.

### To run Lighthouse tests:

```bash
npx cypress run --spec "cypress/e2e/lighthouseTest.cy.js" --record --key 7fd66628-1f11-4099-bb96-8ccaaa5b301f
```

Results will include accessibility and performance scores, which can be found in the Cypress Cloud dashboard.

### Thresholds

- Performance: 85
- Accessibility: 90
- Best Practices: 85
- SEO: 85
- PWA: 50 (optional)

# Lighthouse Integration Documentation

## Overview

Lighthouse is an open-source, automated tool used to improve the quality of web pages. It audits for performance, accessibility, progressive web apps, SEO, and more. Integrating Lighthouse with Cypress allows you to run these audits as part of your automated testing workflow, ensuring that your application maintains high standards.

## Installation

To integrate Lighthouse into your Cypress tests, you need to install the following dependencies:

```bash
npm install cypress-audit lighthouse --save-dev
```

## Configuration

Update your Cypress configuration (`cypress.config.js`) to include the necessary setup for `cypress-audit`:

```javascript
// cypress.config.js
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = {
  projectId: '8j5ed9', // Ensure this matches your Cypress Cloud Project ID
  e2e: {
    setupNodeEvents(on, config) {
      // Set up plugins for Lighthouse
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions); // Prepare the browser to run Lighthouse audits
      });

      on('task', {
        lighthouse: lighthouse(), // Run Lighthouse as a task within Cypress
      });

      return config;
    },
  },
};
```

## Writing a Lighthouse Test

Here is an example test that runs a Lighthouse audit to check accessibility and performance:

```javascript
// lighthouseTest.cy.js
describe('Accessibility and Performance Test with Lighthouse', () => {
  it('should run Lighthouse audit on the home page', () => {
    cy.visit('https://automationexercise.com/');

    // Run Lighthouse and check scores against defined thresholds
    cy.lighthouse({
      performance: 85,         // Performance score threshold
      accessibility: 90,       // Accessibility score threshold
      'best-practices': 85,    // Best practices score threshold
      seo: 85,                 // SEO score threshold
      pwa: 50,                 // PWA score threshold (optional)
    }).then((results) => {
      cy.log('Lighthouse Results:', results); // Log results for review
    });
  });
});
```

## Viewing Results

- **Performance:** Measures how fast the page loads and responds to user interactions.
- **Accessibility:** Assesses the accessibility features of the page, including color contrast and screen reader compatibility.
- **Best Practices:** Checks for web development best practices.
- **SEO:** Evaluates search engine optimization factors.
- **PWA:** (Optional) Reviews the site's Progressive Web App characteristics.

These results help identify areas of improvement, ensuring your application is accessible, performant, and built following best practices.

# Test Report

Test reports are generated automatically and can be accessed on Cypress Cloud. The results include:

- **Status of test execution (pass/fail):** Review detailed logs for each test step.
- **Issues or failures encountered:** View video recordings and screenshots of failed tests.
- **Lighthouse scores:** View detailed accessibility and performance metrics.

## Optional Reporting with Mochawesome

To generate a more detailed HTML report locally, you can use Mochawesome:

### Install Mochawesome:

```bash
npm install --save-dev mochawesome
```

### Configure Cypress to use Mochawesome in `cypress.config.js`:

```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
},
```

### Run your tests and check the `cypress/reports` directory for the generated report.

# Troubleshooting

- **Invalid Record Key:** Verify that the key provided matches the Cypress Cloud project settings.
- **Browser Launch Issues:** Ensure all browser dependencies are up-to-date and compatible with Cypress.
- **Network Errors:** Check that the target website is accessible and not blocked by any firewall or proxy.

# Feedback

Feedback on the test implementation will be provided during the technical interview session. Key areas of evaluation include:

- Proper usage and implementation of Cypress.
- Effective data management and use of libraries like Faker.
- Code quality, modularity, and maintainability.
- Execution of tests and quality of reporting.
- (Optional) Accessibility and performance testing using Lighthouse.
