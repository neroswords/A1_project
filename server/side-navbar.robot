*** Settings ***
Documentation     Test Side Navbar Functionality.
Library           Selenium2Library
Resource          source-login.robot
Resource          source-manage-bot.robot

*** Variables ***
${li-trained}           name:menu-trained
${header-trained}       id:trained-header

*** Test Cases ***
Show Side Navbar
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:left-navbar     20
    [Teardown]    Close Browser
    
Trained Menu
    [Documentation]         Test if Trained Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-trained       id:trained-header
    [Teardown]    Close Browser

Training Menu
    [Documentation]         Test if Training Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-training      id:training-header
    [Teardown]    Close Browser

Group Menu
    [Documentation]         Test if Group Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-group         id:group-header
    [Teardown]    Close Browser

Mapping Menu
    [Documentation]         Test if Mapping Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-mapping         id:mapping-header
    [Teardown]    Close Browser

History Menu
    [Documentation]         Test if History Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-history         id:history-header
    [Teardown]    Close Browser

Inventory Menu
    [Documentation]         Test if Inventory Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-inventory         id:inventory-header
    [Teardown]    Close Browser

Customer Information Menu
    [Documentation]         Test if Customer Information Menu led to correct path
    Valid Login
    Go to Manage Bot Page
    Check Specific Link Functionality       name:menu-customer         id:customer-header
    [Teardown]    Close Browser

*** Keywords ***
Check Specific Link Functionality
    [Arguments]         ${li}   ${header}
    Wait Until Element Is Visible        ${li}     20
    Click Link          ${li}
    Wait Until Element Is Visible        ${header}     20
    