const environmentConfig = {
    local:{
        service_port: 1339,
        ui_url: 'http://localhost:4200/Admin/',
        api_url: 'http://localhost:1339/api/',
        dbConn: {
            dbServer: 'dbdev1.neweltechnologies.in',
            dbName: 'NEO_CSO_STATEMENT',
            dbUser: 'dbmasteruser',
            dbPassword: 'RO?[$#D8OkY_E~;2}[g&E5j7C:bJoB`P',     
        }
        //  dbConn: {
        //     dbServer: '127.0.0.1',
        //     dbName: 'TEST',
        //     dbUser: 'postgres',
        //     dbPassword: '1234',   
        // }

    },  
    uat:{
        service_port: 1338,
        ui_url: 'http://localhost:4200/Admin/',
        api_url: 'http://localhost:1338/api/',
        //api_url: 'https://apbackofficeapibeta.edelweiss.in/api/',
        dbConn: {
            dbServer: '10.224.135.10',
            dbName: 'Admin_QuickFMS',
            dbUser: 'postgres',
            dbPassword: '1234',           
        }
    },
    live:{
        service_port: 1337,
        ui_url: 'http://localhost:4200/Admin/',
        api_url: 'http://localhost:1337/api/',
        dbConn: {
            dbServer: '10.224.135.10',
            dbName: 'Admin_QuickFMS_UAT',
            dbUser: 'postgres',
            dbPassword: '1234',            
        }
    }
}

const email_smtp_config = {
    host: "smtp.com",   //SMTP Host Address
    port: 123,                 //SMTP PORT
    auth: {
        user: "rahul.g@neweltechnologies.com",   //Username
        pass: "1212"    //Password
    }
}



const environment = 'local'; 
const finalConfig = environmentConfig[environment];
const Uploads_Folder = '/Uploads'
const Signature_Folder = '/Signature'

const Closure_Folder = '/BranchDocument'
module.exports.service_port = finalConfig.service_port;
module.exports.ui_url = finalConfig.ui_url;
module.exports.api_url = finalConfig.api_url;
module.exports.dbConn = finalConfig.dbConn;
module.exports.email_smtp_config = email_smtp_config;
module.exports.Uploads_Folder = Uploads_Folder;
module.exports.Signature_Folder = Signature_Folder;
module.exports.Closure_Folder = Closure_Folder;



//SQL AND Pg config for data migration
module.exports.Sql_Config
    = {
    user: 'rd_user_newel',

    server: '10.224.71.88',
    database: 'TASKMGR',
    password: 'rd_user_newel~',
    // domain: 'WORKGROUP',

    options: {
        trustServerCertificate: true,

        trustedConnection: true,
        integratedsecurity: true
    },
    port: 1435

}

// Live CIP creds
module.exports.Sql_Config_Prod
    = {

    // user: 'rd_user_newel', //UAT
    // server: '10.224.71.88', //UAT
    // database: 'TASKMGR', //UAT
    // password: 'rd_user_newel~', //UAT
    // domain: 'WORKGROUP', //UAT

    user: 'rd_user_newel', //PROD
    server: '10.224.79.107', //PROD
    database: 'TASKMGR', //PROD
    password: 'rd_user_newel~', //PROD
    // domain: 'WORKGROUP',

    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        integratedsecurity: true
    },
    // port: 1435, //UAT
    port: 1433, //PROD
    

}




