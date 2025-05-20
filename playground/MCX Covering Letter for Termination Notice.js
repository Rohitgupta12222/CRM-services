
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
var commonFunction = require('../Common/CommonFunctions');
module.exports = {
    createDocDefinition: async (fileParams) => {

        let p = path.join(__dirname, '/Sample1.png')
        let AP_General_Details = datamodel.AP_General_Details()
        let AP_Registration_Details = datamodel.AP_Registration_Details()
        let AP_Branch_Details = datamodel.AP_Branch_Details()
        let EntityMst = datamodel.EntityMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()


        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })


        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param1 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } }
        let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, param1)
        let date = commonFunction.ConvertDateSlash(new Date())
        let param2 = { where: { AP_ID: Number(fileParams.apId) } }
        let registration = await dataaccess.FindOne(AP_Registration_Details, param2)
        let city = {};
        let state = {};
        if (apBranchDtls) {
            if (apBranchDtls.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
            } else {
                city.City_name = ' ';
            }
            if (apBranchDtls.State_Code) {
                state = await dataaccess.FindOne(StateMst, { where: { Id: apBranchDtls.State_Code } })
            } else {
                state.State_Name = ' ';
            }
        }
        let b;

        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ' ,' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '- ' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code)).toUpperCase()
        } else {
            b = '';
        }
        var dd = {
            header: {
                margin: 15,
                columns: [
                    {},
                    {
                        image: p,
                        width: 140,
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
                                    {
                                        text: `               ${entityData[0].Entity_Name}
                        Corporate Identity Number: ${entityData[0].CINNumber}`, bold: 'true', fontSize: 8, color: '#00008B'
                                    },
                                    {
                                        text: `Registered Office: ${entityData[0].RegisteredAddress} Tel No.: +91 79-40019900 &  79 6692 9900
                        Corporate Office: ${entityData[0].CorporateAddress} Tel No.: +91 22 4009 4400  
                        `, fontSize: 8,
                                    },
                                ]
                            },]]
                },
            },
            content: [
                {
                    text: [
                        `\n\n\n\n`,
                        {
                            text: `Application for Termination of Authorised Person(s) in case 
Authorised Person is not traceable 
`, bold: 'true', alignment: 'center'
                        },
                        { text: `(On the letter head of the member)`, alignment: 'center' },
                        { text: `\nDate:   ${date}`, alignment: 'right' },

                        `\nTo
The Membership Department
Multi Commodity Exchange of India Limited
CTS No. 255, Gundavali, Suren Road,
Chakala Andheri (East)
Mumbai – 400 093

Dear Sir/Madam,

I/We hereby request the Exchange for termination of the following Authorised Person(s) with the Exchange due to non-traceable.

Details are as under:\n
`,
                    ]
                },
                {
                    style: 'tableExample', alignment: 'center',
                    table: {
                        widths: [20, 60, 75, 72, 53, 80, 115],
                        body: [
                            [{ text: `Sr. No`, bold: 'true' }, { text: `Name of the Authorised Person`, bold: 'true' }, { text: `Trade Name of the Authorised Person`, bold: 'true' }, { text: `Office Address of Authorised Person`, bold: 'true' }, { text: `Authorised Person Code`, bold: 'true' }, {
                                text: `Date of
Approval by Exchange`, bold: 'true'
                            }, { text: `Reason for Termination`, bold: 'true' }],
                            [' 1', ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, ` ${b}

                            `, `${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}`, commonFunction.ConvertDateSlash(registration.RegistrationDate == null ? ' ' : registration.RegistrationDate), `«Reason_for__Cancellation_»`]



                        ]
                    }
                },
                `\nWe hereby confirm/undertake that:

1.	The above mentioned Authorised Person(s) has been disabled from trading (if any trading terminal is provided by the Member to Authorised Person)

2.	We have served notice(s) to the Authorised Person informing the termination by us and acknowledgement of receipt(s) by Authorised Person(s) is/are maintained by us.

3.	The agreement(s) entered with the aforesaid Authorised Person(s) has/have been terminated. 

4.	No complaint/ arbitration/disciplinary proceeding/investigation/inquiry is pending against us in respect of clients dealing through said Authorised Person(s). There is no financial dispute of any matter between us and the aforesaid Authorised Person(s)`,
                `\n`,
                `\n`,
                `OR  

There are _no_ pending complaints against us in respect of clients registered through aforesaid Authorised Person(s) and would be resolved in terms of Exchange Rules, Byelaws, Business Rules and circulars of the Exchange issued from time to time.
`,

                { text: `\n\n\n`, pageBreak: 'before' },
                {
                    text: [

                        `5.	All the registered clients introduced/registered through the aforesaid Authorised Person(s) have been intimated by us about the termination of Authorised Person(s) with us through letters/e-mails. Further, we have maintained the proof of delivery of all such letters/e-mails sent to all the clients.

6.	We have also maintained the log reports for the intimation sent to clients through e-mail(s). In case of undelivered e-mails/bouncing of mails from the e-mail id provided by the client, we have sent the letter(s) to such clients and have maintain the proof of delivery of such letter(s).

7.	We confirm that all the clients under the said Authorised Person is being/ have been shifted under the Member/ another Authorised Person or to the existing branch of the member and the said client(s) don’t have any objection for the same.

8.	We undertake to honour all the liabilities/obligations arising from the acts of omission or commission of the Authorised Person done by the Authorised Person /employee of the Authorised Person during tenure when he was registered as Authorised Person with us till the termination of appointment is approved by the Exchange.

9.	Please mention whether the above said AP was Active or Inactive during this quarter. `, { text: `Inactive`, decoration: 'underline' },

                        `\n \u200B\t  (If active, the Annual Subscription charges will be levied towards this AP as per Exchange Circular No. MCX/MEM/164/2021  dated 17-03-2021).`,

                        {
                            text: `\n\n\n\n\n\n(Signature & Name of member)
(To be signed by Proprietor/ Managing Partner/ Designated Director/ authorised signatory as on the records of the Exchange)
`, bold: 'true'
                        },
                    ]

                },

            ]

        }
        return dd
    }
}
