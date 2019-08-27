*** Settings ***
Library        Selenium2Library
*** Test Cases ***
Open Weather App
  Navigate To Weather App On Localhost
  Verify Page Contains Weather App Title
*** Keywords ***
Navigate To Weather App On Localhost
  Open Browser   localhost:4200   browser=chrome
Verify Page Contains Weather App Title
  ${Get_title}=      Get Title
  Should Be Equal As Strings     ${Get_title}   WeatherApp
  Close Browser