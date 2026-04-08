@smoke @regression
Feature: Validate navigation of all the menus

  Background:
    Given I launch the Pharmasoft homepage
    And the page loads successfully

  Scenario: List all available menus
    When I look for all navigation menus
    Then I should see the menu items listed
    And the navigation should be visible

  Scenario: Navigate to different menu sections
    When I list all available menu items
    Then I should be able to navigate to each menu
    And each navigation should load successfully
