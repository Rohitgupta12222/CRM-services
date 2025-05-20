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
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let CityMst = datamodel.CityMst()
		let StateMst = datamodel.StateMst()
	



        let date = commonFunc.ConvertDateSlash(new Date())
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })


        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })
        let country = {};
        let city = {};
        let state = {};
        if (apBranchDtls) {
            if (apBranchDtls.Country_Code_ID) {
                country = await dataaccess.FindOne(CountryMst, { where: { Id: apBranchDtls.Country_Code_ID } })
            } else {
                country.Country_Name = ' ';
            }
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
        let city2 = [];
        let state2 = [];
        let country2= [];

        let m = apContact.map(async e => {
                if (e.City_Code ) {
                        let city1 = await dataaccess.FindOne(CityMst, { where: { Id: e.City_Code } })
                        city2.push(city1==null?' ': city1.City_name.toUpperCase())
                } else {
                        city2.push(' ' )
                }
                if ( e.State_Code) {
                        let state1 = await dataaccess.FindOne(StateMst, { where: { Id: e.State_Code } })
                        state2.push(state1==null?' ': state1.State_Name.toUpperCase())
                } else {
                        state2.push(' ')
                }
                if ( e.Country) {
                        let country1 = await dataaccess.FindOne(CountryMst, { where: { Id: e.Country} })
                        country2.push(country1==null?' ': country1.Country_Name.toUpperCase())
                } else {
                        country2.push(' ')
                }
        })
        await Promise.all(m)
        let b;
        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name== null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()
                ;
        } else {
            b = '';
        }
        let age = new Date().getFullYear() - apData.DOB_INC.toString().slice(0, 4)

        let t1 = ['PARTNER NAME /DIRECTOR NAME', 'AGE', 'Residence  address']

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
                {
                    text: [
                        `\nI/we, Mr./Ms./M/s. `,
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' },
                         ` office address at `,
                        { text: `${b}`, bold: 'true' },
                        `\n\n`,

                    ]
                },

                table(apContact, t1, city2, state2, country2),

                {
                    text: [

                        `\nhaving its registered office address at `,
                        { text: `${b}`, bold: 'true', decoration: 'underline' },
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

8) I/We are “fit and proper person “under the SEBI (Intermediaries) Regulations, 2008 and no action has been taken against us by SEBI, RBI, etc. and we have not defaulted in payment to any agency.`,










                        { text: `\n\n\n\n\nStamp & Signature of Authorized signatory:`, bold: 'true' },
                        `\n[(Individual/ All the Director(s)/All the Partner(s)] 
Name of Authorised Person: 
 
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
function table(data, columns, ar, ar2,ar3) {

    return {

        table: {
            headerRows: 1,
            widths: [250, 40, '*'],
            body: buildTableBody(data, columns, ar, ar2,ar3)
        }
    }
}


function buildTableBody(data, columns, ar, ar2,ar3) {
    var body = [];
    data.map((e, i) => e['index'] = i + 1)
    body.push(columns);

    data.map(function (row, index) {
        var dataRow = [];

        dataRow.push(row.Contact_Person_Name.toUpperCase());
        dataRow.push(row.Contact_Person_DOB == null ? ' ' : (new Date().getFullYear() - row.Contact_Person_DOB.toString().slice(0, 4)))
        dataRow.push(((row.Address_1 == null ? ' ' : row.Address_1) + ', ' + (row.Address_2 == null ? ' ' : row.Address_2) + ', ' + ar[index] + ', ' + ar2[index] + '-' + (row.Pin_Code == null ? ' ' : row.Pin_Code) + ', ' + ar3[index]  + '.').toUpperCase());
        body.push(dataRow);
    });
    // row.Address_1==null ?' ':row.Address_1

    return body;
}