// playground requires you to assign document definition to a variable called dd
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

        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
let br  = apData.Trade_Name== null ? ' ' :apData.Trade_Name.trim().toUpperCase()

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
                        Corporate Identity Number: ${entityData[0].CINNumber}`, bold: 'true', fontSize: 8, color: '#00008B'
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
                `\n\n`,
                { text: `\nANNEXURE I`, bold: 'true', alignment: 'center', },

                { text: `\nto circular No. NCDEX/COMPLIANCE-017/2019  April 15, 2019`, alignment: 'center', },
                { text: `\nREQUEST FOR APPOINTMENT OF AUTHORISED PERSON`, bold: 'true', alignment: 'center', },

                `\nTo
 National Commodity & Derivatives Exchange Limited 
(Customer Service Department) 
1 st floor, Akruti Corporate Park,
 LBS Road Kanjurmarg (West)
 Mumbai 400 078 
	
Dear Sir, 
`,
                {
                    text: [
                        `\nSub: `,
                        { text: `Request for appointment of Authorised Person`, bold: 'true', decoration: 'underline', },
                        `\n\n1. I/We intend to appoint\n 
*Mr./Ms/*M/s `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline'},
{text:` (`,bold: 'true'},
                        { text: `${br})`, bold: 'true' },`as my/our Authorised Person in terms of Exchange circular no. NCDEX/COMPLIANCE-017/2019  April 15, 2019 and the directives issued by the Securities and Exchange Board of India and as amended from time to time, to act for and on my/our behalf for the purpose of providing access to the trading platform of the Exchange. Details of the above named person/entity (hereinafter referred to as the ‘said Authorised Person’) are as contained in Annexure II, III, IV & V hereto.
 \n2. I/We confirm that the said Authorised Person is eligible and proper person to be appointed as Authorised Person in accordance with the above stated circulars of the Exchange and Securities and Exchange Board of India. I/We further confirm that the said Authorised Person and its/directors/partners have good reputation and character and have not been convicted of any offence involving fraud or dishonesty.
\n3. I/We further confirm that all acts, deeds, omissions and commissions done by the said Authorised Person as such shall be deemed to have been done by me/us under the Rules, Bye-laws and Regulations of the Exchange and in terms of above stated circular of the Exchange. I/We shall be bound by all such acts, deeds, omissions and commissions done by the said Authorised Person.
 \n4. I/We and the said Authorised Person comply and shall continue to comply with and be bound by all the terms and conditions as per the various Circulars issued by the Exchange and also the directives issued by the Securities & Exchange Board of India from time to time but not limited to the following:
 \na. The said Authorised Person is not an Authorised Person of any other member of NCDEX 
\nb. The said Authorised Person is not a director or a partner of any other member of NCDEX 
`,]
                },
                {
                    text: [
                        `\nc. I/We shall intimate to the Exchange, any change in the constitution, shareholding and partners/directors of the said Authorised Person at least 30 days in advance
\n d. I/We hereby confirm that the said Authorised Person or any of its partners/directors has/have not been suspended or barred by any Stock or Commodity Exchange for a period of more than six continuous calendar months.
\n5. I/We hereby confirm that the information submitted herein is true to the best of my/our knowledge`
                     ]},
                     
                    {text:'\n', pageBreak:'before'} ,{
                        text: [`and if at a later date any contrary material information comes to my/our knowledge subsequent to the submission of this application, I/We undertake to keep the Exchange informed about the same.
\nI/We Mr./ M/s. `,
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        { text:`, TMID `, bold: 'true' },
                        { text: `${entityData[0].NCDEX_MemberId== null ? ' ' :entityData[0].NCDEX_MemberId}`, bold: 'true', decoration: 'underline', alignment: 'justify' },

                        ` of the Exchange hereby recommend the registration of the above mentioned applicant as Authorised person. 

\n\n(Signature & Name of Member)
\nEnclosures: 
\n1. Copies of PAN Card of the said Authorised Person and all Directors and Partners of the said Authorised Person (in case of Partnership/LLP/Company)
 \n2. Copy of any one of the following as evidence of address of the said Authorised Person and all Directors and Partners (in case of Partnership/LLP/Company)
 \n• Bank statement/passbooks (last entry should not be older than 3 months) 
\n• Electricity Bill (not more than 3 months old) 
\n• Landline Telephone bills (not more than 3 months old)
 \n• Voter ID Card/ Driving License/ Passport /Ration Card/Aadhar Card (If the said Authorised Person is individual)
 \n3. Copy of School/College Mark sheets or degree/diploma certificate of the said Authorised Person (if individual) / all Directors and Partners of the said Authorised Person
 \n4. Copy of the Registered Partnership Deed/ Memorandum of Association of the said Authorised Person containing the clause permitting them to deal in commodities/ Securities derivatives contracts 
`,
                        {
                            text: `\n\n
(All the above enclosures are to be certified by the Authorised Signatory of the Member)
`, bold: 'true',
                        },


                    ]
                },
            ]

        }
        return dd
    }
}