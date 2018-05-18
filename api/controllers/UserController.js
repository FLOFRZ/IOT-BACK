/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


module.exports = {


    login : async function (req, res){
        var user = await User.findOne({
            email:req.body.email
        });
        if(!user) return res.notFound();
            await bcrypt.compare(req.body.password, user.password);

        let returnUser = {
            email: user.email,
            firstName: user.firstName,
            name: user.name,
            team: user.team

        };
        let token = jwt.sign({id: user.id, email: user.email}, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn});
        return res.ok({
            token: token,
            user: returnUser
        })

    },
    logout : function(req, res){

    },
    register : async function(req, res){
        if(_.isUndefined(req.body.email)){
            return res.badRequest('Il est ou mon email')
        }
        if(_.isUndefined(req.body.firstName)){
            return res.badRequest('Il est ou mon prenom')
        }
        if (_.isUndefined((req.body.password))){
            return res.badRequest('Il est ou mon password')
        }
        if (req.body.password.length < 5){
            return res.badRequest('c koi cette chiasse')
        }

        var user = await sails.helpers.createUser.with({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName});

        var obj = {
            token : jwt.sign({user: user.id}, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn}),
            user : {email : user.email, name : user.name, firstName : user.firstName},
        }
        // let token = jwt.sign({user: user.id}, sails.config.jwt.jwtSecret, {expiresIn: sails.config.jwt.jwtExpiresIn})
        return res.ok(obj)

    }


};

