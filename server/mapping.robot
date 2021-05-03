*** Settings ***
Documentation     Test Training page Functionality.
Library           Selenium2Library
Resource          source-login.robot
Resource          source-manage-bot.robot

*** Variables ***
${mapping-name}       ซื้อขาย



*** Test Cases ***


Mapping Page
    [Documentation]         Test if Mapping path has correct path
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Check Specific Link Functionality       name:menu-mapping         id:mapping-header
    [Teardown]    Close Browser


Mapping Search
    [Documentation]         Test Search Functionality in Mapping Page
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Check Specific Link Functionality       name:menu-mapping         id:mapping-header
    Click Element               name:mapping-search
    Input Text              name:mapping-search    ${mapping-name} 
    Table Cell Should Contain       name:mapping-table    2      2      ${mapping-name} 
    [Teardown]    Close Browser

Mapping Details
    [Documentation]         Test if see Mapping Details path has correct path
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Check Specific Link Functionality       name:menu-mapping         id:mapping-header
    Wait Until Element Is Visible        name:mapping-details     10
    Click Element               name:mapping-details
    Wait Until Element Is Visible        id:mapping-load-header     10
    [Teardown]    Close Browser

*** comment ***
Mapping Details Page
    [Documentation]         Test if Mapping Details is shown correctly
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Check Specific Link Functionality       name:menu-mapping         id:mapping-header
    Wait Until Element Is Visible        name:mapping-details     10
    Check Specific Link Functionality       name:mapping-details        id:mapping-load-header 
    Wait Until Element Is Visible        name:mapping-details     10
    
*** Keywords ***
Check Specific Link Functionality
    [Arguments]         ${li}   ${header}
    Wait Until Element Is Visible        ${li}     20
    Click Link          ${li}
    Wait Until Element Is Visible        ${header}     20