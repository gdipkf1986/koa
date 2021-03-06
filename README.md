# Koa 

> Explore Koa, ng1.x with es6

[ ![Codeship Status for gdipkf1986/koa](https://codeship.com/projects/28b86b70-cbf0-0133-9d81-5698e26793f2/status?branch=master)](https://codeship.com/projects/140087)

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

Backend is build on ES6 and Mysql, please make user you are installed nodejs and mysql properly before config application.

```bash
$ cd ~/backend
$ npm install 
$ cp src/config/enviroment/product.js src/config/environment/local.js # copy product config to local config
$ vim src/config/environment/local.js # configuration of database and other service like Amazon S3, google oauth
$ npm run local
```

For REST api test, please access these endpoints by any rest test tool like Post Man 
* **POST http://127.0.0.1:9000/api/v1/mediaDocs/** with files in form-data by any field name
* **PUT http://127.0.0.1:9000/api/v1/mediaDocs/${resourceName}** with a single in form-data by any field name, ${resourceName} is returned by POST before, previous files under same resourceName will mark as history
* **GET http://127.0.0.1:9000/api/v1/mediaDocs/${resourceName}** with get latest version of this resource's meta data
* **GET http://127.0.0.1:9000/api/v1/mediaDocs/?filename=${filename}** will return first 20 resources which original file name include passed value
* **DELETE http://127.0.0.1:9000/api/v1/mediaDocs/${resourceName}** will mark latest version of this resource as deleted

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
 
  - [x] Authentication
    - [x] Third party authentication integration
    - [x] User access control middleware
      - [x] Privileges ---> Role <----- Users (Role based access control) 
    
  - [ ] Deployment
    - [ ] Script to deploy
    
  - [ ] Tags
    - [ ] ResourceName <--- many to many ----> Tag
    - [ ] Tag recommendation: ref http://research.microsoft.com/en-us/people/yangsong/tagrecommendation.aspx


### Frontend

Frontend build on Angularjs. 

```bash
$ cd ~/frontend
$ npm i -g gulp babel-core babel-preset-es2015
$ npm install 
$ gulp —gulpfile gulp.babel.js default
$ gulp —gulpfile gulp.babel.js webserver webserver
# visit http://localhost:9001/ via modern browser 
```


For test babel transformer (see "Babel transformer" below):
```bash
$ cd ~/frontend/babelTransformers/
$ gulp --gulpfile gulp.bable.js default
$ # compair scripts/app.js and scripts/dest/app.js
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
   
   
 - [x] Babel transformer
   - [x] Feature compiler: will ignore related code block if a feature is turned off, it won't even physically include in compiled file! 
   - [x] Customize import path: use "~" as root path of project. 
 
    
