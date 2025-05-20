var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
var multer = require("multer");
const config = require('../../Config');
const path = require('path');
const fse = require("fs-extra");
const fs = require("fs");
var upload = multer();
var Sequelize = connect.Sequelize;
const Op = Sequelize.Op;
var moment = require('moment');





var routes = function () {


    router.route('/GetAPClientMappingbyId/:Id')
        .get(function (req, res) {

            const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
            var param = { where: { Id: req.params.Id } };

            dataaccess.FindAll(Client_ReMappingDetails, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAPClientMappingbyId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                });

        });


    router.route('/GetAPClientOrderbyId')
        .get(function (req, res) {

            const APClientMapping = datamodel.APClientMapping();

            var param = { attributes: ['Id', 'ClientCode'], order: [['Id', 'DESC']] };

            dataaccess.FindAll(APClientMapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'ClientCode Data by Id desc', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAPClientOrderbyId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                });

        });

    router.route('/GetAPClientMappingFileUploadId/:RequestId')
        .get(function (req, res) {

            const FileUpload = datamodel.FileUpload();
            var param = {
                where: {
                    RequestId: req.params.RequestId,
                    Process: 'ClientRemapping'
                }
            };

            dataaccess.FindAll(FileUpload, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('APClientMappingService', 'GetAPClientMappingFileUploadId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of Entity APClosure', Data: null });
                });

        });


    router.route('/GetAPClousureClientMappingDetailsId/:ClientRemappingId')
        .get(function (req, res) {

            const ClientRemapping = datamodel.ClientRemapping();
            var param = { where: { ClientRemappingId: req.params.ClientRemappingId } };

            dataaccess.FindAll(ClientRemapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('APClosureService', 'GetAPClousureClientMappingDetailsId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                });

        });


    router.route('/GetAPClientMappingDetailsId/:ClientRemappingId')
        .get(function (req, res) {

            const ClientRemapping = datamodel.ClientRemapping();
            var param = { where: { ClientRemappingId: req.params.ClientRemappingId } };

            dataaccess.FindAll(ClientRemapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('APClosureService', 'GetAPClousureClientMappingDetailsId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                });

        });

        router.route('/GetAPClosurebyId/:APClosureID')
        .get(function (req, res) {

            const APClousure_ClientMappingDetails = datamodel.APClousure_ClientMappingDetails();
            var param = { where: { APClosureID: req.params.APClosureID } };

            dataaccess.FindAll(APClousure_ClientMappingDetails, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'APClosure Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of APClosure Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('EntityClosureService', 'GetAPClosurebyId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of Entity APClosure', Data: null });
                });

        });

        router.route('/GetAPClosureDetailsIdArray')
        .post(function (req, res) {
            console.log("GetAPClosureDetailsIdArray",req.body)

            const APClousure_ClientMappingDetails = datamodel.APClousure_ClientMappingDetails();
            var ClientMappingList = [];
            APClosureDownloadIDs = req.body.APClosureIds;

            console.log("APClosureDownloadIDs",APClosureDownloadIDs)
            // var param = { where: { ClientRemappingId: ClientMappingList } };
            var param = {
                where: {
                    APClosureID: 
                    { [Op.in]: APClosureDownloadIDs},
                }
            };
            console.log("APClosureIDparam",param)

            dataaccess.FindAll(APClousure_ClientMappingDetails, param)
                .then(function (result) {
                    if (result != null) {
                        console.log("result",result)
                        res.status(200).json({ Success: true, Message: 'APClosure ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping APClosure Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAPClousureClientMappingDetailsId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping APClosure Table', Data: null });
                });

        });


    router.route('/GetAPClientMappingDetailsIdArray')
        .post(function (req, res) {
            console.log('GetAPClientMappingDetailsreqbody',req.body)

            const ClientRemapping = datamodel.ClientRemapping();
            var ClientMappingList = [];
            ClientMappingIDs = req.body.ClientMappingIDs;

            console.log("ClientMappingIDs",ClientMappingIDs)
            // var param = { where: { ClientRemappingId: ClientMappingList } };
            var param = {
                where: {
                    ClientRemappingId: 
                    { [Op.in]: req.body.ClientMappingIDs },
                }
            };
            console.log("ClientMappingparam",param)

            dataaccess.FindAll(ClientRemapping, param)
                .then(function (result) {
                    if (result != null) {
                        console.log("result",result)
                        res.status(200).json({ Success: true, Message: 'ClientMapping Data', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetClientMappingDetailsId', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of ClientMapping Table', Data: null });
                });

        });


    router.route('/ApproveRejectAPClientMapping')
        .post(function (req, res) {

            const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
            var values = {
                Status: req.body.Status,
                Remarks: req.body.Remarks
            };
            var param = { Id: req.body.Id };
            dataaccess.Update(Client_ReMappingDetails, values, param)
                .then(function (result) {
                    // console.log("result", result)
                    if (result != null) {
                        const APClientMapping = datamodel.APClientMapping();
                        // console.log("APClientMapping", req.body)
                        var Exeldata = [];

                        var ClientMappingList = [];
                        PushClientMappingList = req.body.ClientsMappingDetails;
                        // console.log("PushClientMappingList", PushClientMappingList)

                        PushClientMappingList.forEach(element => {
                            var values = {
                                APCode: element.APCode,
                                ClientCode: element.ClientCode,
                                from_Date: element.from_Date,
                                IsActive: element.IsActive,
                                Created_By: req.body.Created_By
                            };
                            Exeldata.push(values)
                        });
                        // console.log("Bulkvalue", Exeldata);
                        dataaccess.BulkCreate(APClientMapping, Exeldata)
                            .then(function (result) {
                                if (result != null) {
                                    // console.log("result ", result);

                                    UpdateAPClientRemapping(req.body)
                                        .then((finalresult) => {
                                            res.status(200).json({ Success: true, Message: 'ApproveAPClosure successfully', Data: null });
                                        })
                                        .catch((finalerror) => {
                                            res.status(200).json({ Success: false, Message: 'Error occurred while updating record', Data: null });
                                        })

                                }
                                else {
                                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                                }
                            }, function (err) {
                                res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: err });
                            });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'Error occurred while RejectAPClosure', Data: null });
                    }
                }, function (err) {
                    console.log("err", err)
                    res.status(200).json({ Success: false, Message: 'Error occurred while RejectAPClosure', Data: null });
                });
        });

    function UpdateAPClientRemapping(requestBody) {
        return new Promise((resolve, reject) => {

            let request = requestBody;
            console.log("request222", request)
            let updateList = request.ClientsMappingDetails;

            updateList.forEach((element, index) => {

                const APClientMapping = datamodel.APClientMapping();

                var param = {
                    where: {
                        APCode: element.OldAPCode,
                        ClientCode: element.ClientCode.toString(),
                        to_Date: null,
                        IsActive: element.IsActive
                    },
                    attributes: ['Id']

                };
                // console.log("APClientMappingGetParams",param)

                dataaccess.FindAll(APClientMapping, param)
                    .then(function (getresult) {
                        if (getresult != null) {

                            if (getresult.length != 0) {
                                let createData = getresult[0];
                                console.log("APClientMappinggetresult", getresult)
                                console.log("APClientMappingCreateData", createData)

                                const APClientMapping = datamodel.APClientMapping();
                                var values = {
                                    to_Date: moment(element.from_Date).subtract(1, "days").format('YYYY-MM-DD'),
                                    Modified_By: request.Created_By,
                                    Modified_Date: connect.sequelize.fn('NOW')
                                };
                                console.log("APClientMappingValues", values)
                                var param = {
                                    Id: createData.Id,
                                    APCode: element.OldAPCode,
                                    ClientCode: element.ClientCode,
                                    to_Date: null,
                                    IsActive: element.IsActive
                                };
                                console.log("APClientMappingParam", param)
                                dataaccess.Update(APClientMapping, values, param)
                                    .then(function (updateresult) {
                                        if (updateresult != null) {
                                            if (index == updateList.length - 1) {
                                                resolve();
                                            }
                                        }
                                        else {
                                            dataconn.errorlogger('APModificationApproveService', 'update_AP_Additonal_Bank_Details', { message: 'No object found', stack: '' });
                                            reject();
                                        }
                                    }, function (error) {
                                        dataconn.errorlogger('APModificationApproveService', 'update_AP_Additonal_Bank_Details', error);
                                        reject();
                                    });
                            }


                        }
                        else {
                            dataconn.errorlogger('APModificationApproveService', 'update_AP_Additonal_Bank_Details', { message: 'No object found', stack: '' });
                            reject();
                        }
                    }, function (error) {
                        dataconn.errorlogger('APModificationApproveService', 'update_AP_Additonal_Bank_Details', error);
                        reject();
                    });

            });

        });
    }


    router.route('/RejectClientMapping')
        .post(function (req, res) {

            const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();

            var values = {
                Status: req.body.Status,
                Remarks: req.body.Remarks
            };
            var param = { Id: req.body.Id };

            dataaccess.Update(Client_ReMappingDetails, values, param)
                .then(function (result) {
                    console.log("result", result)
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'RejectAPClosure successfully', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'Error occurred while RejectAPClosure', Data: null });
                    }
                }, function (err) {
                    res.status(200).json({ Success: false, Message: 'Error occurred while RejectAPClosure', Data: null });
                });
        });


    router.route('/GenrateDate')
        .post(function (req, res) {

            const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
            var values = {
                Generation_Date: connect.sequelize.fn('NOW'),
            };
            var param = { Id: req.body.Id };

            dataaccess.Update(Client_ReMappingDetails, values, param)
                .then(function (result) {
                    console.log("result", result)
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Genration Date successfully', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                    }
                }, function (err) {
                    res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                });
        });

    router.route('/UpdateMultipleGenerateDate')
        .post(function (req, res) {
            var SelectALLDetails = [];
            SelectALLDetails = req.body.APRemappingIDs
            console.log("SelectALLDetails", SelectALLDetails)
            SelectALLDetails.forEach(element => {
                const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
                var values = {
                    Generation_Date: connect.sequelize.fn('NOW')
                };
                var param = { Id: element.ClientRemappingId };

                dataaccess.Update(Client_ReMappingDetails, values, param)
                    .then(function (result) {
                        console.log("result", result)
                        if (result != null) {
                            //res.status(200).json({ Success: true, Message: 'Genration Date successfully', Data: result });
                        }
                        else {
                            // res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                        }
                    }, function (err) {
                        res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                    });
                res.status(200).json({ Success: true, Message: 'Generation Date updated successfully', Data: "" });
            });
        });



    router.route('/DownloadMultipleleeterhead')
        .post(function (req, res) {
            var SelectALLDetails = [];
            SelectALLDetails = req.body.APRemappingIDs
            console.log("SelectALLDetails", SelectALLDetails)
            SelectALLDetails.forEach(element => {
                const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
                var param = { Id: element.ClientRemappingId };

                dataaccess.Update(Client_ReMappingDetails, param)
                    .then(function (result) {
                        console.log("result", result)
                        if (result != null) {
                            //res.status(200).json({ Success: true, Message: 'Genration Date successfully', Data: result });
                        }
                        else {
                            // res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                        }
                    }, function (err) {
                        res.status(200).json({ Success: false, Message: 'Error occurred while Genration Date', Data: null });
                    });
                res.status(200).json({ Success: true, Message: 'Generation Date updated successfully', Data: "" });
            });
        });



    router.route('/GetAllAPCode')
        .get(function (req, res) {
            var param = {
                where: {
                    Process_Id: 2,
                    AP_Code: {
                        [Op.ne]: null
                    }
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('AP_Code')), 'AP_Code'],
                ],
            };
            const AP_Branch_Details = datamodel.AP_Branch_Details();
            dataaccess.FindAll(AP_Branch_Details, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'AP_Draft_Branch_Details Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAllAPCode', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                });
        });


    router.route('/GetAllOldAPCode')
        .get(function (req, res) {
            var param = {
                where: {
                    IsActive: true,
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('OldAPCode')), 'OldAPCode'],
                ],
            };
            const ClientRemapping = datamodel.ClientRemapping();
            dataaccess.FindAll(ClientRemapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'AP_Draft_Branch_Details Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAllAPCode', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                });
        });


    router.route('/GetAllNewAPCode')
        .get(function (req, res) {
            var param = {
                where: {
                    IsActive: true,
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('NewAPCode')), 'NewAPCode'],
                ],
            };
            const ClientRemapping = datamodel.ClientRemapping();
            dataaccess.FindAll(ClientRemapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'AP_Draft_Branch_Details Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAllAPCode', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of AP_Draft_Branch_Details Table', Data: null });
                });
        });


    router.route('/GetAllClientCode')
        .get(function (req, res) {
            var param = {
                where: { IsActive: true }, attributes: ['Id', 'ClientCode', 'IsActive']
            };
            const APClientMapping = datamodel.APClientMapping();
            dataaccess.FindAll(APClientMapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'APClientMapping Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAllClientCode', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                });
        });


    router.route('/GetAPCodeByClientCode/:APCode')
        .get(function (req, res) {

            const APClientMapping = datamodel.APClientMapping();
            var param = { where: { APCode: req.params.APCode } };

            dataaccess.FindAll(APClientMapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'APClientMapping access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'No Record Found', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAPCodeByClientCode', err);
                    res.status(200).json({ Success: false, Message: 'Error while accessing APClientMapping', Data: null });
                });

        });




    router.route('/GetAPdetailsforMapping')
        .post(function (req, res) {
            const APClientMapping = datamodel.APClientMapping();
            console.log("req.body :", req.body);
            var ClientCode = req.body.ClientCode;

            var param = //{ where: { APCode: req.body.APCode,ClientCode: req.body.ClientCode} };

            {
                where: {
                    APCode: req.body.APCode,
                    $or: [{ ClientCode: ClientCode }]
                }
            }
            dataaccess.FindAll(APClientMapping, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'APClientMapping Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'GetAPdetailsforMapping', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of APClientMapping Table', Data: null });
                });

        });


    router.route('/Get_APClientDetailsForMapping')
        .post(function (req, res) {
            console.log("req.body :", req.body);
            var querytext = 'SELECT "Get_APClientDetailsForMapping"(:p_ap_code,:p_client_code,:p_ref); FETCH ALL IN "abc"';
            var param = {
                replacements: {
                    p_ap_code: req.body.p_accountCode,
                    p_client_code: req.body.p_client_code,
                    p_ref: 'abc'
                },
                type: connect.sequelize.QueryTypes.SELECT
            }

            connect.sequelize
                .query(querytext, param)
                .then(function (result) {
                    result.shift();
                    res.status(200).json({ Success: true, Message: "ClientMapping Data Access", Data: result });
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'Get_APClientDetailsForMapping', err);
                    res.status(200).json({ Success: false, Message: 'User has no access of ClientMapping', Data: null });
                });
        });


    router.route('/Get_APClientRemapping_Search')
        .post(function (req, res) {

            var querytext = 'SELECT "Get_APClientRemapping_Search"(:p_ap_code,:p_oldaccountCode,:p_newaccountCode,:p_status,:p_ref); FETCH ALL IN "abc"';
            var param = {
                replacements: {
                    p_ap_code: req.body.p_accountCode,
                    p_oldaccountCode: req.body.p_oldaccountCode,
                    p_newaccountCode: req.body.p_newaccountCode,
                    p_status: req.body.p_status,
                    p_ref: 'abc'
                },
                type: connect.sequelize.QueryTypes.SELECT
            }

            console.log("GetAPInwardSearchList - param", param);

            connect.sequelize
                .query(querytext, param)
                .then(function (result) {
                    result.shift();
                    res.status(200).json({ Success: true, Message: "Client Mapping Serch Data Access", Data: result });
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'Get_APClientRemapping_Search', err);
                    res.status(200).json({ Success: false, Message: 'User has no access of ClientMapping', Data: null });
                });
        });


    router.route('/GetAllStatus')
        .get(function (req, res) {
            const StatusMst = datamodel.StatusMst();
            var param = { where: { IsActive: true }, attributes: ['Id', 'Status_Name', 'IsActive'] };

            dataaccess.FindAll(StatusMst, param)
                .then(function (result) {
                    if (result != null) {
                        res.status(200).json({ Success: true, Message: 'Status Table Access', Data: result });
                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'User Has No Access Of Status Table', Data: null });
                    }
                }, function (err) {
                    dataconn.errorlogger('StatusService', 'GetAllStatus', err);
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of Status Table', Data: null });
                });

        });


    router.route('/SubmitClientMapping')
        .post(upload.any(), function (req, res) {
            for (var key in req.body) {
                req.body[key] = req.body[key] == '' || req.body[key] == 'undefined' ? null : req.body[key];
            }

            let requestBody = req.body;
            console.log("requestBody", requestBody)
            let requestFiles = req.files;

            const Client_ReMappingDetails = datamodel.Client_ReMappingDetails();
            var values = {
                APCode: req.body.APCode,
                Status: req.body.Status,
                Type: req.body.Type,
                APClosureId: req.body.APClosureId,
                Created_By: req.body.Created_By
            };
            dataaccess.Create(Client_ReMappingDetails, values)
                .then(function (result) {
                    if (result != null) {
                        const ClientRemappingId = result.Id;

                        const ClientRemapping = datamodel.ClientRemapping();
                        var Exeldata = [];

                        var ClientMappingList = [];
                        ClientMappingList = JSON.parse(req.body.ClientMappingDetails);
                        // console.log("ClientMappingList :", ClientMappingList);
                        ClientMappingList.forEach(element => {
                            var values = {
                                ClientRemappingId: ClientRemappingId,
                                // APCode: req.body.APCode,
                                ClientCode: element.ClientCode,
                                OldAPCode: element.APCode,
                                NewAPCode: element.NewAPCode,
                                from_Date: element.from_Date,
                                IsActive: 1,
                                Created_By: req.body.Created_By
                            };
                            Exeldata.push(values)
                        });
                        // console.log("Bulkvalue",Exeldata);
                        dataaccess.BulkCreate(ClientRemapping, Exeldata)
                            .then(function (result) {
                                if (result != null) {
                                    console.log("Client mapping: ", result);
                                    const Folder_Path = path.join(__dirname + '/../../../' + 'AP/'  + 'ClientMappingDocument/');
                                    let num = ClientRemappingId;
                                    let text = num.toString();
                                    const SubFolder = text;

                                    checkFolderExists(Folder_Path, SubFolder)
                                        .then((results) => {
                                            const folderPath = results;
                                            uploadFiles(requestFiles, folderPath)
                                                .then(async (results) => {
                                                    let fileData = results;
                                                    console.log("Uploadedfileresult", fileData)
                                                    saveFileDetails(requestBody, fileData, ClientRemappingId)
                                                        .then((recordDetails) => {
                                                            if (recordDetails != null) {
                                                                // if(requestFiles.length == index + 1){
                                                                res.status(200).json({ Success: true, Message: 'Client Mapping Saved Successfully', Data: null });
                                                                //}
                                                            }
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                            res.status(200).json({ Success: false, Message: 'Error occurred while uploading files', Data: err });
                                                        })
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    res.status(200).json({ Success: false, Message: 'Error occurred while uploading files', Data: err });
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.status(200).json({ Success: false, Message: 'Error occurred while uploading files', Data: err });
                                        })
                                    // res.status(200).json({ Success: true, Message: 'APClousure_ClientMappingDetails saved successfully', Data: result });
                                }
                                else {
                                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                                }
                            }, function (err) {
                                res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: err });
                            });

                    }
                    else {
                        res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: null });
                    }
                }, function (err) {
                    res.status(200).json({ Success: false, Message: 'Error occurred while saving record', Data: err });
                });
        });

    async function checkFolderExists(ClientMapping, ProcessId) {
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(path.join(ClientMapping, ProcessId))) {
                    fs.mkdirSync(path.join(ClientMapping, ProcessId));
                    console.log("paths", ClientMapping, ProcessId)
                }
                resolve(path.join(ClientMapping, ProcessId));
            }
            catch (err) {
                console.log("Error File Folder", err);
                reject();
            }
        });
    }

    async function uploadFiles(request, folderPath) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("requestfiledata", request)
                const fileDetails = request;

                if (!fileDetails.length) {
                    reject();
                }
                let finalData = [];
                for (let i = 0; i < fileDetails.length; i++) {
                    let newFileName = fileDetails[i].originalname;
                    console.log("newFileName", newFileName)
                    let util = require('util')
                    let fs = require('fs')
                    let writeFile = util.promisify(fs.writeFile)
                    await writeFile(path.join(folderPath + '/' + newFileName),
                        fileDetails[i].buffer)
                    finalData.push({
                        FileName: newFileName,
                        Path: path.join(folderPath + '/' + newFileName)
                    })
                }
                resolve(finalData);
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    function saveFileDetails(request, fileData, ClientRemappingId) {
        return new Promise((resolve, reject) => {

            let requestBody = request;
            console.log("requestBodysaveFileDetails",requestBody)
            const FileUpload = datamodel.FileUpload();
            fileData.map(e => {
                e.RequestId = ClientRemappingId
                e.Process = "ClientRemapping"
                e.ProcessId = 5
                e.IsActive = 1
                e.Created_By = requestBody.Created_By
            })
            console.log("NewFileData", fileData)

            dataaccess.BulkCreate(FileUpload, fileData)
                .then(function (result) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        dataconn.errorlogger('ClientMappingService', 'Create', { message: 'No object found', stack: '' });
                        reject();
                    }
                }, function (err) {
                    dataconn.errorlogger('ClientMappingService', 'Create', err);
                    reject();
                });
        })
    }


    router.route('/Downloadfile/:Id')
    .get(function (req, res) {

        const FileUpload = datamodel.FileUpload();
        var param = {
            where: { Id: req.params.Id }
        };
        dataaccess.FindAll(FileUpload, param)
            .then(function (result) {
                if (result != null) {
                    res.download(result[0].Path);
                }
                else {
                    res.status(200).json({ Success: false, Message: 'User has no access of FileUpload', Data: null });
                }
            },
                function (err) {
                    dataconn.errorlogger('APClosureService', 'Downloadfile', err);
                    res.status(200).json({ success: false, message: "User has no access of FileUpload", Data: null });
                });
    });

    router.route('/GetFileUploadTable')
    .get(function (req, res) {
        var param = {
            attributes: ['Id', 'ProcessId', 'FileName', 'Path', 'Process', 'IsActive', 'Created_Date']
        };
        const FileUpload = datamodel.FileUpload();
        dataaccess.FindAll(FileUpload, param)
            .then(function (result) {
                if (result != null) {
                    res.status(200).json({ Success: true, Message: 'FileUploadTable Table Access', Data: result });
                }
                else {
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of FileUploadTable Table', Data: null });
                }
            }, function (err) {
                dataconn.errorlogger('APClosureService', 'GetFileUploadTable', err);
                res.status(200).json({ Success: false, Message: 'User Has No Access Of FileUploadTable Table', Data: null });
            });
    });

    router.route('/GetAllAPClousureClientMappingDetails')
    .get(function (req, res) {
        var param = {
            attributes: ['Id', 'APClosureID', 'APCode', 'ClientID', 'ClientDebitAmount', 'NewAPCode', 'IsActive', 'Created_Date']
        };
        const APClousure_ClientMappingDetails = datamodel.APClousure_ClientMappingDetails();
        dataaccess.FindAll(APClousure_ClientMappingDetails, param)
            .then(function (result) {
                if (result != null) {
                    res.status(200).json({ Success: true, Message: 'APClousure_ClientMappingDetails Table Access', Data: result });
                }
                else {
                    res.status(200).json({ Success: false, Message: 'User Has No Access Of APClousure_ClientMappingDetails Table', Data: null });
                }
            }, function (err) {
                dataconn.errorlogger('APClosureService', 'GetAllAPClousureClientMappingDetails', err);
                res.status(200).json({ Success: false, Message: 'User Has No Access Of APClousure_ClientMappingDetails Table', Data: null });
            });
    });

    return router;
};

module.exports = routes;