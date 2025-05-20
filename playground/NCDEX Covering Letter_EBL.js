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
        let EntityMst = datamodel.EntityMst()


        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })


        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param2 = { where: { AP_ID: Number(fileParams.apId) } }
        let registration = await dataaccess.FindOne(AP_Registration_Details, param2)
        let date = commonFunction.ConvertDateSlash(new Date())
        // console.log('registration', registration)

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
                        `\n\n\n\n\n\n`,
                        { text: `Application for Cancellation of Appointment of Authorized Person(s)`, bold: 'true', alignment: 'center' },

                        { text: `\n\n\nDate: ${date}`, bold: 'true' },

                        `\n\n\nTo
Membership Compliance,
National Commodity & Derivatives Exchange Ltd 
(Customer Service Department)
1st Floor, Akruti Corporate Park, LBS Road, 
Kanjurmarg(west), Mumbai - 400078

Dear Sir/Madam,

I/We hereby request the Exchange to cancel the registration of following authorized person/s.

Details are as under:

`,
                    ]
                },
                {
                    style: 'tableExample', alignment: 'center',
                    table: {
                        widths: [60, 80, 65, 100, 130, 45],
                        body: [
                            [{ text: `Name of the Authorized Person`, bold: 'true', alignment: 'left' }, { text: `Trade Name of the Authorized Person`, bold: 'true', alignment: 'left' }, {
                                text: `AP
Registration Number 
`, bold: 'true', alignment: 'left'
                            }, {
                                text: `AP
Registration Date
`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Reason for 
Cancellation
`, bold: 'true', alignment: 'left'
                            }, { text: `PAN Number`, bold: 'true', alignment: 'left' }],
                            [`${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, ` ${registration.RegistrationNo.toUpperCase()}`, commonFunction.ConvertDateToDDMMYYYY_2(registration.RegistrationDate), `«Reason_for__Cancellation_»`, `${apData.PAN_Number.toUpperCase()}`]




                        ]
                    }
                },
                {
                    text: [
                        `\nWe hereby confirm that:

1.	The above mentioned authorized person has been disabled from trading.
2.	The agreement(s) between the member, `,
                        { text: `M/s. ${entityData[0].Entity_Name}`, bold: 'true' },
                        ` and the above mentioned Authorized Person(s) has/have been terminated. 
3.	Attached an under taking in the prescribed format. 
4.	Copy of request(s) received from the authorized person(s) listed above is/are enclosed.
5.	Certified true copy of board resolution/authority letter as the case may be, regarding approval for surrender/cancellation of authorised person registration.




__________________________________
Place: `, { text: `MUMBAI`, bold: 'true', decoration: 'underline' },
                        { text: `\n#Name, Signature & Seal  `, bold: 'true' },
                        `\n# should be signed by a Proprietor/Partner/Director of trading member. `,

                    ]
                },


            ]

        }
        return dd
    }
}
