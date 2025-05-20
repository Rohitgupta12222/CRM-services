var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        // let p = path.join(__dirname, '/Sample1.png')

        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)

        let date = new Date()

        // console.log(commonFunction.ConvertDateToDDMMYYYY(date))
        var dd = {
            content: [

                {
                    text: [
                        { text: `\n\nAnnexure – 4`, bold: 'true', alignment: 'center', },
                        { text: `\n(On the letterhead of the Authorised person)`, background: '#ffff00', bold: 'true', alignment: 'center', },
                        { text: `\n(For Corporate body)`, background: '#ffff00', bold: 'true', alignment: 'center', },

                        `\n\nShareholding Pattern of `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, decoration: 'underline' },
                        ` (name of Authorised Person) as on `,
                        { text: commonFunction.ConvertDateSlash(date), decoration: 'underline' },
                        ` (date)
\n\n`,

                    ]
                },


                {
                    style: 'tableExample',
                    table: {
                        widths: [60, 120, 70, 75, 60, '*'],
                        body: [
                            [{ text: `Sr. No.`, bold: 'true' }, { text: `Name $`, bold: 'true' }, { text: `Number of Shares held `, bold: 'true' }, { text: `Paid-up value per share Rs.`, bold: 'true' }, { text: `Amt paid-up Rs.`, bold: 'true' }, { text: `% age of total`, bold: 'true' }],
                            [' 1.', '', '', '', '', '',],
                            [' 2.', '', '', '', '', '',],
                            [' 3.', '', '', '', '', '',],
                            [' 4.', '', '', '', '', '',],
                            [' 5.', '', '', '', '', '',],
                            ['Others', '', '', '', '', ''],
                            [{ text: ' TOTAL', bold: 'true' }, '', '', '', '', { text: '100%', bold: 'true' }],


                        ]
                    }
                },

                { text: `\n\nPlace:`, },

                {
                    text: [
                        { text: `\n\n Signature(s)`, alignment: 'left' },
                        { text: `\nSignature of Director of the Authorised Person`, alignment: 'left' },
                        { text: `\nWith Stamp of the Authorised Person`, alignment: 'left' },

                        { text: `\n\n\nCERTIFICATE`, alignment: 'center' },
                        `\n\nThis is to certify that the Shareholding in  M/s. `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, decoration: 'underline',bold:'true' },
                        ` as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction. 

`,

                        { text: `\n\nDate:`, },
                        { text: `\nPlace:`, },


                        { text: `\n\n\n\n\n For (Name of Certifying Firm)`, alignment: 'left' },
                        { text: `\nName of the Partner/Proprietor `, alignment: 'left' },
                        { text: `\nChartered Accountant/Company Secretary `, alignment: 'left' },
                        { text: `\nMembership Number`, alignment: 'left' },
                    ]
                },

            ]
        }
        return dd
    }
}