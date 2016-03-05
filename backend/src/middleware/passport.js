/**
 * Created by jovi on 3/5/16.
 */
'use strict';

const passport = require('koa-passport');
const StrategyGoogle = require('passport-google-oauth20').Strategy;
const config = require('../config/environment').grant;
const Router = require('koa-router');
const Status = require('../models/CONST_STATUS').values.USER;

const connectRoute = '/connect/google';
const models = require('../models/');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    return models.User.find({where: {id: id}, limit: 1}).then((user)=> {
        done(null, user || {});
    });
});

passport.use(new StrategyGoogle({
        clientID: config.google.key,
        clientSecret: config.google.secret,
        callbackURL: `${config.server.protocol}://${config.server.host}${connectRoute}/callback`
    },
    //function(iss, sub, profile, accessToken, refreshToken, done) {
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile.id, profile);
        models.User.findCreateFind({
            where: {
                providerId: profile.id
            },
            defaults: {
                username: profile.id,
                picture: profile.photos[0].value,
                displayName: profile.displayName,
                password: Math.random(),
                email: '',
                status: Status.active,
                provider: 'google',
                providerId: profile.id
            }
        }).then(result=> {
            cb(null, result[0]);
        });
    }
));

const publicRouter = new Router();

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    publicRouter.get(connectRoute, passport.authenticate('google', {scope: ['profile']}));
    publicRouter.get(`${connectRoute}/callback`,
        passport.authenticate('google', {
            successRedirect: 'http://127.0.0.1:9001/index.html',
            failureRedirect: connectRoute
        })
    );
    app.use(publicRouter.routes());
};
