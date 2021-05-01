*** Settings ***
Documentation     Test Manage bot page Functionality.
Library           Selenium2Library
Resource          source-login.robot


*** Variables ***
${bot_name}     hoxy
${gender}       Male
${age}          20


*** Test Cases ***
Manage Bot Page
    [Documentation]         Test if Manage bot page has a correct path
    Valid Login
    Go to Manage Bot Page
    [Teardown]    Close Browser

Create Bot Page
    [Documentation]         Test if Create bot button led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:create-bot       id:create_bot
    [Teardown]    Close Browser

Create Bot Page Functionality
    [Documentation]         Test validation of Create Bot Functionality
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:create-bot       id:create_bot
    Input Specific field            name:bot_name       ${bot_name}
    Select From List By Label       name:gender         ${gender}
    Input Specific field            name:age       ${age}
    Click Button    btn-create-bot



    



*** Keywords ***
Check Specific Link Functionality
    [Arguments]         ${li}   ${header}
    Wait Until Element Is Visible        ${li}     20
    Click Element          ${li}
    Wait Until Element Is Visible        ${header}     20

Go to Manage Bot Page
    Click Link   user-dropdown
    Click Element      user-manage
    Wait until Page Contains Element      name:bot_list

Input Specific field
    [Arguments]     ${field}        ${value}
    Input Text      ${field}        ${value}
    