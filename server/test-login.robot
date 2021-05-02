*** Settings ***
Documentation     Test Login page Functionality.
Library           Selenium2Library
Resource          source-login.robot

*** Variables ***
${URL}      http://103.212.180.236:3000/login
${BROWSER}        Chrome
${valid_username}     admin
${valid_password}     1234
${invalid_username}     pool
${invalid_password}     2323


*** Test Cases ***
Valid Login
    [Documentation]         Test Login Page Functionality when valid username and password are entered
    Valid Login
    
    

Invalid username
    [Documentation]         Test Login Page Functionality when invalid username and valid password are entered
    Open Browser To Specific Page
    Input Username    ${invalid_username}
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Username is not valid
    [Teardown]    Close Browser
    

Invalid password
    [Documentation]         Test Login Page Functionality when valid username and invalid password are entered
    Open Browser To Specific Page
    Input Username    ${valid_username}
    Input Password   ${invalid_password}
    Submit Credentials
    Wait Until Page Contains       Username or password wrong
    [Teardown]    Close Browser

Blank username
    [Documentation]         Test Login Page Functionality when only valid password is entered
    Open Browser To Specific Page
    
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Please Enter Username
    [Teardown]    Close Browser

Blank password
   [Documentation]         Test Login Page Functionality when only valid username is entered 
    Open Browser To Specific Page
    Input Username    ${valid_username}
    Submit Credentials
    Wait Until Page Contains       Please enter Password
    [Teardown]    Close Browser

Register Button
   [Documentation]         Test if Register link in Login page led to correct path
    Open Browser To Specific Page
    Click Register Link    li-regist
    Wait Until Page Contains        Register
    [Teardown]    Close Browser


*** Keywords ***

Click Register Link 
    [Arguments]     ${link}
    Click Link    ${link}
