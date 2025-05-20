// playground requires you to assign document definition to a variable called dd

var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
var commonFunction = require('../Common/CommonFunctions');

module.exports = {
    createDocDefinition: async (fileParams) => {


        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let date = commonFunction.ConvertDateSlash(new Date())

        var dd = {
            content: [

                {
                    text: [
                        { text: `Annexure 2(b)(iv)`, bold: 'true', alignment: 'center', decoration: 'underline' },
                        { text: `\n\n(ON LETTERHEAD OF APPLICANT)`, background: '#ffff00', bold: 'true', alignment: 'center', },
                        { text: `\n(For Corporate body)`, bold: 'true', alignment: 'center', },


                        `\n\nDate of Certificate _________
Submitted by `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        ` (name of Authorised Person) to BSE LTD
`,
                        `\nShareholding Pattern of `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        ` (name of Authorised Person) 
As on __________ (date)
 \n`,
                    ]
                },


                {
                    style: 'tableExample',
                    table: {
                        widths: [60, 120, 70, 75, 60, '*'],
                        body: [
                            [{ text: `Sr. No.`, bold: 'true', alignment: 'center' }, { text: ` Name of Shareholders`, bold: 'true', alignment: 'center' }, { text: 'Number of Shares held ', bold: 'true', alignment: 'center' }, { text: 'Paid up value per share ', bold: 'true', alignment: 'center' }, { text: 'Amt Paid-Up ', bold: 'true', alignment: 'center' }, { text: '% age of total', bold: 'true', alignment: 'center' }],
                            [' 1.', '', '', '', '', '',],
                            [' 2.', '', '', '', '', '',],
                            [' 3.', '', '', '', '', '',],
                            [' 4.', '', '', '', '', '',],
                            [' 5.', '', '', '', '', '',],
                            [' TOTAL', '', '', '', '', '100%',],


                        ]
                    }
                },

                { text: `\n\n\nDate : ${date}`, },
                { text: `Place:`, },

                {
                    text: [
                        { text: `\n\n    Signature/s of Director/s`, alignment: 'right' },
                        { text: `\nWith Stamp of the Authorised Person`, alignment: 'right' },

                        { text: `\n\n\nCERTIFICATE`, alignment: 'center' },
                        `\n\nThis is to certify that the Capital and Shareholding of `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, decoration: 'underline', bold: 'true' },
                        ` as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction.`,

                        { text: `\n\n\nDate :`, },
                        { text: `\nPlace:`, },


                        { text: `\n\nFor                                                                                     `, alignment: 'right' },
                        { text: `\n\n(Signature of Partner/Proprietor of Certifying Firm) `, alignment: 'right' },
                        { text: `\n\nStamp of Certifying Firm with Membership Number`, alignment: 'right' },
                        { text: `\n\n(Chartered Accountant/Company Secretary Firm)`, alignment: 'right' },


                    ]
                },
                `\n\n`,

            ]
        }
        return dd
    }
}