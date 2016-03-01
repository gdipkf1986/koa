# Castlery project

> Jovi's project for Castlery assessment

## Purpose

This project is for demo full stack skill set of javascript, build on **Koa**, **Angularjs** and other 3rd party libraries. 

Target to provide a REST service and SPA portal.

## Project

### Project management
* Language: ES6
* Code style: JSCS, editorconfig
* Transformer / Compiler / Builder: Babel, SCSS, Gulp
* Package management: npm
* Version Control: Git
* QA: Jshit, Mocha, Chai, should


### Basic Concept
* Agnostic Frontend
* REST API
* Isomorphic


### Backend

Backend is build on ES6 and Mysql, please make user you are installed it properly.

```bash
$ cd ~/backend
$ npm install
$ npm run local
```

#### Features breakdown
1.  System 
    1. Framework  **done (koa)**
    2. Data access layer **done (Mysql+Sequelize)**
    3. Url schema
    4. Middleware to normalize response
    5. Model schema
   6. File history
   7. Record history
        1. version field in model
    
2. REST Api
    1. POST
        1. File upload **done**
        2. File S3 Storage
        3. Generate preview
            1. Image: thumbnail
            2. PDF: Convert current page to image as request
    2. PUT **done**
    3. GET 
        1. Filter **done**
        2. Pagination **done**
        3. Sort **done**
        4. Full text search
    4. Delete **done**

3. Authentication
   1. Third party authentication integration
   2. User access control middleware
   
4. Deployment
    1. Script to deploy



### Frontend

Frontend build on Angularjs. 

```bash
$ cd ~/frontend
$ npm install
$ gulp webserver
```

1. System
    1. Framework **done (angular1.4)**
    2. Data persistent **done (simple implement)**
    3. Route schema **done**
    4. Build script **done**

2. Data
    1. Models
