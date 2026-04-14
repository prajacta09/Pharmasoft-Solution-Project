Feature: Test Allure Report Generation

  Scenario: Generate sample test results
    Given I have a working test framework
    When I run a simple test
    Then the test should pass
    And Allure report should be generated
