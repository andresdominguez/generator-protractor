How to run the tests:

1. Generate a Protractor test:
yo protractor:unit test-name

2. Download the Protractor dependencies:
./node_modules/protractor/bin/install_selenium_standalone

3. Start the Selenium server:
./selenium/start

4. Run Protractor:
./node_modules/protractor/bin/protractor <%=configName%>