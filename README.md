# Castlery project

> Jovi's project for Castlery assessment

## Purpose

This project is for demo full stack skill set of javascript, build on **Koa**, **Angularjs** and other 3r [ ]d party libraries. 

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
  - [ ]  System 
    - [x] Framework 
    - [x] Data access layer 
    - [x] Url schema
    - [ ] History
      - [ ] version field in model
  
  - [ ] REST Api
      - [ ] POST
          - [x] File upload 
          - [x] File S3 Storage
          - [ ] Generate preview
              - [ ] Image: thumbnail as request
              - [ ] PDF: Convert current page to image as request
      - [x] PUT 
      - [x] GET 
        - [x] Filter 
        - [x] Pagination 
        - [x] Sort 
        - [ ] Full text search
      - [x] Delete 
 
  - [ ] Authentication
    - [ ] Third party authentication integration
    - [ ] User access control middleware
    
  - [ ] Deployment
    - [ ] Script to deploy



### Frontend

Frontend build on Angularjs. 

```bash
$ cd ~/frontend
$ npm install
$ gulp webserver
```
 
 - [x] System
      - [x] Framework 
      - [x] Data persistent 
      - [x] Route schema 
      - [x] Build script 
 
 - [ ] Data
      - [ ] Models
