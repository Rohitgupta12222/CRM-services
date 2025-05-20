// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')

module.exports = {


    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let date = commonFunc.ConvertDateSlash(new Date())
        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        var dd = {
            content: [
                {

                    text: '\nOn the letter heard of Authorised Person\n\n\n',
                    fontSize: 11,
                    alignment: 'center',
                    color: '#919191',
                },
                {
                    text: `Annexure IV

(For Corporates)
`, bold: 'true', alignment: 'center',
                },
                {
                    text: `\n(On the letter head of Authorised Person)\n
`, alignment: 'center'
                },
                {
                    text: [
                        `Shareholding Pattern of `,
                         {text:`${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline'}, 
                         ` (name of Authorised Person) as on `,
                         {text:`${date}`, bold: 'true', decoration: 'underline'},
` (date) 

Paid up ____________Rs.________________________________________________ 

Face value of each equity share___________ Rs._______________________________
\n`,
                    ]
                },
                {
                    style: 'Example',
                    table: {
                        widths: [65, 200, 55, 60, 65],
                        heights: [60, 15, 15, 15, 15, 15, 15, 15],
                        body: [

                            [{ text: `Sr. no.`, bold: 'true', alignment: 'center', }, { text: `Name`, bold: 'true', alignment: 'center', }, { text: `Number of Shares held`, bold: 'true', alignment: 'center', }, { text: `Amt paid- up Rs.`, bold: 'true', alignment: 'center', }, { text: `% age of total`, bold: 'true', alignment: 'center', }],
                            [` 1 `, `  `, `  `, `  `, `  `],
                            [` 2 `, `  `, `  `, `  `, `  `],
                            [` 3 `, `  `, `  `, `  `, `  `],
                            [`  4`, `  `, `  `, `  `, `  `],
                            [` 5 `, `  `, `  `, `  `, `  `],
                            [` Others `, `  `, `  `, `  `, `  `],
                            [{ text: `TOTAL`, bold: 'true', alignment: 'center', }, `  `, `  `, `  `, { text: `100% `, bold: 'true' }],

                        ]

                    }

                },

                `
Signature(s) 

Name of Director(s) 

Stamp of the Authorised Person
`,

                { text: `\nCERTIFICATE`, bold: 'true', alignment: 'center', },

                `\nThis is to certify that the Shareholding as given above, based on my/ our scrutiny of the books of 
accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction. Further, we confirm that there is no foreign shareholding in the said entity. 




Chartered Accountant 

Membership Number
`,]

        }
        return dd
    }
}