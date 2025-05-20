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
                        { text: `Annexure 2 (b) (v)`, bold: 'true', alignment: 'center', decoration: 'underline' },
                        { text: `\n\n(ON LETTERHEAD OF APPLICANT) `, background: '#ffff00', bold: 'true', alignment: 'center', },
                        { text: `\n\n(For Partnership Firms/LLP)`, background: '#ffff00', bold: 'true', alignment: 'center', },

                        `\n\nDate of Certificate _________
                Submitted by `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        ` (name of Authorised Person) to BSE LTD
                `,
                        `\nShareholding Pattern of `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        ` (name of Authorised Person) 
                As on __________ (date)
                 \n`,
                    ]
                },

                {
                    style: 'tableExample',
                    table: {
                        widths: [60, 120, 100, 75, 60, '*'],
                        body: [
                            [{ text:'Sr. No.',alignment:'center'}, {text:'Name of the Partner',alignment:'center'}, {text:'Capital in the Firm In',alignment:'center'},{text:'% Share in Profits',alignment:'center'}, {text:'% Share in Losses',alignment:'center'}],
                            [' 1.', '', '', '', '',],
                            [' 2.', '', '', '', '',],
                            [' 3.', '', '', '', '',],
                            [' 4.', '', '', '', '',],
                            [' 5.', '', '', '', '',],
                            [' TOTAL', '', '', '100%', '100%',],


                        ]
                    }
                },

                { text: `\nPartner: Mr. / Ms. ___________________________________`, bold: 'true' },

                { text: `\nDate : ${date}`, },
                { text: `\nPlace:`, },

                {
                    text: [
                        { text: `\n    Signature/s of Director/s`, alignment: 'right' },
                        { text: `\nWith Stamp of the Authorised Person`, alignment: 'right' },

                        { text: `\n\n\nCERTIFICATE`, alignment: 'center' },
                        {
                            text: `\n\nThis is to certify that the Capital and Sharing Pattern of  ______________________________________ as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction. 

`},

                        { text: `\nDate :`, },
                        { text: `\nPlace:`, },


                        { text: `\n\nFor `, alignment: 'center' },
                        { text: `\n\n(Signature of Partner/Proprietor of Certifying Firm):`, alignment: 'right' },
                        { text: `\n\nStamp of Certifying Firm with Membership Number`, alignment: 'right' },
                        { text: `\n\n(Chartered Accountant/Company Secretary Firm)`, alignment: 'right' },
                    ]
                },




            ]
        }
        return dd
    }
}