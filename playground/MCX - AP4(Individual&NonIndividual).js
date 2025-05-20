var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let date = commonFunction.ConvertDateSlash(new Date())
        let EntityMst = datamodel.EntityMst()


        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        var dd = {
            content: [
                `\n\n\n\n\n\n\n\n`,
                {
                    text: [
                        { text: `(On the letter head of Authorised Person)`, bold: 'true', alignment: 'center', color: '#919191' },
                        {
                            text: `\n\nAP-4`, bold: 'true', alignment: 'center',
                        },
                        {
                            text: `\n\nUndertaking`, bold: 'true', alignment: 'center',
                        },

                        `\n\nI/We Mr./Ms./M/s. `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, decoration: 'underline', bold:'true' },
                        ` (name of the applicant) had applied for Appointment as Authorised Person of the Exchange through member, `,
                        { text: `${entityData[0].Entity_Name}`, bold: 'true' },
                        {
                            text: ` In this regard, 
I/We hereby confirm/undertake that: `}

                    ]
                },





                `\n1.  I/We and our partners/directors have not been convicted for any offence in the past and presently not under trial for any offence involving fraud and dishonesty.



2.  I/We will deal directly with investors and not through any other authorised person on appointment with exchange.



3.  I/We and our directors/partners is/are neither an Authorised Person of any other member of the Exchange and nor has/have applied for appointment as Authorised Person with any other member of the Exchange.



4.  We are not defaulter / expelled on any Exchange



5.  I/We are “fit and proper” person under SEBI (Intermediaries) Regulations, 2008 and no action has been taken against us by SEBI, RBI etc. and we have not defaulted in payment to any agency.



6.  I/We shall abide by the guidelines issued by SEBI/Exchange in this regard.`,

                {
                    text: [
                        `\nDate : `, { text: `${date}`, decoration: 'underline', bold:'true' },

                    ]
                },

                { text: `\nPlace: ______________ ` }, {
                    text: `_________________________________ 
                                                                                                 ** Signature, Name & Seal           
`, alignment: 'right', bold: 'true'
                },







                `\n** Should be signed by Individual/ All partners / All Directors of the proposed Authorised Person.`,

                ,


            ]
        }
        return dd
    }
}