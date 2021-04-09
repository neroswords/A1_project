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
    
    
Add Word Functionality
    [Documentation]         Test if can add Question and Answer successfully
    Valid Login
    Go to Manage Bot Page
    Wait Until Element Is Visible        id:training-header     10
    Submit Button       btn-addword
    Wait Until Element Is Visible        name:addword-popup     10
    Input Question      ${question}
    Input Answer        ${answer}
    Submit Button       btn-addword-confirm
    Go to Manage Bot Page
    Click Link          name:menu-trained
    Wait Until Element Is Visible        name:trained-table      10
    Table Cell Should Contain       name:trained-table    2      2      ${question}