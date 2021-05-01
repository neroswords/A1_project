*** Keywords ***
Go to Manage Bot Page
    Click Link   user-dropdown
    Click Element      user-manage
    Wait until Page Contains Element      name:bot_list
    Click Element       name:bot_list
    
