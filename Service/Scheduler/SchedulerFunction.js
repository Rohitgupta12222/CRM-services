var datamodel = require('../../Data/DataModel');
var dataaccess = require('../../Data/DataAccess');
var connect = require('../../Data/Connect');
var express = require('express');
var dataconn = require('../../Data/DataConnection');
var router = express.Router();
const Sequelize = require('sequelize');
const axios = require('axios');
const fs = require('fs')
const path = require('path');

const SchedulerEmailConfig = require('./../../Config')
var moment = require('moment');






var routes = function () {

router.route('/Get_Client_Details_API')
  .get(async (req, res) => {
    try {
      const apiResult = await getClientDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      const clientDetailsArray = apiResult.data;
      console.log("Client Details Array:", clientDetailsArray);

      const ClientMasterDetails = datamodel.ClientMasterDetails();
      const ClientMasterDetailsHistory = datamodel.ClientMasterDetailsHistory();

      for (const newClient of clientDetailsArray) {
        const existingClient = await ClientMasterDetails.findOne({
          where: { CLIENTID: newClient.CLIENTID }
        });

        if (existingClient) {
          // Save old record to history with ISACTIVE = false
          await ClientMasterDetailsHistory.create({
            ...existingClient.dataValues,
            ISACTIVE: false,
            UPDATEDATE: new Date()
          });

          // Update existing record
          await existingClient.update({
            ...newClient,
            UPDATEDATE: new Date(),
            ISACTIVE: true
          });
        } else {
          // Insert new record
          await ClientMasterDetails.create({
            ...newClient,
            CREATEDATE: new Date(),
            ISACTIVE: true
          });
        }
      }

      return res.status(200).json({
        Success: true,
        Message: "Client details processed and saved successfully",
        Data: null
      });
    } catch (error) {
      console.error("Error in /Get_Client_Details_API:", error);
      return res.status(500).json({
        Success: false,
        Message: "Error processing client details",
        Data: error.message || error
      });
    }
  });



  router.route('/Get_Client_Upload_Details_API')
  .get(async (req, res) => {
    try {
      // 1. Get client details from external API
      const apiResult = await getClientUploadDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const clientUploadDetailsArray = apiResult.data;
      console.log("Client Details Array:", clientUploadDetailsArray);

        const ClientUploadDetails = datamodel.ClientUploadDetails();
    ClientUploadDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = clientUploadDetailsArray;
                    ClientUploadDetails.bulkCreate(clientUploadDetailsArray).then(() => {
                        return ClientUploadDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Client_Details_API', error);
                    res.status(200).json({ Success: false, Message: "Error while truncate for Get_Client_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);

      res.status(200).json({ Success: true, Message: "Client Upload details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Client_Details_API:", error);
      res.status(500).json({ Success: false, Message: "Error processing client details", Data: error.message || error });
    }
  });


  router.route('/Get_Folio_Details_API')
  .get(async (req, res) => {
    try {
      // 1. Get client details from external API
      const apiResult = await getFolioDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const FolioDetailsArray = apiResult.data;
      console.log("Client Details Array:", FolioDetailsArray);

        const FolioDetails = datamodel.FolioDetails();
    FolioDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = FolioDetailsArray;
                    FolioDetails.bulkCreate(FolioDetailsArray).then(() => {
                        return FolioDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Folio_Details_API', error);
                    res.status(200).json({ Success: false, Message: "Error while truncate for Get_Folio_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);

      res.status(200).json({ Success: true, Message: "Folio details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Folio_Details_API:", error);
      res.status(500).json({ Success: false, Message: "Error processing Get_Folio_Details_API", Data: error.message || error });
    }
  });


    router.route('/Get_Empolyee_Details_API')
  .get(async (req, res) => {
    try {
      // 1. Get client details from external API
      const apiResult = await getEmpolyeeDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const EmpolyeeDetailsArray = apiResult.data;
      console.log("Client Details Array:", EmpolyeeDetailsArray);

        const EmployeeDetails = datamodel.EmployeeDetails();
    EmployeeDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = EmpolyeeDetailsArray;
                    EmployeeDetails.bulkCreate(EmpolyeeDetailsArray).then(() => {
                        return EmployeeDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Empolyee_Details_API', error);
                    res.status(200).json({ Success: false, Message: "Error while truncate for Get_Empolyee_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);

      res.status(200).json({ Success: true, Message: "Empolyee details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Empolyee_Details_API:", error);
      res.status(500).json({ Success: false, Message: "Error processing Get_Empolyee_Details_API", Data: error.message || error });
    }
  });
  


      router.route('/Get_BankCSO_Details_API')
  .get(async (req, res) => {
    try {
      // 1. Get client details from external API
      const apiResult = await getBankCSO_Details();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const BANKCSODetailsArray = apiResult.data;
      console.log("Client Details Array:", BANKCSODetailsArray);

        const BakerCSODetails = datamodel.BakerCSODetails();
    BakerCSODetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = BANKCSODetailsArray.result;
                    console.log('Bulk data',bulkdata);
                    BakerCSODetails.bulkCreate(bulkdata).then(() => {
                        return BakerCSODetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_BankCSO_Details_API', error);
                    res.status(200).json({ Success: false, Message: "Error while truncate for Get_BankCSO_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);

      res.status(200).json({ Success: true, Message: "BANK CSO Details Array saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_BankCSO_Details_API:", error);
      res.status(500).json({ Success: false, Message: "Error processing Get_BankCSO_Details_API", Data: error.message || error });
    }
  });
return router;
};


async function getClientDetails() {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
let data = JSON.stringify({
  "fDate": yesterday,
  "tDate": yesterday,
  "queryFile": "ClientMaster.xml",
  "modifiedDate": yesterday,
  "scope": "",
  "scopeId": "",
  "queryCriteria": [
    {
      "field": "output",
      "type": "",
      "defaultValue": "JSON"
    },
    {
      "field": "txtField1",
      "type": "",
      "defaultValue": ""
    }
  ]
});

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://ws.neo-wealth.com/wealthspectrum/app/api/boQueries/execute',
    headers: {
      'Authorization': 'Bearer 79117bffV2e07h49f40Kbf30Wu4c4c21f9c6d56a',
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}


    async function getClientUploadDetails() {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const data = JSON.stringify({
    "fDate": yesterday,
    "tDate": yesterday,
  "queryFile": "ClientUploadFormat.xml",
  "scope": "",
  "scopeId": "",
  "queryCriteria": [
    {
      "field": "output",
      "type": "",
      "defaultValue": "JSON"
    },
    {
      "field": "txtField1",
      "type": "",
      "defaultValue": ""
    }
  ]
});
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ws.neo-wealth.com/wealthspectrum/app/api/boQueries/execute',
  headers: { 
    'Authorization': 'Bearer 79117bffV2e07h49f40Kbf30Wu4c4c21f9c6d56a', 
    'Content-Type': 'application/json'
  },
  data : data
};

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }

}

    async function getFolioDetails() {
 const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const data = JSON.stringify({
    "fDate": yesterday,
    "tDate": yesterday,
  "queryFile": "ClientDPBankFolioDtl.xml",
  "scope": "",
  "scopeId": "",
  "queryCriteria": [
    {
      "field": "output",
      "type": "",
      "defaultValue": "JSON"
    },
    {
      "field": "txtField1",
      "type": "",
      "defaultValue": ""
    }
  ]
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ws.neo-wealth.com/wealthspectrum/app/api/boQueries/execute',
  headers: { 
    'Authorization': 'Bearer 79117bffV2e07h49f40Kbf30Wu4c4c21f9c6d56a', 
    'Content-Type': 'application/json'
  },
  data : data
};

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }

}


    async function getEmpolyeeDetails() {
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://console.theneoworld.com/genie-etl/v1/api/main/master-employee',
  headers: { 
    'client_code': 'niva-etl', 
    'Authorization': 'eyJuYW1lIjogIkdFTklFIEFQSSBQUk9EIn0=', 
    'offset': '1'
  }
};

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }

}




    async function getBankCSO_Details() {
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://console.theneoworld.com/genie-etl/v1/banker-cso-mapping?limit=100&offset=0',
  headers: { 
    'client_code': 'niva-etl', 
    'Authorization': 'Bearer Yi1TSHJDX0xWV3M6aGVHa0JVRE1PcjJpMm83ZlNNSEJCUQ=='
  }
};

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }

}


var Get_Client_Details_API = async function(){

  try {
      // 1. Get client details from external API
      const apiResult = await getClientDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const clientDetailsArray = apiResult.data;
      console.log("Client Details Array:", clientDetailsArray);

        const ClientMasterDetails = datamodel.ClientMasterDetails();
    ClientMasterDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = clientDetailsArray;
                    ClientMasterDetails.bulkCreate(clientDetailsArray).then(() => {
                        return ClientMasterDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_PO_Files_API', error);
                  //  res.status(200).json({ Success: false, Message: "Error while truncate for BoEMasterDetails", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);
console.log('Client Details Array:', clientDetailsArray);
      //res.status(200).json({ Success: true, Message: "Client details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Client_Details_API:", error);
      //res.status(500).json({ Success: false, Message: "Error processing client details", Data: error.message || error });
    }

}

var Get_Client_Upload_Details_API = async function(){
       try {
      // 1. Get client details from external API
      const apiResult = await getClientUploadDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const clientUploadDetailsArray = apiResult.data;
      console.log("Client Details Array:", clientUploadDetailsArray);

        const ClientUploadDetails = datamodel.ClientUploadDetails();
    ClientUploadDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = clientUploadDetailsArray;
                    ClientUploadDetails.bulkCreate(clientUploadDetailsArray).then(() => {
                        return ClientUploadDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Client_Details_API', error);
                  //  res.status(200).json({ Success: false, Message: "Error while truncate for Get_Client_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);
console.log('Client Upload details saved successfully', clientUploadDetailsArray);
      //res.status(200).json({ Success: true, Message: "Client Upload details saved successfully", Data: null });
     // res.status(200).json({ Success: true, Message: "Client Upload details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Client_Details_API:", error);
     // res.status(500).json({ Success: false, Message: "Error processing client details", Data: error.message || error });
    }
}


var Get_Folio_Details_API = async function()
{
    try {
      // 1. Get client details from external API
      const apiResult = await getFolioDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const FolioDetailsArray = apiResult.data;
      console.log("Client Details Array:", FolioDetailsArray);

        const FolioDetails = datamodel.FolioDetails();
    FolioDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = FolioDetailsArray;
                    FolioDetails.bulkCreate(FolioDetailsArray).then(() => {
                        return FolioDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Folio_Details_API', error);
                    //res.status(200).json({ Success: false, Message: "Error while truncate for Get_Folio_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);
    console.log('Folio details saved successfully', FolioDetailsArray);
     // res.status(200).json({ Success: true, Message: "Folio details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Folio_Details_API:", error);
     // res.status(500).json({ Success: false, Message: "Error processing Get_Folio_Details_API", Data: error.message || error });
    }
  ;

}
var Get_Empolyee_Details_API = async function()
{
    try {
      // 1. Get client details from external API
      const apiResult = await getEmpolyeeDetails();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const EmpolyeeDetailsArray = apiResult.data;
      console.log("Client Details Array:", EmpolyeeDetailsArray);

        const EmployeeDetails = datamodel.EmployeeDetails();
    EmployeeDetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = EmpolyeeDetailsArray;
                    EmployeeDetails.bulkCreate(EmpolyeeDetailsArray).then(() => {
                        return EmployeeDetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_Empolyee_Details_API', error);
                    res.status(200).json({ Success: false, Message: "Error while truncate for Get_Empolyee_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);
console.log('Empolyee details saved successfully', EmpolyeeDetailsArray);
      //res.status(200).json({ Success: true, Message: "Empolyee details saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_Empolyee_Details_API:", error);
      //res.status(500).json({ Success: false, Message: "Error processing Get_Empolyee_Details_API", Data: error.message || error });
    }
}
var Get_BankCSO_Details_API = async function()
 {
    try {
      // 1. Get client details from external API
      const apiResult = await getBankCSO_Details();

      if (!apiResult || !apiResult.data || apiResult.data.length === 0) {
        return res.status(200).json({ Success: false, Message: "No data received from API", Data: null });
      }

      // Assuming apiResult.data is an array of client details objects
      const BANKCSODetailsArray = apiResult.data;
      console.log("Client Details Array:", BANKCSODetailsArray);

        const BakerCSODetails = datamodel.BakerCSODetails();
    BakerCSODetails.destroy({
                        where: {},
                        truncate: true
                })
                .then(() => {
                    //console.log('Bulk data',result);
                    var bulkdata = BANKCSODetailsArray.result;
                    console.log('Bulk data',bulkdata);
                    BakerCSODetails.bulkCreate(bulkdata).then(() => {
                        return BakerCSODetails.findAll();
                    })
  
                })
                .catch(function (error) {
                    dataconn.errorlogger('SchedulerFunction', 'Get_BankCSO_Details_API', error);
                   // res.status(200).json({ Success: false, Message: "Error while truncate for Get_BankCSO_Details_API", Data: error });
                });

      // 3. Bulk insert new data
     // await ClientDetails.bulkCreate(clientDetailsArray);
console.log('BANK CSO Details Array saved successfully', BANKCSODetailsArray);
     // res.status(200).json({ Success: true, Message: "BANK CSO Details Array saved successfully", Data: null });
    } catch (error) {
      console.error("Error in /Get_BankCSO_Details_API:", error);
     // res.status(500).json({ Success: false, Message: "Error processing Get_BankCSO_Details_API", Data: error.message || error });
    }
  }



module.exports  = routes;
module.exports.Get_Client_Details_API = Get_Client_Details_API;
module.exports.Get_Client_Upload_Details_API = Get_Client_Upload_Details_API;
module.exports.Get_Folio_Details_API = Get_Folio_Details_API;
module.exports.Get_Empolyee_Details_API = Get_Empolyee_Details_API;
module.exports.Get_BankCSO_Details_API = Get_BankCSO_Details_API;

