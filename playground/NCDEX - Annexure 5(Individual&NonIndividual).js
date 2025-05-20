// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')

module.exports = {


    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let EntityMst = datamodel.EntityMst()
    let CountryMst = datamodel.CountryMst()



        let date = commonFunc.ConvertDateSlash(new Date())
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })
    let country = await dataaccess.FindOne(CountryMst, { where: { Id: apBranchDtls.Country_Code_ID } })

        let b;

        if (apBranchDtls) {
            b = (apBranchDtls.Address_1 + ', ' + apBranchDtls.Address_2 + ', ' + apBranchDtls.City_Code + ', ' + apBranchDtls.State_Code + '-' + apBranchDtls.Pin_Code+', '+ country.Country_Name+'.').toUpperCase()
        } else {
            b = '';
        }
        let age = new Date().getFullYear() - apData.DOB_INC.toString().slice(0, 4)
        var dd = {
            content: [
                {
                    text: 'On the letter heard of Authorised Person\n\n\n',
                    fontSize: 11,
                    alignment: 'center',
                    color: '#919191',
                },
                { text: `ANNEXURE V`, bold: 'true', alignment: 'center', },
                { text: `to circular No.  NCDEX/COMPLIANCE-017/2019 April 15, 2019`, alignment: 'center' },
                { text: `\nUndertaking\n`, alignment: 'center', bold: 'true', decoration: 'underline' },
{text:[
                `\nI/we, Mr./Ms./M/s. `,
                {text:`${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`,bold: 'true'},
                  ` aged `,
                  {text:`${age}`,bold: 'true'}, ` residing at `,
                  {text: `${b}`,bold:'true'},
                  `\n\n`,

]},
                {
                    style: 'tableExample',

                    table: {
                        widths: [250, 40, '*'],
                        body: [
                            ['PARTNER NAME /DIRECTOR NAME', 'AGE ', 'Residence  address'],
                            ['RAVADA VENKATA GOWTHAMI', ' 31 ', `54-13-3/1 P-312 ATM RESIDENCY ROAD NO - 5 RIGHT SIDE, SRINIVASA NAGAR BANK COLONY, VIJAYAWADA,
ANDHRA PRADESH - 520008
`],
                            [`RAVADA VENKATA SRIDEVI`, `33`, `069 KANDI STREET KANNA PUDORA, VALASA AKKANDORAVALASA, Vizayanagaram - 535526`],
                            [`NARISIPALLI SARITHA ARUNA KUMARI`, `43`, `74-6/7-18A 2ND FLOOR ASHWIN DELITE, GOTTIPATI BRAHMAYYA STREET AYYAPA NAGAR, VIJAYAWADA- 520007`],
                            [`RAVADA VENKARA SAI BHARTHI`, `29`, `54-5-6 ADDEPALLI COLONY RAJAHMUNDRY, VIJAYA RESIDENCY EAST GODAVARI, RAJAHMUNDRY - 533101`],
                            [`BURRI TULASI`, `37`, `5-228 DHULIPALLA SATTENAPALLI, GUNTUR,ANDHRA PRADESH- 522403`],
                            [`DEVANAND SREEDHARA PANICKER`, `47`, `1-2-608,609 TO 620 INDIABULLS CENTRUM FLAT NO C003, NEAR VARTHA OFFICE LOWER TANK BUND GANDHINAGAR SECUNDERABAD, HYDERABAD - 500080`],
                        ]
                    }
                },
                {
                    text: [

                        `\nhaving its registered office address at `,
                     {text:`${entityData[0].RegisteredAddress}`, bold: 'true', decoration:'underline'},
                         ` had applied for appointment as Authorised Person of the Exchange for trading in the Exchange platform through trading member, M/s. `,
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', decoration: 'underline' },

                        `\n\nIn this regard I/we hereby confirm/undertake that; 

1) Neither I/we nor our directors/partners have been convicted for any offence in the past and presently not under trial for any offence involving fraud and dishonesty. 

2) I/We will-deal with investors on behalf of Trading Member only and that we would n                                                                                                                                                  ot engage in any activities with investors which could result in unauthorised intermediations.

3) Neither I/we nor our directors are Authorised Person of any other member of the Exchange nor have applied for appointment as Authorised Person with any other member of the Exchange. 

4) Neither I/We nor any of our directors/partners is a partner or a director in/with any of the Member of the Exchange. 

5) I/We are not defaulter/expelled on any Exchange. 

6) I/We shall be governed by the NCDEX Bye-Laws and Regulations and its amendments thereto and the Circulars issued from time to time.

 7) I/We hereby acknowledge and confirm that I/We shall be entitled to act as a ‘Authorised Person’ within the meaning and subject to SEBI Circular MIRSD/ DR-1/ Cir- 16 /09 dated November 06, 2009 and Circulars issued by SEBI and NCDEX from time to time. 

8) I/We are “fit and proper person “under the SEBI (Intermediaries) Regulations, 2008 and no action has been taken against us by SEBI, RBI, etc. and we have not defaulted in payment to any agency. 










Stamp & Signature of Authorized signatory:
Name of Authorized signatory: 
Designation of Authorized signatory: 

Date : ${date}
Place:



`,


                    ]
                },




            ]

        }
        return dd
    }
}