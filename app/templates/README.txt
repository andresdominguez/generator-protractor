How to run the tests:

1. Download the Selenium standalone server and the chrome driver.

Run:

./node_modules/protractor/bin/install_selenium_standalone

2. Start the Selenium server:

./selenium/start

3. Make sure you have at least one test in the <%=configName%> file.

You can generate a test by typing:

yo protractor:unit test-name

4. Done! Now you can run Protractor:

./node_modules/protractor/bin/protractor <%=configName%>
