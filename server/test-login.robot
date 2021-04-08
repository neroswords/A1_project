*** Settings ***
Documentation     Test Login page Functionality.
Library           Selenium2Library

*** Variables ***
${LOGIN URL}      http://localhost:3000/login
${BROWSER}        Chrome
${valid_username}     admin
${valid_password}     1234
${invalid_username}     pool
${invalid_password}     2323
${txt_message}         //div//textarea[@name="xhpc_message"]

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Username    ${valid_username}
    Input Password   ${valid_password}
    Submit Credentials
    Wait until Page Contains Element      name:validate_user
    [Teardown]    Close Browser
    

Invalid username
    Open Browser To Login Page
    Input Username    ${invalid_username}
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Username is not valid
    [Teardown]    Close Browser
    

Invalid password
    Open Browser To Login Page
    Input Username    ${valid_username}
    Input Password   ${invalid_password}
    Submit Credentials
    Wait Until Page Contains       Username or password wrong
    [Teardown]    Close Browser

Blank username
    Open Browser To Login Page
    
    Input Password   ${valid_password}
    Submit Credentials
    Wait Until Page Contains        Please Enter Username
    [Teardown]    Close Browser

Blank password
    Open Browser To Login Page
    Input Username    ${valid_username}
    Submit Credentials
    Wait Until Page Contains       Please enter Password
    [Teardown]    Close Browser


*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    React App

Input Username
    [Arguments]    ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    login_btn
