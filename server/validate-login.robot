*** Settings ***
Documentation	validate login function
Library           Selenium2Library


*** Keywords ***
Valid Login
    Open Browser    http://103.212.180.236:3000/login    Chrome
    Input Username    admin
    Input Password   1234
    Click Button    btn-login
    Wait until Page Contains Element      name:validate_user
    Wait until Page Contains Element      name:user-manage-bot
    