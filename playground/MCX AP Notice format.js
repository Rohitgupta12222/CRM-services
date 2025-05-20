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
    let param1 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true} }
    let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, param1)
    let param2 = {where: {AP_ID: Number(fileParams.apId)}}
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
    let a;
    if (apBranchDtls) {
        b =((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ' ,' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '- ' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code)).toUpperCase()
        a=apBranchDtls.Branch_Mobile_Number== null ? ' ' :apBranchDtls.Branch_Mobile_Number.toUpperCase()
    } else {
        b = '';
        a='';
    }
    let date = commonFunction.ConvertDateSlash(new Date())

    let closerDate = commonFunction.ConvertDateSlash(commonFunction.adjustCloserDate())

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
        margin: [20,0,10,100],
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
                `\n\n\n\n\n`,
               {text:`Date:  ${date}`, bold: 'true', alignment: 'right'},            
{text:`\nTo,

${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()} ${apData.Trade_Name== null ? ' ' :apData.Trade_Name.toUpperCase()}
${b}


Mobile No. ${a}

Dear Sir/Madam,`, bold: 'true'},

{text: `\n\nSub: Notice of Termination of Authorised Person Agreement/ arrangement – MCX`, bold: 'true', alignment: 'center', decoration: 'underline'},

{text: `\n\nAP Registration No:  ${registration.RegistrationNo== null ? ' ' :registration.RegistrationNo.toUpperCase()}`, bold: 'true'},
`\n\nWe refer to the various agreements including but not limited to M.O.U., Remissiary Agreement, CTCL agreements and more particularly to the Authorised Person agreement duly executed/ entered into and subsisting between ourselves.

In terms of the relevant provisions relating to the right to terminate the aforesaid agreement/s, we hereby invoke our right to terminate the said agreement/s and therefore please take this advance notice of 30 days, for termination of the said agreement/s, executed and subsisting between us. Please be further informed and take notice that the termination of the agreement/s referred to herein shall become effective from the close of business hours on `,
{text: `${closerDate}`, bold: 'true'},
`\nPlease also take a further note and notice that despite the termination of the agreement/s herein contained the specific clauses of the said Authorised Person agreement and/or other agreements as stated therein, are intended to and shall, survive termination of the said agreement/s and in the circumstances:
•	You are hereby refrained from carrying on the business and use the name of the Member/Stockbroker with effect from `,{text: `${closerDate}`, bold: 'true'},
              `\n•	You are hereby refrained from using the name, logo, style and words, signs and Marks of or associated with the Member/Stockbroker with effect from `,{text:` ${closerDate}`, bold: 'true'},
`\n•	You shall not hold out as a Authorized Person of the Member/Stockbroker or are authorized to speak or act as the Authorized Person with effect from`,{text:` ${closerDate}`, bold: 'true'},
`\n•	You are hereby refrained from any communications involving the Member/Stockbroker’s name with effect from`,{text:` ${closerDate}`, bold: 'true'},

`\n\n\n\n\n•	You are bound to forthwith provide to us, a copy of the database along with such developments, alterations, modifications and additions made thereto from time to time.`,

`\n•	You are bound to indemnify us for any loss or damage caused to us during the subsistence of the said Authorised Person agreement and/or other agreement/s, on account of any act or omission or negligence by you  and/or or your employees.
•	You are bound to return forthwith all information, research inputs, records, databases and other documents that may have been provided by us to you during the subsistence of the Authorised Person Agreement, without retaining any copies thereof, with yourselves.`,

            ]},
            {text:`\n`, pageBreak:'before'},
            {text:[
{text:`\n\n•	On expiry of the aforementioned notice period the Authorised Person Agreement and  all the agreements herein referred to which are executed/subsisting  by and between   us,   shall consequentially  stand terminated and you shall be liable to pay any costs and/or  charges, if any, in this regard.

Please acknowledge the receipt hereof and arrange do the needful actions at the earliest.`, pageBreak:'before'},

{text: `\n\n\nYours truly,`, bold: 'true'},
`\n\nFor`,
{text:` ${entityData[0].Entity_Name}





Authorised Signatory`, bold: 'true'},

            ]
        },



]

}
return dd
}
}
