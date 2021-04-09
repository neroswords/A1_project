*** Settings ***
Documentation     Test Register page Functionality.
Library           Selenium2Library

*** Variables ***
${REGISTER URL}      http://localhost:3000/register
${BROWSER}        Chrome
${email}     1234@gmail.com
${username}     atsuko
${password}     12345678
${cf_password}  12345678
${invalid_username}     @@@@@@
${invalid_email}     1234#$
${firstname}     maeda
${lastname}     atsuko
${birthday}    Get Current Date    result_format=%d/%m/%Y 
${shop_name}    Ohlala
${type_of_sale}  pets
${shop_address}     BanPong
${agreement}

*** Test Cases ***
Valid Registering
    Open Browser To Register Page
    Input Email     ${email}
    Input Username    ${username}
    Input Password   ${password}
    Input Confirm-password      ${cf_password}
    Input Firstname         ${firstname} 
    Input Lastname          ${lastname}
    Input Birthday      
    Input Shop_name     ${shop_name}
    Input Type_Of_Sale      ${type_of_sale}
    Input Shop_address      ${shop_address}
    Select Checkbox     checkvalidate
    Check Agreement Accept
    Submit Button
    

    


Login Link
    Open Browser To Register Page
    Click Login Link    li-login
    Wait Until Page Contains        Log in
    [Teardown]    Close Browser


*** Keywords ***
Open Browser To Register Page
    Open Browser    ${REGISTER URL}    ${BROWSER}
    Title Should Be    React App

Input Email
    [Arguments]    ${email}
    Input Text    email    ${email}

Input Username
    [Arguments]    ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Input Confirm-password
    [Arguments]    ${cf_password}
    Input Text    confirm_password    ${cf_password}

Input Firstname
    [Arguments]    ${firstname}
    Input Text    firstname    ${firstname}

Input Lastname
    [Arguments]    ${lastname}
    Input Text    lastname    ${lastname}

Input Birthday
    [Arguments]    ${bday}
    Input Text    birthday    ${bday}

Input Shop_name
    [Arguments]    ${shop_name}
    Input Text    shop_name    ${shop_name}

Input Type_Of_Sale
    [Arguments]    ${shop_type}
    Input Text    shop_type    ${shop_type}

Input Shop_address
    [Arguments]    ${shop_address}
    Input Text    shop_address    ${shop_address}

Submit Button
    Click Button    btn-regist

Click Login Link 
    [Arguments]     ${link}
    Click Link    ${link}

Check Agreement Accept
    Checkbox Should Be Selected     checkvalidate
