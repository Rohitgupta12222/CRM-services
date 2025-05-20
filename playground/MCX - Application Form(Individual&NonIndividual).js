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
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let ConstitutionMst = datamodel.ConstitutionMst()
        let AP_Draft_Other_Details = datamodel.AP_Draft_Other_Details()
        let DesignationMst = datamodel.DesignationMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()

        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let apData2 = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: fileParams.apId, IsRegistered: true } })
        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
        let ar = []
        let m = apContact.map(async e => {
            let a = await dataaccess.FindOne(DesignationMst, { where: { Id: e.Designation } })
            ar.push({ contact: e.Contact_Person_Name, designation: a.Designation_Name })
        })
        await Promise.all(m)
        let constitution = await dataaccess.FindOne(ConstitutionMst, { where: { Id: apData.Constitution_Id } })
        let apOther = await dataaccess.FindOne(AP_Draft_Other_Details, { where: { AP_Id: fileParams.apId } })
        console.log('apData.DOB_INC', new Date(apData.DOB_INC))
        let mob = apData2.Branch_Mobile_Number == null ? ' ' : apData2.Branch_Mobile_Number

        let city = {};
        let state = {};
        if (apData2) {
            if (apData2.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apData2.City_Code } })
            } else {
                city.City_name = ' ';
            }
            if (apData2.State_Code) {
                state = await dataaccess.FindOne(StateMst, { where: { Id: apData2.State_Code } })
            } else {
                state.State_Name = ' ';
            }
        }
        let b;
        if (apData2) {
            b = ('\n' + (apData2.Address_1 == null ? ' ' : apData2.Address_1) + '\n' + (apData2.Address_2 == null ? ' ' : apData2.Address_2) + '\n' + (city.City_name == null ? ' ' : city.City_name) + '\n' + (state.State_Name == null ? ' ' : state.State_Name) + '\n' + (apData2.Pin_Code == null ? ' ' : apData2.Pin_Code) + '\n' + (apData2.STD_Code == null ? ' ' : apData2.STD_Code) + '-' + (apData2.Telephone_Number == null ? ' ' : apData2.Telephone_Number) + '\n' + (apData2.FAX_Number == null ? ' ' : apData2.FAX_Number) + '\n' + (apData.Email == null ? ' ' : apData.Email) + '\n' + mob).toUpperCase()

        } else {
            b = '';

        }
        let dob;
        if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
            dob = commonFunction.ConvertDateSlash(new Date(apData.DOB_INC))
        } else {
            dob = 'NA'
        }

        if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
            doc = 'NA'
        } else {
            doc = commonFunction.ConvertDateSlash(new Date(apData.DOB_INC))
        }
        var dd = {
            content: [
                `\n\n\n\n\n\n\n\n`,
                {
                    text: [

                        { text: `(On the letterhead of the AP)`, alignment: 'center', bold: 'true', color: '#919191', },
                        {
                            text: `\n\nAPPLICATION FORM FOR APPOINTMENT OF AUTHORISED PERSON`, bold: 'true', alignment: 'center',
                        },
                    ]
                },
                { text: `\nDate: ${date}`, },

                { text: `\nThe details of the proposed Authorised Person are as follows:`, },

                {
                    style: 'tableExample',
                    table: {
                        widths: [19, 225, '*'],

                        body: [
                            [{ text: `Sr. No.`, bold: 'true', alignment: 'center' }, { text: `Particulars`, bold: 'true', alignment: 'center' }, { text: 'Details Required', bold: 'true', alignment: 'center' }],
                            [{
                                text: `
                            1`, alignment: 'center'
                            }, `Applicant Name of proposed
 Authorized Person(in capitals-
 expand all initials) :  `, ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`],
                            [{ text: `2`, alignment: 'center' }, {
                                text: `Trade Name of Proposed Authorized Person (Block Letters) : `
                            }, { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}` }],
                            [{
                                text: `3
                            `, alignment: 'center'
                            }, {
                                text: `Constitution: 
Individual/Partnership/LLP/Body Corporate) 
`
                            }, { text: ` ${constitution.Constitution_Name == null ? ' ' : constitution.Constitution_Name.toUpperCase()}` }],
                            [{ text: `4`, alignment: 'center' }, { text: `Nationality  ` }, { text: 'INDIAN' }],
                            [{
                                text: `5
                            `, alignment: 'center'
                            }, {
                                text: `Date of Incorporation/Registration
 (In case of corporate/firm/LLP) 
`
                            }, { text: ` ${doc}` }],
                            [{ text: `6`, alignment: 'center' }, { text: `Date of birth in case of Individual  ` }, { text: ` ${dob}` }],
                            [{
                                text: `7
                            `, alignment: 'center'
                            }, {
                                text: `Office Address  Details*
Address Line 1:
Address Line 2:
City:
State:
Pin Code:
Telephone no with STD code:
Fax No.: 
Email Address:
Mobile No.
Website, if any:`}, { text: ` ${b} ` }],
                            [{
                                text: `8
                            `, alignment: 'center'
                            }, {
                                text: `Name and designation of the
Contact Person in Authorized
 Person’s office* :`}, { text: space(ar) }],
                            [{ text: `9`, alignment: 'center' }, { text: `Income Tax Permanent Account No.(PAN) of Authorized Person  ` }, { text: ` ${apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()}` }],
                        ]
                    }
                },

                {
                    style: 'tableExample',
                    pageBreak: 'before',
                    table: {
                        widths: [19, 314, '*'],


                        body: [[{
                            text: `10
                            
                            `, alignment: 'center'
                        }, {
                            text: `Details of Infrastructure of
Authorised Person*:
Is office owned / rented: 
Area (in sq. ft): 
Details of manpower (if any):
Details of other infrastructure available(if any): 
Connectivity Details (VSAT / Leased Line /Internet): 
No. of terminals proposed to be provided to Authorised Person 
(any change in this information is required to be updated to Exchange on timely basis ):`}, `\n\n\n${apOther.Total_Area_In_SQ_Feet == null ? ' ' : apOther.Total_Area_In_SQ_Feet}  \n\n\n\n${apOther.Total_No_Of_Terminals == null ? ' ' : apOther.Total_No_Of_Terminals}`],
                        ]
                    }
                },
                { text: `\n* similar details to be provided location-wise in separate annexure, in case Authorised Person has been assigned more than one branch.  ` },
                {
                    text: [
                        { text: `\n\n\n (Signature of the AP)`, alignment: 'left', bold: 'true' },
                        { text: `\n\n\n(Signature & Name of Applicant)  `, alignment: 'left', bold: 'true' },
                        { text: `\n\n(To be signed only by Proprietor/ All Partners/ All Directors)`, alignment: 'left', bold: 'true' },
                    ]
                },



            ]
        }
        return dd
    }
}
function getOther(apOther) {
    apOther.map(e => '\n' + (e.Total_Area_In_SQ_Feet == null ? ' ' : e.Total_Area_In_SQ_Feet))
}

function space(ar) {
    let f = ''
    ar.map((e, i) => {
        if (i == ar.length - 1) {

            f += (e.contact + ' / ' + e.designation + '\n').toUpperCase()
        } else {
            f += (e.contact + ' / ' + e.designation + ',\n').toUpperCase()
        }
    })
    return f;
}