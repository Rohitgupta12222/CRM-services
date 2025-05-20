var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let EntityMst = datamodel.EntityMst()
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let CountryMst = datamodel.CountryMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
    

        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let param2 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }
        let apContact = await dataaccess.FindOne(AP_Draft_Contact_Details, param2)
        let date = commonFunction.ConvertDateSlash(new Date())
        let country = {};
        let city = {};
        let state = {};
        if (apContact) {
          if (apContact.Country) {
              country = await dataaccess.FindOne(CountryMst, { where: { Id: apContact.Country } })
          } else {
              country.Country_Name = ' ';
          }
          if (apContact.City_Code) {
              city = await dataaccess.FindOne(CityMst, { where: { Id: apContact.City_Code } })
          } else {
              city.City_name = ' ';
          }
          if (apContact.State_Code) {
              state = await dataaccess.FindOne(StateMst, { where: { Id: apContact.State_Code } })
          } else {
              state.State_Name = ' ';
          }
      }

        // console.log('entityData', entityData)

        // console.log('apData', apData)
        // console.log('apContact', apContact)
        //let age = new Date().getFullYear() - apData.DOB_INC == null ? ' ' : apData.DOB_INC.toISOString().slice(0, 4)
        let age = new Date().getFullYear() - apData.DOB_INC.toString().slice(0, 4)
        var dd = {
            header: {
                margin: 15,
                columns: [
                    {},
                    {
                        image: p,
                        width: 170,
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
                        Corporate Identity Number: ${entityData[0].CINNumber == null ? ' ':entityData[0].CINNumber }`, bold: 'true', fontSize: 8, color: '#00008B'
                                    },
                                    {
                                        text: `Registered Office: ${entityData[0].RegisteredAddress} Tel No.: +91 79-40019900 & 79 6692 9900
                        Corporate Office: ${entityData[0].CorporateAddress} Tel No.: +91 22 4009 4400`, fontSize: 8,
                                    },
                                ]
                            },]]
                },
            },
            content: [
                {
                    text: [
                        `\n\nDate: `,
                        commonFunction.ConvertDateSlash(apData.Created_Date == null ? ' ' : apData.Created_Date)

                    ]
                },
                {
                    text: `\n\n To
    Membership Department,`, bold: 'true',
                },
                `Bombay Stock Exchange Ltd
    Phiroze, Jeejeebhoy Tower
    Dala Street, Mumbai - 400001.`,

                {
                    text: `\n	
    Kind Attn.: Ramesh Jadhav/Naresh Pandya`, bold: 'true',
                },
                {
                    text: [
                { text: `\nSub: Authorised Person for Cash Segment –  `, bold: 'true', },
                { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', alignment: 'justify' },
                `\n\nDear Sir,`,
               
                        `\n\nWith reference to the above please find enclosed the following documents for registration of\n `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', },
                        ` for appointment of authorised person in the Cash Market Segment of BSE:- \n\n`,
                    ]
                },

                {
                    style: 'tableExample',
                    table: {
                        alignment: 'right',
                        widths: [40, '*'],
                        body: [
                            [{ text: `Sr. No.`, bold: 'true', alignment: 'center' }, { text: `Particulars `, bold: 'true', alignment: 'center' },],
                            [{ text: `1`, alignment: 'center' }, `Application form for appointment of Authorised Person – Annexure 2(a) `,],
                            [{ text: `2`, alignment: 'center' }, `Undertaking from the Trading Member – Annexure 2(b)(i) `,],
                            [{ text: `3`, alignment: 'center' }, `Undertaking from the Applicant – Annexure 2(b)(ii) `,],
                            [{ text: `4 `, alignment: 'center' }, `Certified true copy of PAN card of the applicant`,],
                            [{ text: `5`, alignment: 'center' }, `Copy of residence address and office address proof of the applicant`,],
                            [{ text: `6`, alignment: 'center' }, `Certified true copies of Education proof of the applicant`,],
                            [{ text: `7`, alignment: 'center' }, `Certified true copy of Trading Member and Authorised Person agreement `,],

                        ]

                    }
                },

                `\nThanking You,
    
    Yours truly,
    `,
                {
                    text: [
                        { text: `For `, bold: 'true', },
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', alignment: 'justify' },


                        { text: `\n\n\n\nAuthorised Signatory – Clg. No. (`, bold: 'true', },
                        { text: `${entityData[0].ClearingNumber == null ? ' ' :entityData[0].ClearingNumber}`, bold: 'true', alignment: 'justify' },
                        `)`,
                    ]
                },

                {
                    text: '\n\nAnnexure 2(b)(i)', bold: 'true', alignment: 'center', decoration: 'underline', pageBreak: 'before'

                },
                {
                    text: `\nDeclaration/Confirmation/Undertaking and recommendation from Member 
    BSE Limited 
    (Rules, Bye laws & Regulation of the Stock Exchange)`, bold: 'true', alignment: 'center'
                },
                {
                    text: `\nTo, 
    Bombay Stock Exchange Limited,
    `, bold: 'true',
                },
                {
                    text: [
                        `Dear Sir, 
    
    We understand that son/daughter of `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', },
                        ` aged`,
                        { text: ` ${age}`, bold: 'true', },
                        ` years, residing at `,
                        { text: `${apContact.Address_1 == null ? ' ' : apContact.Address_1.toUpperCase()}, ${apContact.Address_2 == null ? ' ' : apContact.Address_2.toUpperCase()}, ${city.City_name == null ? ' ' : city.City_name.toUpperCase()}, ${state.State_Name == null ? ' ' : state.State_Name.toUpperCase()}-${apContact.Pin_Code}, ${country.Country_Name == null ? ' ' : country.Country_Name.toUpperCase()}`, bold: 'true', },
                        ` is attached to me at `,
                        { text: `${city.City_name == null ? ' ' : city.City_name.toUpperCase()}`, bold: 'true', },
                        ` for carrying on the shares and securities business as an Authorized Person (AP).`, `\n`,
                    ]
                },
                '\n',
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {

                        widths: [20, '*'],
                        body: [
                            [{ text: `•`, alignment: 'right' }, { text: ['We confirm that', { text: ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' }, ' is/will be transacting business through me and funds & securities of the clients shall be settled directly between stock brokers and client and all documents like contract note, statement of funds and securities would be issued to client by us. Authorised person may provide administrative assistance in procurement of documents and settlement, but will not issue any contract notes / statements to client in its own name. No fund/securities of clients will go to account of authorized person. I/We further confirm that, authorised person will not charge any amount as brokerage from the clients.'] }],
                            // [{ text: ` `, bold: 'true',alignment: 'center'},{text:` is/will be transacting business through me and funds & securities of the clients shall be settled directly between stock brokers and client and all documents like contract note, statement of funds and securities would be issued to client by us. Authorised person may provide administrative assistance in procurement of documents and settlement, but will not issue any contract notes / statements to client in its own name. No fund/securities of clients will go to account of authorized person. I/We further confirm that, authorised person will not charge any amount as brokerage from the clients.`,border: [false, false, false, false]}],
                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: `We confirm that, authorised person i.e. individual/partners/directors is/are a fit and proper person(s) to be registered as an Authorized Person. ` }],
                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: [`We also confirm that he/she/they is/are known to me/us for well over `, { text: '1', bold: 'true' }, ` years and have good financial background & reputation, moral character and integrity.`] }],
                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: `We also confirm that Authorized Person firm or applicant i.e. individual/partners/directors is/are not appointed as authorized person under any other trading member/s of the Exchange.` }],

                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: `We also undertake that, we shall obtain prior permission of the Exchange for any changes like change in trade name/name, address and status and constitution of authorized person and he/she/they is/are eligible for appointment of authorized person.` }],

                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: `We also declare that Authorised Person has/have necessary infrastructure like adequate office space, equipment and manpower to effectively discharge the activities on behalf of us. ` }],

                            [{ text: `•`, bold: 'true', alignment: 'right' }, { text: `We undertake that all acts of omission and commission of the authorized person shall be deemed to be those of the stock brokers. I/We are responsible for all such acts of omission and commission of the authorized person.` }],


]

                    }
                },

                `\nWe hereby recommend his application for granting registration for carrying on shares and securities business as authorized person. We also confirm that the information that has been submitted is true to the best of my/our knowledge and if at a later date if any material information comes to my/our knowledge subsequent to the submission of this application, I/We undertake to keep the Exchange about the same.  
    
    `,

                { text: `\n\n`, pageBreak: 'before' },

                {
                    text: [
                        `We trading member of `,
                        { text: `Bombay Stock Exchange`, bold: 'true', decoration: 'underline', },
                        ` hereby recommend the above-mentioned applicant.\n  
    Yours faithfully,  
    `,

                        { text: `\nFor `, bold: 'true', },
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', alignment: 'justify' },

                        {
                            text: `\n\n\n\n\nAuthorised Signatory\n
    SEBI Registration No.: `, bold: 'true',
                        },
                        { text: `${entityData[0].SebiRegistrationNo== null ? ' ' : entityData[0].SebiRegistrationNo}`, bold: 'true', alignment: 'justify' },

                        `\n\nDate: ${date} `,
                    ]
                },


            ]
        }

        return dd
    }
}