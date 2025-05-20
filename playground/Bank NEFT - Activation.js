// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
var commonFunction = require('../Common/CommonFunctions');


module.exports = {
    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let NeftActivationDetails = datamodel.NeftActivationDetails();
        let EntityMst = datamodel.EntityMst()
        let AP_General_Details = datamodel.AP_General_Details()
        let AP_Branch_Details = datamodel.AP_Branch_Details()




        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })


        let param1 = { where: { Id: Number(fileParams.apId), RequestType: 'Fresh', IsActive: true } }
        let neftBankDtls = await dataaccess.FindAll(NeftActivationDetails, param1)
        // console.log(neftBankDtls.PAN_Number)
        let apCode = []
        let m = neftBankDtls.map(async e => {
            if (e && e.PAN_Number) {
                let apData = await dataaccess.FindOne(AP_General_Details, { where: { PAN_Number: e.PAN_Number } })
                let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, { where: { AP_Id: apData.Id, IsRegistered: true } })

                apCode.push(apBranchDtls == null ? ' ' : apBranchDtls.AP_Code.toUpperCase())
            } else {
                apCode.push(' ')
            }
        })
        await Promise.all(m)

        let date = commonFunction.ConvertDateSlash(new Date())

        // let a = apBranchDtls.AP_Code == null ? ' ' : apBranchDtls.AP_Code
        let t1 = ['No', 'AP Code', 'Name', 'Account No', 'IFSC code', 'Bank Name']


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
                `\n\n`,
                {
                    text: `Date: ${date}


To,
HDFC BANK LTD,
`, bold: 'true'
                },
                ` ENET Operations Desk.
Mumbai
`,

                { text: `\n\nSubject: Addition of Beneficiaries for E-Payments.`, bold: 'true', decoration: 'underline' },
                {
                    text: [
                        `\n\nDear Sir/ Madam,
                                    
                   Please map following A/c as our `,
                        { text: `Beneficiaries Updating for RTGS/ NEFT`, bold: 'true' },
                    ]
                },
                `\n\n`,

                table(neftBankDtls, t1, apCode),

                { text: `\n \n Below mention A/c Number HDFC Bank please verify the signatures.`, fontSize: 9, },
                `\n\n`,
                , {
                    style: 'tableExample',
                    fontSize: 9,


                    table: {

                        widths: [80, 120, '*'],
                        body: [
                            [`EXCHANGE`, `A/C NO.`, `A/C NAME`],
                            ['NSECASH', `00600340023374`, `${entityData[0].Entity_Name}`],
                            [`EBLMCX`, `57500000421076  `, `EDELWEISS BROKING LIMITED OWH A/C`],




                        ]
                    }
                },
                {
                    text: `\n\nRelationship Manager: Chetan Aanam/Meeta Bhalerao


Domain ID: EDELWEISSBL
`, bold: 'true', fontSize: 10,
                },
                {
                    text: `
\nThanking you,

Yours faithfully,
`, fontSize: 10,
                },
                {
                    text: `\nFor ${entityData[0].Entity_Name}



Authorized Signatory
`, bold: 'true', fontSize: 10,
                },


            ]

        }
        return dd
    }
}
function table(data, columns, a) {

    return {
        // fontSize: 9,
        table: {
            headerRows: 1,
            widths: [18, 48, 140, 80, 70, 135],
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


        body.push(dataRow);
    });


    return body;
}