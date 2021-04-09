*** Settings ***
Documentation     Test Main Page's Dropdown  Functionality
Library           Selenium2Library
Resource          source-login.robot

*** Variables ***
${HOME URL}      http://localhost:3000
${BROWSER}        Chrome

${valid_username}     admin
${valid_password}     1234



*** Test Cases ***
Edit Profile Button
    Valid Login
    Click Specific Link   user-dropdown
    Click Specific Element      user-edit
    Wait until Page Contains    Edit Profile
    [Teardown]    Close Browser
       
Manage Bot Button
    Valid Login
    Click Specific Link   user-dropdown
    Click Specific Element      user-manage
    Wait until Page Contains Element      name:bot_list
    [Teardown]    Close Browser
    
    
Sign out Button
    [Documentation]    Test Sign out Button Functionality
    Valid Login
    Click Specific Link   user-dropdown
    Click Specific Element      signout
    Element Should Not Be Visible       name:validate_user
    [Teardown]    Close Browser


*** Keywords ***

Click Specific Link 
    [Arguments]     ${li}
    Click Link    ${li}



Click Specific Element
    [Arguments]     ${element}
    Wait Until Element Is Visible   ${element}
    Click Element    ${element}