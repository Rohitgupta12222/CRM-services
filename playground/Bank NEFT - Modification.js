var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunction = require('../Common/CommonFunctions');
let path = require('path');
const { Op } = require('sequelize');
let q = require('sequelize')


module.exports = {
    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let NeftActivationDetails = datamodel.NeftActivationDetails();
        let EntityMst = datamodel.EntityMst()
        let AP_General_Details = datamodel.AP_General_Details()
        let AP_Branch_Details = datamodel.AP_Branch_Details()

        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        // Id: Number(fileParams.apId),
        // PAN_Number:(fileParams.PAN_Number),
        
        let param1 = { where: {Id:{ [Op.lte]: Number(fileParams.apId)},PAN_Number:(fileParams.PAN_Number), IsActive: true }, order: [['Id', 'DESC']],limit: 2  }
        let neftBankDtls = await dataaccess.FindAll(NeftActivationDetails, param1)
        // console.log('neftBankDtls',neftBankDtls)
   let c= []
   c.push(neftBankDtls[0])
   let d = []
   d.push(neftBankDtls[1])
   
        let apCode = []
        let apCode1 = []
        
        // let m = neftBankDtls.map(async e => {
        //     if (e && e.PAN_Number) {
                let apData = await dataaccess.FindOne(AP_General_Details, { where: { PAN_Number: (fileParams.PAN_Number), Process_Id: 2 } })
                let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, { where: { AP_Id: apData.Id, IsRegistered: true , IsActive:true } })
                // console.log("apData",apData);
                // console.log("apBranchDtls",apBranchDtls);
                apCode.push(apBranchDtls == null ? ' ' : apBranchDtls.AP_Code.toUpperCase())
                apCode1.push(apBranchDtls == null ? ' ' : apBranchDtls.AP_Code.toUpperCase())
        //     } else {
        //         apCode.push(' ')
        //         apCode1.push(' ')
        //     }
        // })
        // await Promise.all(m)

        // console.log("apCode",apCode)
        


        let date = commonFunction.ConvertDateSlash(new Date())

        let t = ['Sr. No.', 'Beneficiary Code (If Applicable)', 'Account Name', 'Account no.', 'IFSC Code', 'Bank name', 'Remark']
        let t1 = ['Sr. No.', 'Beneficiary Code (If Applicable)', 'Account Name', 'Account no.', 'IFSC Code', 'Bank name', 'Remark']

        var dd = {
            header: {
                margin: 15,
                columns: [
                    {},
                    {
                        image: p,
                        width: 120,
                        alignment: 'right',

                    },]
            },
            footer: {
                layout: 'noBorders',
                margin: [20, 0, 10, 100],
                table: {
                    body: [
                        [
                            {
                                stack: [

                                    { text: `${entityData[0].Entity_Name}`, bold: 'true', fontSize: 8, },
                                    {
                                        text: [
                                            {
                                                text: `Registered Office:${entityData[0].RegisteredAddress} Tel: +91 79 6662 9900
Corporate Office: ${entityData[0].CorporateAddress} `, fontSize: 8,
                                            },


                                            {
                                                text: ` www.edelcap.com `, bold: 'true', fontSize: 8, color: '#00008B'
                                            },
                                        ]
                                    }
                                ]
                            },]]
                },
            },
            content: [


                {
                    text: [

                        { text: ` Date: ${date}\n`, bold: 'true', alignment: 'left', fontSize: 11 },
                        {
                            text: `\n               
To,
HDFC BANK LTD,
`, bold: 'true', fontSize: 11
                        },
                        ` ENET Operations Desk,
Mumbai.
`,

                        {
                            text: `\nSubject: Addition of Beneficiaries for E-Payments.
`, decoration: 'underline', bold: 'true', alignment: 'left', fontSize: 11
                        },

                        `\n\nDear Sir/ Madam,`,
                        `

            Please map following A/c as our Beneficiaries Updating for RTGS/ NEFT, and old Map Bene account is deleted due to wrongly account number map.
`,

                        { text: `\nNew Account updated:\n\n`, bold: 'true', fontSize: 11 },
                    ]
                },



                table1(c, t1, apCode),

                { text: `\nOld Account deleted:\n\n`, bold: 'true', fontSize: 11 },


                table(d, t, apCode1),

                { text: ` \n Below mention A/c Number HDFC Bank please verify the signatures.\n\n`, alignment: 'center', fontSize: 10 },


                {
                    style: 'tableExample',
                    fontSize: 10,
                    widths: [80, 120, '*'],
                    table: {
                        body: [
                            ['EXCHANGE', 'A/C NO.', 'A/C NAME'],
                            ['NSECASH', '00600340023374', `${entityData[0].Entity_Name}`],
                            ['EBLMCX', '57500000421076', 'EDELWEISS BROKING LIMITED OWH A/C'],


                        ]
                    },
                },


                {
                    text: [
                        {
                            text: `\nRelationship Manager: Chetan Aanam/ Meeta Bhalerao

Domain ID: EDELWEISSBL
`, bold: 'true', fontSize: 11
                        },
                        `\nThanking you,

Yours faithfully,
`,
                        {
                            text: `\nFor ${entityData[0].Entity_Name}



Authorised Signatory

`, bold: 'true', fontSize: 11
                        },


                    ]
                },


            ]
        }
        return dd
    }
}
function table(data, columns, a) {

    return {
        color: 'red',
        // fontSize: 9,
        table: {
            headerRows: 1,
            // widths: [18, 48,140, 80, 70, 135],
            body: buildTableBody(data, columns, a)
        }
    }
}


function buildTableBody(data, columns, a) {
    var body = [];
    data.map((e, i) => e['index'] = i + 1)
    body.push(columns);

    data.map(function (row) {
        var dataRow = [];

        dataRow.push(row.index.toString());
        dataRow.push(a);
        dataRow.push(row.Name == null ? ' ' : row.Name.toUpperCase());
        dataRow.push(row.AccountNo == null ? ' ' : row.AccountNo.toUpperCase());
        dataRow.push(row.IFSC == null ? ' ' : row.IFSC.toUpperCase());
        dataRow.push(row.BankName == null ? ' ' : row.BankName.toUpperCase());
        dataRow.push('UPDATED');



        body.push(dataRow);
    });


    return body;
}

function table1(data, columns, a) {

    return {

        // fontSize: 9,
        table: {
            headerRows: 1,
            // widths: [18, 48,140, 80, 70, 135],
            body: buildTableBody1(data, columns, a)
        }
    }
}


function buildTableBody1(data, columns, a) {
    var body = [];
    data.map((e, i) => e['index'] = i + 1)
    body.push(columns);

    data.map(function (row) {
        var dataRow = [];

        dataRow.push(row.index.toString());
        dataRow.push(a);
        dataRow.push(row.Name == null ? ' ' : row.Name.toUpperCase());
        dataRow.push(row.AccountNo == null ? ' ' : row.AccountNo.toUpperCase());
        dataRow.push(row.IFSC == null ? ' ' : row.IFSC.toUpperCase());
        dataRow.push(row.BankName == null ? ' ' : row.BankName.toUpperCase());
        dataRow.push('UPDATED');



        body.push(dataRow);
    });


    return body;
}



