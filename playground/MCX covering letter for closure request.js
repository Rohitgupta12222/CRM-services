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
        let AP_Branch_Details = datamodel.AP_Branch_Details()
        let AP_Registration_Details = datamodel.AP_Registration_Details()
        let EntityMst = datamodel.EntityMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()



        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param1 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } }
        let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, param1)
        let param2 = { where: { AP_ID: Number(fileParams.apId) } }
        let registration = await dataaccess.FindOne(AP_Registration_Details, param2)
        let date = commonFunction.ConvertDateSlash(new Date())
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
                        `\n\n\n`,
                        {
                            text: `Application for Cancellation of Authorised Person(s) 
`, bold: 'true', alignment: 'center'
                        },
                        { text: `(On the letter head of the member)`, alignment: 'center' },
                        { text: `\nDate:   ${date}`, alignment: 'right' },

                        `\nTo
The Membership Department 
Multi Commodity Exchange of India Limited 
CTS No. 255, Gundavali, Suren Road, 
Chakala Andheri (East) ,Mumbai – 400 093.

Dear Sir/Madam,

I/We hereby request the Exchange to cancel the appointment of following Authorised Person(s) with the Exchange.\n
Details are as under:\n
`,
                    ]
                },
                {
                    style: 'tableExample', alignment: 'center',
                    table: {
                        widths: [20, 60, 75, 70, 55, 80, 115],
                        body: [
                            [{ text: `Sr. No`, bold: 'true' }, { text: `Name of the Authorised Person`, bold: 'true' }, { text: `Trade Name of the Authorised Person`, bold: 'true' }, { text: `Office Address of Authorised Person`, bold: 'true' }, { text: `Authorised Person Code`, bold: 'true' }, {
                                text: `Date of
Approval by Exchange`, bold: 'true'
                            }, { text: `Reason for Termination`, bold: 'true' }],
                            [' 1', ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, ` ${b}

                    `, `${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}`, commonFunction.ConvertDateSlash_2(registration.RegistrationDate == null ? ' ' : registration.RegistrationDate), `«Reason_for__Cancellation_»`]




                        ]
                    }
                },
                `\nWe hereby confirm that:
        
1.	The above mentioned Authorised Person(s) has been disabled from trading (if any trading terminal is provided by the Member to Authorised Person)`,

                {
                    text: [
                        { text: `2.	The agreement(s) between the member,` }, { text: `${entityData[0].Entity_Name}`, bold: 'true' }, { text: ` and the above mentioned Authorised Person(s) has/have been terminated.` },
                        `\n3.	No complaint/ arbitration/disciplinary proceeding/investigation/inquiry is pending against us in respect of clients dealing through this Authorised Person. There is no financial dispute of any matter between us and this Authorised Person.
4.	All the registered clients of that branch have been intimated by us fifteen days before the disaffiliation of Authorised Person with us.
5.	All the records (if any) required for the records and audit have been collected from the Authorised Person.
6.	Copy of request(s) received from the Authorised Person(s) mentioned above is/are enclosed.
7.	Please mention whether the above said AP was Active or Inactive during this quarter.`, { text: `Inactive`, decoration: 'underline' }, `
(If active, the Annual Subscription charges will be levied towards this AP as per Exchange Circular No. MCX/MEM/164/2021  dated 17-03-2021).

`,




                        `\n`,
                    ]
                },
                {
                    text: [
                        {
                            text: `\n\n(Signature & Name of member)
(To be signed by Proprietor/ Managing Partner/ Designated Director/ authorised signatory as on the records of the Exchange)
`, bold: 'true'
                        },
                    ]
                },
                { text: `\n\n\n`, pageBreak: 'before' },
                {
                    text: [

                        `8.	#Certified true copy of Board Resolution in case of Corporate signed by all Directors / Letter of Authority in case of Partnership Firm/LLP signed by all partners regarding approval for cancellation of Authorised Person.

I/we undertake to honour all the liabilities/obligations arising from the acts of omission or commission of the authorised person done by the authorised person /employee of the authorised person for the tenure when he was registered as Authorised Person affiliated with us till the cancellation of appointment by the Exchange.`,





                        {
                            text: `\n\n\n\n\n(Signature & Name of member)
(To be signed by Proprietor/ Managing Partner/ Designated Director/ authorised signatory as on the records of the Exchange)
`, bold: 'true'
                        },

                        { text: `\n# Application for Corporate/Partnership firm/LLP Authorised Person` },

                        { text: `\n\nInstructions`, bold: 'true', decoration: 'underline' },

                        `\n\n•	This application can be submitted by the member only in case the member desires to cancel the authorised person appointment after the Exchange has granted approval to the authorised person appointment application.
•	Submit certified copy of public notification intimating the investors/general public of the cancellation/surrender of authorized person, issued in the local newspaper where the authorised person’s registered office, head office/corporate office is situated and another in English daily newspaper with wide circulation. (Applicable in case of any disciplinary action initiated by the Exchange and pending against the Authorised Person)
•	In case the Authorised Person wishes to change its affiliation from one member to another member, the existing member has to submit an application for cancellation of appointment of Authorised Person and the new affiliating member has to submit an application and all other prescribed documents for appointment of the Authorised Person.
•	Certified copy of acknowledgment copy of notice issued to Authorised Person to be submitted in case the Authorised Person is not co-operating for the cancellation of appointment.


`
                    ]

                },

            ]

        }
        return dd
    }
}