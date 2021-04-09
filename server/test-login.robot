*** Settings ***
Documentation     Test Login page Functionality.
Library           Selenium2Library
Resource          source-login.robot

*** Variables ***
${URL}      http://localhost:3000/login
${BROWSER}        Chrome
${invalid_username}     pool
${invalid_password}     2323


*** Test Cases ***
Valid Login
    Valid Login
    [Teardown]    Close Browser
    

Invalid username
    Open Browser To Specific Page
    Input Username    ${invalid_username}
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Username is not valid
    [Teardown]    Close Browser
    

Invalid password
    Open Browser To Specific Page
    Input Username    ${valid_username}
    Input Password   ${invalid_password}
    Submit Credentials
    Wait Until Page Contains       Username or password wrong
    [Teardown]    Close Browser

Blank username
    Open Browser To Specific Page
    
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Please Enter Username
    [Teardown]    Close Browser

Blank password
    Open Browser To Specific Page
    Input Username    ${valid_username}
    Submit Credentials
    Wait Until Page Contains       Please enter Password
    [Teardown]    Close Browser

Register Button
    Open Browser To Specific Page
    Click Register Link    li-regist
    Wait Until Page Contains        Register
    [Teardown]    Close Browser


*** Keywords ***

Click Register Link 
    [Arguments]     ${link}
    Click Link    ${link}
