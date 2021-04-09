*** Settings ***
Documentation     Test Main Page's Up-navbar button  Functionality
Library           Selenium2Library

*** Variables ***
${HOME URL}      http://localhost:3000
${BROWSER}        Chrome
${login_button}     login
${home_button}     btn-home
${regist_button}     btn-regist


*** Test Cases ***
Home Button
    Open Browser To Main Page
    Submit Button   ${home_button}
    
    [Teardown]    Close Browser
    

Login Button
    Open Browser To Main Page
    Submit Button   ${login_button}
    Wait Until Page Contains        Log in
    [Teardown]    Close Browser
    
    

Register Button
    Open Browser To Main Page
    Submit Button   ${regist_button}
    Wait Until Page Contains        Register
    [Teardown]    Close Browser
   
    



*** Keywords ***
Open Browser To Main Page
    Open Browser    ${HOME URL}    ${BROWSER}
    Title Should Be    React App


Submit Button
    [Arguments]     ${button}
    Click Link    ${button}
