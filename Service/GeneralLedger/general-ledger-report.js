var express = require('express');
var router = express.Router();
var connect = require('../../Data/Connect');
var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var dataconn = require('../../Data/DataConnection');
var Sequelize = require('sequelize');


var routes = function () {
    router.route('/GetAllGeneralLedger')
        .post(function (req, res) {
            var querytext = 'SELECT "Get_GeneralLedgerReport"(:p_registertype,:p_exchange,:p_segment,:p_fromdate,:p_todate,:p_fromaccountcode,:p_toaccountcode,:p_ref); FETCH ALL IN "abc"';
            var param = {
                replacements: {
                    p_registertype: req.body.p_registertype,
                    p_exchange: req.body.p_exchange,
                    p_segment: req.body.p_segment,
                    p_fromdate: req.body.p_fromdate,
                    p_todate: req.body.p_todate,
                    p_fromaccountcode: req.body.p_fromaccountcode,
                    p_toaccountcode: req.body.p_toaccountcode,
                    p_ref: 'abc'
                },
                type: connect.sequelize.QueryTypes.SELECT
            }

            connect.sequelize
                .query(querytext, param)
                .then(function (result) {
                    result.shift();
                    res.status(200).json({ Success: true, Message: "GetAllGeneralLedger Data Access", Data: result });
                }, function (err) {
                    dataconn.errorlogger('genearl-ledger-reportService', 'GetAllGeneralLedger', err);
                    res.status(200).json({ Success: false, Message: 'User has no access of GetAllGeneralLedger', Data: null });
                });
        });


    // Omkar start
router.route('/GetAllExchangeSegmentMap')
.get(function (req, res) {

    const ExchangeMst = datamodel.ExchangeMst();
    const SegmentMst = datamodel.SegmentMst();
    const ExchangeSegmentRoundingMap = datamodel.ExchangeSegmentRoundingMap();

    var param = {
        where: { IsActive: true },
        include: [
            { model: ExchangeMst, attributes: ["Id", "Exchange_Name", "IsActive"], },
            { model: SegmentMst, attributes: ["Id", "Segment_Name", "IsActive"], },
        ],
        attributes: ["Id", "ExchangeId", "SegmentId"],
        order: ["Id"]
    };
    dataaccess.FindAll(ExchangeSegmentRoundingMap, param)
        .then(function (result) {
            if (result != null) {
                res.status(200).json({ Success: true, Message: 'ExchangeSegmentRoundingMap Table Access', Data: result });
            }
            else {
                res.status(200).json({ Success: false, Message: 'User Has No Access Of ExchangeSegmentRoundingMap Table', Data: null });
            }
        }, function (err) {
            dataconn.errorlogger('APInwardService', 'GetAllExchangeSegmentMap', err);
            res.status(200).json({ Success: false, Message: 'User Has No Access Of ExchangeSegmentRoundingMap Table', Data: null });
        });
});

// Omkar End
    return router;

};

module.exports = routes;
