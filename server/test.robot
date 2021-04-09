*** Settings ***

Library           SeleniumLibrary

*** Variables ***
${SERVER}         http://www.google.com
${BROWSER}        Chrome

*** Test Cases ***
Search Siam Chamnankit Family from google
    Open google page
    Search Siam Chamnankit Family


*** Keywords ***
Open google page
    Open Browser    ${SERVER}    ${BROWSER}


Search Siam Chamnankit Family
    Input Text    id=lst-ib    Siam Chamnankit Family
    Click Button    name=btnK
    Wait Until Page Contains    Siam Chamnankit Family

    Blank username
    Invalid username
    Open Browser To Login Page
    Input Password   ${valid_password}
    Submit Credentials

Blank password
    Open Browser To Login Page
    Input Username    ${valid_username}
    Submit Credentials