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
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()


        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let param2 = {
            where: { AP_Id: Number(fileParams.apId), IsActive: true },
            //attributes: ['Contact_Person_Name'] 
        }
        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, param2)

        let str = apContact.map(e => e.Contact_Person_Name== null ? ' ' :e.Contact_Person_Name.toUpperCase()).join(', ')
        // console.log(str);
        let date = commonFunction.ConvertDateSlash(new Date())

        var dd = {
            content: [
                `\n\n\n\n\n\n\n\n`,
                { text: `(ON LETTERHEAD OF APPLICANT)`, alignment: 'center', color: '#919191'},
                { text: `\nAnnexure 2(b)(ii)`, bold: 'true', alignment: 'center', decoration: 'underline' },
                { text: `\nUNDERTAKING`, bold: 'true', alignment: 'center', decoration: 'underline' },              
                {
                    text: `\n\n[An applicant should submit this confirmation/declaration/undertaking while submitting an application for Authorized Person registration]

\nDy. General Manager
Membership Compliance Dept.
Bombay Stock Exchange Ltd.
Mumbai

`, bold: 'true',
                },
                {
                    text: [
                        `\nI/We hereby confirm/declare/undertake that `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()} (${str})`, bold: 'true', decoration: 'underline', alignment: 'justify' },
                        { text: `(Name of proprietor/all partners/all directors as applicable should be mentioned)`, color: '#ff0000', },
                        ` have not been convicted of any offence involving fraud or dishonesty and no trial is pending against above applicant/s in any court of law.

\nI/We hereby confirm/declare/undertake that the SEBI has not taken any action like cancellation of registration / or debarred or prohibited any of the applicant /s from dealing in securities market/imposed penalty after adjudication/prosecution etc. against any of the applicant/s `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline', alignment: 'justify' },
                        { text: ` (names as applicable)`, color: '#ff0000', },

                        `\n\nIn case of non-compliance on any of above or in case this confirmation/declaration/undertaking is found to be false, the Exchange may take necessary Disciplinary action as per the Rules, Byelaws and Regulations of BSE Limited.`,

                        `\n\n\nSignature of Applicant
Proprietor / Partner / Director
(with rubber stamp)`,

                        `\n\n\n\n\n\nDate: ${date}`]
                }]
        }
        return dd
    }
}