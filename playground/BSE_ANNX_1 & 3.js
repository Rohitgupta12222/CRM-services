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
        let AP_General_Details = datamodel.AP_General_Details()
        let AP_Registration_Details = datamodel.AP_Registration_Details()
        let AP_Contact_Details = datamodel.AP_Contact_Details()
        let EntityMst = datamodel.EntityMst()



        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param2 = { where: { AP_ID: Number(fileParams.apId) } }
        let registration = await dataaccess.FindOne(AP_Registration_Details, param2)
        let param3 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }
        let apContact = await dataaccess.FindOne(AP_Contact_Details, param3)

        let date = commonFunction.ConvertDateSlash(new Date())



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
                `\n\n\n\n`,

                {
                    text: [
                        { text: `(Annexure-1)`, alignment: 'right' },
                        {
                            text: `\n
Letter for surrender/cancellation on member’s letter head
Application for Cancellation of AP Registration in the Cash/& Derivative segment (s)
`, bold: 'true', alignment: 'center',
                        },

                        { text: `\nDate:`, alignment: 'right' },
                        { text: ` ${date}\n\n`, bold: 'true', alignment: 'right' },

                    ]
                },

                {
                    text: `To
Membership Compliance,
Bombay Stock Exchange Ltd.	
15th Floor, P.J.Towers,
Dalal Street, Fort,
Mumbai – 400 001. \n\nDear Sir/Madam, \n\nI/We hereby request the Exchange to cancel the registration of following authorised person/s.\n\nDetails are as under:
\n`, alignment: 'left'
                },


                {
                    style: 'tableExample',
                    table: {

                        body: [
                            ['Name of the Authorised Person', 'Trade Name of the Authorised Person', 'Segment (Cash/ Derivative)', 'AP Registration Number ', ' AP Registration Date '],
                            [{ text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' }, { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold: 'true' }, { text: `BSE CASH`, bold: 'true' }, { text: `${registration.RegistrationNo.toUpperCase()}`, bold: 'true' }, { text: commonFunction.ConvertDateSlash_2(registration.RegistrationDate), bold: 'true' }],


                        ]
                    }
                },
                { text: `\nWe hereby confirm that:` },

                {
                    text: [
                        { text: `\n•	The above mentioned authorised person has been disabled from trading.` },
                        { text: `\n•	The agreement between ` }, { text: `${entityData[0].Entity_Name} & the above AP `, bold: 'true' }, { text: `has been terminated` },
                        { text: `\n•	Attached an under taking in the prescribed format. `, bold: 'true' },
                        { text: `\n•	Copy of request letter received from Authorised Person(s) `, bold: 'true' },
                        {
                            text: `\n•	Certified true copy of board resolution/authority letter as the case may be, regarding approval 
      for surrender/cancellation of authorised person registration.`},
                        { text: `\n•	Original Authorised Person registration certificate.`, bold: 'true' },
                        { text: `\n\n\n For ${entityData[0].Entity_Name}`, bold: 'true' },
                        {
                            text: `\n\n\n\n\n Authorised Signatory
Place: Mumbai	                      
`, bold: 'true'
                        },
                    ]
                },


                { text: `\n\n\n\n`, pageBreak: 'before' },
                {
                    text: [
                        { text: `(Annexure-3)`, bold: 'true', alignment: 'center' },

                        {
                            text: `\n\nFormat for submitting undertaking to BSE by Trading Member 
(On Trading Member’s Letter Head)

UNDERTAKING
`, bold: 'true', alignment: 'center', decoration: 'underline'
                        },

                        {
                            text: `\nDate: ${date}

To
Membership Compliance,
Bombay Stock Exchange Ltd.
15th Floor, P.J.Towers,
Dalal Street, Fort,
Mumbai – 400 001.
`, alignment: 'left'
                        },

                        { text: `\nTo: Whom so ever It may concern `, bold: 'true', alignment: 'center' },
                        {
                            text: `\n\nWe hereby declare/confirm that, no complaint/arbitration/disciplinary proceedings are pending against following Authorised Person by SEBI/Stock Exchange/Any other Regulatory Authority or in any Court of Law. 

We undertake to honour all the liabilities/obligations for all actions of the AP till the cancellation of the BSE registration including any action for violation of the provisions of the SEBI circular MIRSD/ DR-1/ Cir- 16 /09 Dated November 06, 2009.
`},
                        { text: `\nAuthorised Person Trade Name:  ` }, { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold: 'true' },
                        { text: `\n\n\n& BSE Registration No:  ` }, { text: ` ${registration.RegistrationNo== null ?' ':registration.RegistrationNo.toUpperCase()}`, bold: 'true' },
                        { text: `\n\n\nAddress of Authorised Person:   ` }, { text: `${apContact.Address_1 == null ? ' ' : apContact.Address_1.toUpperCase()} ${apContact.Address_2 == null ? ' ' : apContact.Address_2.toUpperCase()} ${apContact.City_Code== null ? ' ':apContact.City_Code} ${apContact.State_Code== null ? ' ':apContact.State_Code} ${apContact.Country == null ? ' ' : apContact.Country} ${apContact.Pin_Code== null? ' ':apContact.Pin_Code}`, bold: 'true' },

                        {
                            text: `\n\n\n\nThanking you.


Yours truly,
`},
                        {
                            text: `For ${entityData[0].Entity_Name}




Authorised Signatory
`, bold: 'true'
                        },


                    ]
                },


            ]
        }
        return dd
    }
}
