var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
const activedirectoryEWM = require('../../Common/ActiveDirectoryEWM');
var activedirectory = require('../../Common/ActiveDirectory');

var routes = function () {

        router.route('/AuthenticateUser')
        .post(function (req, res) {
            const UserMst = datamodel.UserMst();
            const UserRoleMap = datamodel.UserRoleMap();
            const RoleMst = datamodel.RoleMst();
    console.log("req",req.body)
            var param = {
                where: { LoginId: {[connect.Op.iLike] : req.body.UserName }, IsActive: true},
                attributes: ['Id', 'ADUser', 'LoginId', 'EmpCode', 'EmpName', 'EmailId', 'DefaultRoleId','ClientId'],
                include: [
                    {model: UserRoleMap, attributes:['RoleId'],
                    include: [{model: RoleMst, attributes: ['Code'], where: { IsActive:true}}] },
                ]
            };
            console.log("param",param)
            dataaccess.FindOne(UserMst, param)
            .then(function (userresult){
                if(userresult != null){
                    console.log(userresult);
                    if(userresult.ADUser){
    
                        let usernameEWM = req.body.UserName + '@ewmwealth.in';
                        let passwordEWM = req.body.Password;
    
                        activedirectoryEWM.authenticate(usernameEWM, passwordEWM, function (errEWM, authEWM) {
    
                            if (errEWM) {
                                // dataconn.errorlogger('LoginService', 'AuthenticateUser', errEWM);
                            }
    
                            if (authEWM) {
                                res.status(200).json({ Success: true, Message: 'Authenticated', Data: userresult });
                            } 
                            else{
                                var username = req.body.UserName + '@edelcap.com';
                                var password = req.body.Password;
            
                                activedirectory.authenticate(username, password, function (err, auth) {
            
                                    if(err){
                                        dataconn.errorlogger('LoginService', 'AuthenticateUser', err);
                                    }
            
                                    if(auth){
                                        res.status(200).json({Success:true, Message: 'Authenticated', Data:userresult });
                                    }
                                    else{
                                        res.status(200).json({Success:false, Message: 'You have entered an invalid username or password', Data: null });
                                    }
                                });
                            }
    
                        });
                    }
                    else{
                        var param = {
                            where: {LoginId: {[connect.Op.iLike]: req.body.UserName}, Password: {[connect.Op.eq]: req.body.Password }}, 
                            attributes: ['LoginId']
                        };
    
                        dataaccess.FindOne(UserMst, param)
                        .then(function (result){
                            if(result != null){
                                res.status(200).json({ Success:true, Message: 'Authenticated', Data: userresult });
                            }
                            else{
                                res.status(200).json({Success:false, Message: 'You have entered an invalid username and password', Data: null});
                            }
                        }, function(err){
                            dataconn.errorlogger('LoginService', 'AuthenticateUser', err);
                            res.status(200).json({Success:false, Message: 'User does not exists in the system', Data: null});
                            
                        });
    
                    }
                }
                else{
                    res.status(200).json({Success:false, Message: 'User does not exists in the system', Data: null });
                }
            }, function(err)
            {
                dataconn.errorlogger('LoginService', 'AuthenticateUser', err);
                res.status(200).json({Success:false, Message: 'User does not exists in the system', Data: null});
            });
        });

    return router;
};

module.exports = routes;