var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
var commonFunction = require('../Common/CommonFunctions');

module.exports = {
  createDocDefinition: async (fileParams) => {

    let p = path.join(__dirname, '/Sample1.png')
    let EntityMst = datamodel.EntityMst()
    let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
    let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
    let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
    let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
    let ExchangeMst = datamodel.ExchangeMst()
    let SegmentMst = datamodel.SegmentMst()
    let ConstitutionMst = datamodel.ConstitutionMst()
    let CountryMst = datamodel.CountryMst()
    let CityMst = datamodel.CityMst()
    let StateMst = datamodel.StateMst()
    let EducationMst = datamodel.EducationMst()


    let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
    let param = { where: { Id: Number(fileParams.apId) } }
    let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
    let param2 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }
    let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, param2)
    let param3 = { where: { AP_Id: Number(fileParams.apId) } }
    let apBrokerage = await dataaccess.FindOne(AP_Draft_Brokerage_Sharing_Details, param3)
    let param4 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } }
    let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, param4)
    // console.log('apBranchDtls', apBranchDtls)
    // let date_1 = commonFunction.daySuffixFormat(new Date(apContact[0].Contact_Person_DOB))
    let constitution = await dataaccess.FindOne(ConstitutionMst, { where: { Id: apData.Constitution_Id } })
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
  let city1 = [];
  let state1 = [];
  let country1= [];

 
  
                let m = apContact.map(async e => {
                        if (e.City_Code ) {
                                let city2 = await dataaccess.FindOne(CityMst, { where: { Id: e.City_Code } })
                                // console.log(city2)
                                city1.push(city2==null?' ': city2.City_name.toUpperCase())
                        } else {
                                city1.push(' ' )
                        }
                        if ( e.State_Code) {
                                let state2 = await dataaccess.FindOne(StateMst, { where: { Id: e.State_Code } })
                                state1.push(state2==null?' ': state2.State_Name.toUpperCase())
                        } else {
                                state1.push(' ')
                        }
                        if ( e.Country) {
                                let country2 = await dataaccess.FindOne(CountryMst, { where: { Id: e.Country} })
                                country1.push(country2==null?' ': country2.Country_Name.toUpperCase())
                        } else {
                                country1.push(' ')
                        }
                })
                await Promise.all(m)

    let b;
    if (apBranchDtls) {
      b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)+'.').toUpperCase()
        ;
    } else {
      b = '';
    }

    // console.log('date_1', date_1)

    let a;
    if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
      a = 'Type of organization: ' + (constitution.Constitution_Name == null ? ' ' : constitution.Constitution_Name.toUpperCase())
    } else {
      a = 'Type of organization: ' + (constitution.Constitution_Name == null ? ' ' : constitution.Constitution_Name.toUpperCase()) + '\n\n' + 'Names of Partners/Directors:' + pan(apContact)
    }

    let n;
    if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
      n = 'NO'
    } else {
      n = 'NA'
    }

    let residence;
    if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
      residence = space(apContact,city1, state1, country1)
    } else {
      residence = space2(apContact, city1, state1, country1)
    }

    let contactDisplay;
    if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
      contactDisplay = contact(apContact)
    } else {
      contactDisplay = contact2(apContact)
    }
    let panNo = '';
    if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
      panNo = apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()
    } else {

      apContact.map(e => {

        panNo += (e.Contact_Person_Name + ' :- ' + e.Contact_PAN + '\n').toUpperCase()
      })
      panNo += (apData.Account_Name + ' :- ' + apData.PAN_Number).toUpperCase()
    }

    
    let education = [];
    let o = apContact.map(async e => {
      if (e.Contact_Person_Education) {
        let education1 = await dataaccess.FindOne(EducationMst, { where: { Id: e.Contact_Person_Education } })
        
        if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {


          education += (education1.Education_Name == null ? ' ' : education1.Education_Name + '\n' + commonFunction.shortMonthDateFormatter(new Date(e.Contact_Person_DOB)) + '\n\n').toUpperCase()
        
        }
        else {
          education += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' - ' + (education1.Education_Name == null ? ' ' : education1.Education_Name) + ' - ' + commonFunction.shortMonthDateFormatter(new Date(e.Contact_Person_DOB)) + '\n').toUpperCase()
         
        }
      
      }
     
    })
   
    await Promise.all(o)
   
    // console.log('education', education)
    // console.log('apBranchDtls', apBranchDtls)
    // console.log('entityData', entityData)
    // console.log('apData', apData)
    // console.log('apContact', apContact)
    // console.log('city1', city1)
    var dd = {
      content: [

        {
          text: [
            { text: `\nAnnexure 2 (a)`, bold: 'true', alignment: 'center', decoration: 'underline' },
            {
              text: `\n\n
APPLICATION FORM BY THE APPLICANT FOR REGISTRATION AS AUTHORISED PERSON WITH TRADING MEMBER OF BSE LTD. `, bold: 'true', alignment: 'center', decoration: 'underline', fontSize: 11.5,
            },
            { text: `\n(As per Rules, Bye Laws & Regulation of the Exchange) \n\n\n\n`, alignment: 'center', },
          ]
        },

        {
          style: 'tableExample',
          table: {
            widths: [15, 220, 250, '*'],

            body: [
              [' 1', `Name of applicant
                    (applying for registration of Authorised Person.)`, `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`],
              [' 2', `Trade name :
                      (of Authorised Person/ Partnership firm/ Corporate body)`, `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`],
              [' 3', ` Segment 
                        1. Cash Segment    2. Derivatives Segment    3. Both`, `CASH`],
              [' 4', `Type of organization 
                          (sole proprietor/partnership/LLP/corporate body) [Kindly provide name/s of proprietor /partners/directors] `, `${a}`],
              [' 5', `Office address (with proof) 
                            (place from where authorised person will be operating - covering area, street/road, city/dist., state & PIN etc., all fields are compulsory).`, `${b}`],
              [' 6', `Contact Person Name,
                              Office Telephone,
                              Mobile Numbers,
                              Fax Numbers, Email ID  `, `${contactDisplay}`],
              [' 7', `Residence address (with proof) with telephone number
                                (i.e. of proprietor/all partners/all directors  - covering area, street/road, city/dist., state & PIN etc., all fields are compulsory).`,
                `${residence}`],
              [' 8', `Education qualification & Date of Birth (with proof)
                                  (of proprietor / all partners / all directors with proof are compulsory) `         , `${education}`],

              [' 9', 'PAN Number of the applicant & applicant firm and of proprietor/all partners/all directors with proof is compulsory.', `${panNo}`],


              ['10', 'Name and clearing no. of main Trading Member to whom applicant is affiliated ', `Edelweiss Broking Ltd.` +
                `\n ${entityData[0].ClearingNumber == null ? ' ' : entityData[0].ClearingNumber }`],

              ['11', 'Date of signing agreement with the Trading Member', ''],
              ['12', 'Authorised person affiliated to a Trading Member in any other stock exchange - if Yes, provide details of Registration No. & Date with details of name of member to whom he/she/they is/are affiliated.', `${n}`],
              ['13', 'Whether any case/claim/arbitration pending against the authorised person in any court/stock exchanges (provide details)', `${n}`],
              ['14', 'In case applicant is member of a Regional/Multiple Stock Exchange, details of SEBI Registration No. & Date of Registration', `${n}`],


            ]
          }
        },

        { text: `\nI certify that the information given in this application form is true to the best of my/our knowledge and belief.` },
        { text: `\n\n\nDate  :`, },
        { text: `Place :`, },

        {
          text: [
            { text: `\n\nSignature of Applicants `, alignment: 'right' },
            { text: `\nProprietor / Partner / Director`, alignment: 'right' },
            { text: `\n(With rubber stamp) `, alignment: 'right' },
          ]
        },

      ],

    }
    return dd
  }
}

function pan(apContact) {
  let str = ''
  apContact.map((e, i) => {
    let x = i + 1;
    str += ('\n' + x + '. ' + (e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name)).toUpperCase()
  }
  )
  return str;
}


function space(apContact, city1, state1, country1) {
  console.log('city1', city1)
  let f = ''
  apContact.map((e, i) => {
    if (i == apContact.length - 1) {
      f += ((e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ') .toUpperCase()



      f += (city1[0] + ', ' + state1[0] + '-' ).toUpperCase()
f += ((e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (country1[0]) + '.' + '\n' ).toUpperCase()
f+= ((e.Telephone_No == null ? ' ' : e.Telephone_No))
      // i
      // f += ((e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ' + (city1.City_name == null ? ' ' : city1.City_name) + ', ' + (state1.State_Name == null ? ' ' : state1.State_Name) + '-' + (e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (country1.Country_Name== null ? ' ' : country1.Country_Name) + '.' + '\n' + (e.Telephone_No == null ? ' ' : e.Telephone_No)).toUpperCase()
    } else {
      // f += ((e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ' + (city1.City_name == null ? ' ' : city1.City_name) + ', ' + (state1.State_Name == null ? ' ' : state1.State_Name) + '-' + (e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (e.Country == null ? ' ' : e.Country) + '.' + '\n' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + '\n\n').toUpperCase()
    
      f += ((e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ') .toUpperCase()



      f += (city1[0] + ', ' + state1[0] + '-' ).toUpperCase()
      f += ((e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (country1[0]) + '.' + '\n' ).toUpperCase()
      f+= ((e.Telephone_No == null ? ' ' : e.Telephone_No))}
  })
  return f;
}

function space2(apContact, city1,state1, country1) {
  let f = ''
  apContact.map((e, i) => {
    if (i == apContact.length - 1) {
f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' :- ' + (e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ') .toUpperCase()



f += (city1[0] + ', ' + state1[0] + '-' ).toUpperCase()
f += ((e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + country1[0] + '.' + '\n' ).toUpperCase()
f+= ((e.Telephone_No == null ? ' ' : e.Telephone_No))

} else {
      // f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' :- ' + (e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ' + (e.City_Code == null ? ' ' : e.City_Code) + ', ' + (state1.State_Name == null ? ' ' : state1.State_Name) + '-' + (e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (e.Country == null ? ' ' : e.Country) + '.' + '\n' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + '\n\n').toUpperCase()
      f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' :- ' + (e.Address_1 == null ? ' ' : e.Address_1) + ', ' + (e.Address_2 == null ? ' ' : e.Address_2) + ', ') .toUpperCase()


      f += (city1[0] + ', ' + state1[0] + '-' ).toUpperCase()
      f += ((e.Pin_Code == null ? ' ' : e.Pin_Code) + ', ' + (country1[0]) + '.' + '\n' ).toUpperCase()
      f+= ((e.Telephone_No == null ? ' ' : e.Telephone_No)+ '\n\n')
    }
  })
  return f;
}
function contact(apContact) {
  let f = ''
  apContact.map((e, i) => {
    if (i == apContact.length - 1) {
      f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ',\n' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + ',\n' + (e.Mobile_No == null ? ' ' : e.Mobile_No) + ',\n' + (e.FAX_No == null ? ' ' : e.FAX_No) + ',\n' + (e.Email == null ? ' ' : e.Email)).toUpperCase()
    } else {
      f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ',\n' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + ',\n' + (e.Mobile_No == null ? ' ' : e.Mobile_No) + ',\n' + (e.FAX_No == null ? ' ' : e.FAX_No) + ',\n' + (e.Email == null ? ' ' : e.Email) + '\n\n').toUpperCase()
    }
  })
  return f;
}

function contact2(apContact) {
  let f = ''
  apContact.map((e, i) => {
    if (i == apContact.length - 1) {
      f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' / ' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + ' / ' + (e.Mobile_No == null ? ' ' : e.Mobile_No) + ' / ' + (e.FAX_No == null ? ' ' : e.FAX_No) + ' / ' + (e.Email == null ? ' ' : e.Email)).toUpperCase()
    } else {
      f += ((e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name) + ' / ' + (e.Telephone_No == null ? ' ' : e.Telephone_No) + ' / ' + (e.Mobile_No == null ? ' ' : e.Mobile_No) + ' / ' + (e.FAX_No == null ? ' ' : e.FAX_No) + ' / ' + (e.Email == null ? ' ' : e.Email) + '\n\n').toUpperCase()
    }
  })
  return f;
}


