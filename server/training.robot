*** Settings ***
Documentation     Test Training page Functionality.
Library           Selenium2Library
Resource          source-login.robot
Resource          source-manage-bot.robot

*** Variables ***
${question}       มีไข่มั้ย
${answer}         ไม่มี
${word}           กระต่าย
${replyword}      ขอโทษครับ


*** Test Cases ***


Training Page
    [Documentation]         Test if Training path has correct path
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    [Teardown]    Close Browser  
    
Add Word Pop-up
    [Documentation]         Test if Add Word Pop-up work perfectly
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-addword
    [Teardown]    Close Browser

Delete Word Pop-up
    [Documentation]         Test if Delete Word Pop-up work perfectly
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-delword
    [Teardown]    Close Browser

Add Duplicate Question and Answer
    [Documentation]         Test if cannot add Question and Answer duplicately
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-addword
    Wait Until Element Is Visible        name:addword-popup     10
    Input Question      ${question}
    Input Answer        ${answer}
    Submit Button       btn-addword-confirm
    Submit Button       btn-addword
    Wait Until Element Is Visible        name:addword-popup     10
    Input Question      ${question}
    Input Answer        ${answer}
    Submit Button       btn-addword-confirm
    Page Should Contain         Duplicate Question and Answer
    [Teardown]    Close Browser

Add Blank Question
    [Documentation]         Test if don't allow blank Question
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-addword
    Wait Until Element Is Visible        name:addword-popup     10
    Input Answer        ${answer}
    Submit Button       btn-addword-confirm
    Page Should Contain         Please Add Question
    [Teardown]    Close Browser   
    

Add Blank Answer
    [Documentation]         Test if don't allow blank Answer
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-addword
    Wait Until Element Is Visible        name:addword-popup     10
    Input Question      ${question}
    Submit Button       btn-addword-confirm
    Page Should Contain         Please Add Answer
    [Teardown]    Close Browser  
    



    
   

*** Keywords ***
Submit Button
    [Arguments]     ${button}
    Click Button    ${button}

Input Question
    [Arguments]    ${question}
    Input Text    input-question    ${question}

Input Answer
    [Arguments]    ${answer}
    Input Text    input-answer    ${answer}

Check Specific Link Functionality
    [Arguments]         ${li}   ${header}
    Wait Until Element Is Visible        ${li}     20
    Click Link          ${li}
    Wait Until Element Is Visible        ${header}     20

