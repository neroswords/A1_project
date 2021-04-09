*** Keywords ***
Valid Login
    Open Browser    http://localhost:3000/login    Chrome
    Input Username    admin
    Input Password   1234
    Click Button    btn-login
    Wait until Page Contains Element      name:validate_user
    Wait until Page Contains Element      name:user-manage-bot

Open Browser To Specific Page
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    React App

Input Username
    [Arguments]    ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    btn-login