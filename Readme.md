[![Build Status](https://travis-ci.org/akveo/ng2-smart-table.svg?branch=master)](https://travis-ci.org/akveo/ng2-smart-table)

# Vehicle Dashboard

Sample project to book a taxi in a web site.
You will be able to select your origin, destiny and special requirements.
It's just a demo to see the interaction between the front end, back end and db model.

Angular table component forked from [Akveo Team](https://github.com/akveo/ng2-smart-table) and modified by Jun Kawa.
This project uses Angular 2 as the front-end and Spring Boot as back-end.
You will be able to perform CRUD operations to update employees displayed on the table.

## Features
- Flexible Table
- Create a new user
- Login a user
- Filter the taxis according your origin and special requirements

## Installation

### What you'll need
- Angular 5.0.0
- Spring Boot 1.5.4
- MySQL
- Java 8 (1.8)
- Maven 3.5.2

### Setting up Spring Boot Project

- Install dependencies using mvn clean install
- create an empty database dashboard
- Run Spring Boot project
- Access page at (http://localhost:8080)

### Deploy Angular Project
- inside 'frontend' folder run npm install
- run npm start 
- Access page at (http://localhost:4200)
- Login or create a new user.
- Sample user: root/root
