var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions');
let path = require('path');
const { Console } = require('console');

module.exports = {
  createDocDefinition: async (fileParams) => {

    let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
    let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
    let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
    let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
    let segmentMst = datamodel.SegmentMst()
    let AP_Draft_Other_Details = datamodel.AP_Draft_Other_Details()
    let DesignationMst = datamodel.DesignationMst()
    let CityMst = datamodel.CityMst()
    let StateMst = datamodel.StateMst()

    let apOther = await dataaccess.FindOne(AP_Draft_Other_Details, { where: { AP_Id: fileParams.apId } })
    let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
    let apContactData = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
    let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: fileParams.apId, IsRegistered: true } })
    let apBrokerageDtls = await dataaccess.FindAll(AP_Draft_Brokerage_Sharing_Details, { where: { AP_Id: fileParams.apId, Exchange: 4 }, attributes: ['Segment'] })
    let str = apContactData.map(e => e.Contact_Person_Name).join(',')
    let str1 = apBrokerageDtls.map(e => e.Segment)

    let str2 = [];
    for (let i = 0; i < str1.length; i++) {
      // const element = str1[i];
      if (str1[i] == 1 || str1[i] == 3 || str1[i] == 4) {

        let segmentData = await dataaccess.FindAll(segmentMst, { where: { Id: str1[i] }, attributes: ['Segment_Alias'] })
        str2.push(segmentData[0].Segment_Alias);
        // console.log(str2);

      }
    }
    str2 = str2.filter((item,
      i) => str2.indexOf(item) === i);
    str2 = str2.toString().replace(/\n/g, ', ')

    console.log("str2", str2);



    let city = {};
    if (apBranchDtls) {
      if (apBranchDtls.City_Code) {
        city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
      } else {
        city.City_name = ' ';
      }
    }
    let mob = apBranchDtls.Branch_Mobile_Number == null ? ' ' : apBranchDtls.Branch_Mobile_Number
    let b;
    if (apBranchDtls) {
      b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + '\n' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + '\n' + (city.City_name == null ? ' ' : city.City_name) + '\n' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + '\n' + (apBranchDtls.STD_Code == null ? ' ' : apBranchDtls.STD_Code) + '\n' + (apBranchDtls.Telephone_Number == null ? ' ' : apBranchDtls.Telephone_Number) + '\n' + (apBranchDtls.FAX_Number == null ? ' ' : apBranchDtls.FAX_Number) + '\n' + (apData.Email == null ? ' ' : apData.Email) + '\n' + mob).toUpperCase()
    } else {
      b = '';
    }
    let ar = []
    let m = apContactData.map(async e => {
      let a = await dataaccess.FindOne(DesignationMst, { where: { Id: e.Designation } })
      ar.push({ contact: e.Contact_Person_Name, designation: a.Designation_Name })
    })

    await Promise.all(m)







    let city2 = []
    let n = apContactData.map(async e => {
      if (e.City_Code) {
        let city1 = await dataaccess.FindOne(CityMst, { where: { Id: e.City_Code } })
        city2.push(city1 == null ? ' ' : city1.City_name.toUpperCase())
      } else {
        city2.push(' ')
      }
    })
    await Promise.all(n)


    var dd = {
      content: [
        `\n\n\n\n\n\n\n\n`,
        {
          text: [
            { text: `(On the letterhead of the Authorised Person)`, alignment: 'center', bold: 'true', color: '#919191`,' },
            { text: `\n\nAPPLICATION FORM FOR APPOINTMENT OF AUTHORISED PERSON IN THE CAPITAL MARKET / FUTURES & OPTIONS / CURRENCY DERIVATIVES SEGMENT(S) OF NSEIL\n\n`, bold: 'true', },
          ]
        },

        {
          style: 'tableExample',
          table: {
            widths: [20, 250, '*'],

            body: [
              [{ text: '1', alignment: 'center' }, 'Applicant Name (in capitals -expand all initials)', `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`],
              [{ text: '2', alignment: 'center' }, 'Trade Name (in capitals)', `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`],
              [{ text: '3', alignment: 'center' }, 'Segment (CM / F&O / CD)', str2],
              [{ text: '4', alignment: 'center' }, `Registered Office Address  Details :
                          Address Line 1    
                          Address Line 2   
                          City   
                          Pin code   
                          STD Code    
                          Telephone no.  
                          Fax No.
                          Email Address
                          Mobile No.   
                          Website, if any `, ` 
                          ${b}
                          `

              ],
              [{ text: '5', alignment: 'center' }, 'Name and Designation of Contact Person:      \nContact No.:', space(ar)],
              [{ text: '6', alignment: 'center' }, `Proprietor/Individuals Residential Address Details : 
                              Address Line 1   
                              Address Line 2   
                              City  
                              Pin code    
                              STD Code   
                              Telephone no.   
                              Email Address  
                              Mobile No`,
              apContactData.map(e => ('\n' + (e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ' + city2[0] + ', ' + (e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (e.STD_Code == null ? ' ' : e.STD_Code) + '-' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + ', ' + (e.Email == null ? ' ' : e.Email) + ', ' + (e.Mobile_No == null ? ' ' : e.Mobile_No)).toUpperCase())],
              [{ text: '7', alignment: 'center' }, `Details of Infrastructure(State whether the premises belongs to Trading Member /Authorised person):
                            Number of branch offices   
                            Total area in sq. feet (of all main/branch offices) 
                            Total No. of Dealers 
                            Total No. of Terminals  
                            Branch-wise details of Location, phone, telex and fax       numbers `, `\n\n${apOther.No_Of_Branches == null ? ' ' : apOther.No_Of_Branches} \n${apOther.Total_Area_In_SQ_Feet == null ? ' ' : apOther.Total_Area_In_SQ_Feet}\n${apOther.Total_No_Of_Dealers == null ? ' ' : apOther.Total_No_Of_Dealers} \n ${apOther.Total_No_Of_Terminals == null ? ' ' : apOther.Total_No_Of_Terminals}`],
              [{ text: '8', alignment: 'center' }, 'Details of appointment of Authorised Person if already acting as such on any other segment of the Exchange or with any other stock exchange', `Segment:
                            Code:
                            Exchange:`],

            ]
          }
        },
        {
          text: [
            { text: `\n\n\n(Name & Signature of Individual/Partners/Director’s of Authorised Person)`, bold: 'true' },
          ]
        },
        { text: `\n\n\nDate  :`, },
        { text: `Place :`, },


      ]
    }
    return dd
  }
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