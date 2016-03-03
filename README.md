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
- Isomorphic
 - Isomorphic model ref : https://github.com/geddy/model


### Backend

Backend is build on ES6 and Mysql, please make user you are installed it properly before config application.

```bash
$ cd ~/backend
$ npm install 
$ vim src/config/environment/local.js # configuration of database and other service like Amazon S3, google oauth
$ npm run local
```

For google oauth login test, please access **http://127.0.0.1:9000/connect/google**
For REST api test, please access these endpoints by any rest test tool like Post Man 
* **POST http://127.0.0.1/api/v1/mediaDocs/** with files in form-data by any field name
* **PUT http://127.0.0.1/api/v1/mediaDocs/${resourceName}** with files in form-data by any field name, ${resourceName} is returned by POST before, previous files under same resourceName will mark as history
* **GET http://127.0.0.1/api/v1/mediaDocs/${resourceName}** with get latest version of this resource's meta data
* **GET http://127.0.0.1/api/v1/mediaDocs/?filename=${filename}** will return first 20 resource with original file name included passed value
* **DELETE http://127.0.0.1/api/v1/mediaDocs/${resourceName}** will mark latest version of this resource as deleted

#### Features breakdown
  - [x]  System 
    - [x] Framework 
    - [x] Data access layer 
    - [x] Url schema
    - [x] History
  
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
        - [ ] Full text search: mysql ISAM engine set full text search index
      - [x] Delete 
 
  - [ ] Authentication
    - [x] Third party authentication integration
    - [ ] User access control middleware
      - [ ] Privileges ---> Role <----- Users (Role based access control) 
    
  - [ ] Deployment
    - [ ] Script to deployhttp://research.microsoft.com/en-us/people/yangsong/tagrecommendation.aspx
    
  - [ ] Tags
    - [ ] ResourceName <--- many to many ----> Tag
    - [ ] Tag recommendation: ref http://research.microsoft.com/en-us/people/yangsong/tagrecommendation.aspx


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
      - [x] Model
      - [x] Store
    - [x] Route schema 
    - [x] Build script 

 - [x] Data
   - [x] Read
   - [x] Upload / Add
   - [x] PUT
   - [x] Delete
   - [x] Search
    
 
    
