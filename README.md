# Project Title
Quick Weather

## Description
A weather forecast application created with Node.js and Express that uses APIs from [Mapbox](https://www.mapbox.com) and [WeatheAPI](https://www.weatherapi.com) to geocode and provide the current weather forecast for any provided location around the world.

## Requirments
For development, you will need to have Node.js and npm installed in your environment

## Install
    $ git clone https://www.github.com/bryanwaine/quick-weather-website
    $ cd quick-weather-website
    $ npm install
    
## Environmental Variables
Copy contents of sample.env to your environment config file and replace with your own values
  
## Running the project in development environment
    $ npm run dev
    
## Exposed Port
    http://localhost:3000
    
## API Documentation

## 1. Get Weather

### Request Type: GET
    http://localhost:3000/weather?address=Abuja
    
### PARAMS Query Params
    KEY = address   VALUE = Abuja
    
### Hosted Heroku Server
    https://bryan-quick-weather.herokuapp.com
