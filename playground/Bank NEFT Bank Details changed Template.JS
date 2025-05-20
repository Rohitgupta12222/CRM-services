var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunction = require('../Common/CommonFunctions');
let path = require('path');

module.exports = {
    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let NeftActivationDetails = datamodel.NeftActivationDetails();
        let EntityMst = datamodel.EntityMst()


        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param1 = { where: { Id: Number(fileParams.apId), RequestType: 'Modified', IsActive: true } }
        let neftBankDtls = await dataaccess.FindAll(NeftActivationDetails, param1)

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



                table1(neftBankDtls, t1),

                { text: `\nOld Account deleted:\n\n`, bold: 'true', fontSize: 11 },


                table(neftBankDtls, t),

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
function table(data, columns) {

    return {
        color: 'red',
        // fontSize: 9,
        table: {
            headerRows: 1,
            // widths: [18, 48,140, 80, 70, 135],
            body: buildTableBody(data, columns)
        }
    }
}


function buildTableBody(data, columns) {
    var body = [];
    data.map((e, i) => e['index'] = i + 1)
    body.push(columns);

    data.map(function (row) {
        var dataRow = [];

        dataRow.push(row.index.toString());
        dataRow.push(row.AccountCode == null ? ' ' : row.AccountCode.toUpperCase());
        dataRow.push(row.Name == null ? ' ' : row.Name.toUpperCase());
        dataRow.push(row.AccountNo == null ? ' ' : row.AccountNo.toUpperCase());
        dataRow.push(row.IFSC == null ? ' ' : row.IFSC.toUpperCase());
        dataRow.push(row.BankName == null ? ' ' : row.BankName.toUpperCase());
        dataRow.push('UPDATED');



        body.push(dataRow);
    });


    return body;
}

function table1(data, columns) {

    return {

        // fontSize: 9,
        table: {
            headerRows: 1,
            // widths: [18, 48,140, 80, 70, 135],
            body: buildTableBody1(data, columns)
        }
    }
}


function buildTableBody1(data, columns) {
    var body = [];
    data.map((e, i) => e['index'] = i + 1)
    body.push(columns);

    data.map(function (row) {
        var dataRow = [];

        dataRow.push(row.index.toString());
        dataRow.push(row.AccountCode == null ? ' ' : row.AccountCode.toUpperCase());
        dataRow.push(row.Name == null ? ' ' : row.Name.toUpperCase());
        dataRow.push(row.AccountNo == null ? ' ' : row.AccountNo.toUpperCase());
        dataRow.push(row.IFSC == null ? ' ' : row.IFSC.toUpperCase());
        dataRow.push(row.BankName == null ? ' ' : row.BankName.toUpperCase());
        dataRow.push('UPDATED');



        body.push(dataRow);
    });


    return body;
}