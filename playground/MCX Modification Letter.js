// playground requires you to assign document definition to a variable called dd
var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
	createDocDefinition: async (fileParams) => {
		let AP_Draft_Registration_Details = datamodel.AP_Draft_Registration_Details()
		let AP_Snapshot_Branch_Details = datamodel.AP_Snapshot_Branch_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let CountryMst = datamodel.CountryMst()
        let StateMst = datamodel.StateMst()
        let CityMst = datamodel.CityMst()
		let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let EntityMst = datamodel.EntityMst()
        let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
        let segmentMst = datamodel.SegmentMst()
        let AP_Snapshot_General_Details = datamodel.AP_Snapshot_General_Details()
        let AP_Snapshot_Contact_Details = datamodel.AP_Snapshot_Contact_Details()

		let date = commonFunction.ConvertDateSlash_2(new Date())
		let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let apData2 = await dataaccess.FindOne(AP_Snapshot_General_Details, { where: { Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
        let param3 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }
        let apContact = await dataaccess.FindOne(AP_Draft_Contact_Details, param3)
        let apContact2 = await dataaccess.FindOne(AP_Snapshot_Contact_Details, { where: { AP_Snapshot_Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
        let apBrokerageDtls = await dataaccess.FindAll(AP_Draft_Brokerage_Sharing_Details, { where: { AP_Id: fileParams.apId, Exchange: 1 }, attributes: ['Segment'] })
        let str1 = apBrokerageDtls.map(e => e.Segment)
        let segmentData = await dataaccess.FindAll(segmentMst, { where: { Id: str1 }, attributes: ['Segment_Name'] })
        let str2 = segmentData.map(e => e.Segment_Name.toUpperCase()).join(', ')
		let registration = await dataaccess.FindOne(AP_Draft_Registration_Details, { where: { AP_ID: fileParams.apId } })
		let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })

        let apBranch2 = await dataaccess.FindOne(AP_Snapshot_Branch_Details, { where: { AP_Snapshot_Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
		let oldName, newName, oldTrade, newTrade, oldAddress, newAddress, oldPartners, newPartners
        if (apData.Account_Name == apData2.Account_Name) {
            oldName = ''
            newName = ''
        } else {
            oldName = 'Old Account Name : ' + apData2.Account_Name
            newName = 'New Account Name : ' + apData.Account_Name
        }
        if (apData.Trade_Name == apData2.Trade_Name) {
            oldTrade = ''
            newTrade = ''
        } else {
            oldTrade = 'Old Trade Name : ' + apData2.Trade_Name
            newTrade = 'New Trade Name : ' + apData.Trade_Name
        }
        if (apContact.Contact_Person_Name == apContact2.Contact_Person_Name) {
            oldPartners = ''
            newPartners = ''
        } else {
            oldPartners = 'Old Partners Name : ' + apContact2.Contact_Person_Name
            newPartners = 'New Partners Name : ' + apContact.Contact_Person_Name
        }
        
        let country = {};
        let state = {};
        let city = {};
        let country2 = {};
        let state2 = {};
        let city2 = {};
        if (apBranchDtls) {
            if (apBranchDtls.Country_Code_ID) {
                country = await dataaccess.FindOne(CountryMst, { where: { Id: apBranchDtls.Country_Code_ID } })
            } else {
                country.Country_Name = ' ';
            }
            if (apBranchDtls.State_Code) {
                state = await dataaccess.FindOne(StateMst, { where: { Id: apBranchDtls.State_Code } })
            } else {
                state.State_Name = ' ';
            }
            if (apBranchDtls.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
            } else {
                city.City_name = ' ';
            }
        }
        if (apBranch2) {
            if (apBranch2.Country_Code_ID) {
                country2 = await dataaccess.FindOne(CountryMst, { where: { Id: apBranch2.Country_Code_ID } })
            } else {
                country2.Country_Name = ' ';
            }
            if (apBranch2.State_Code) {
                state2 = await dataaccess.FindOne(StateMst, { where: { Id: apBranch2.State_Code } })
            } else {
                state2.State_Name = ' ';
            }
            if (apBranch2.City_Code) {
                city2 = await dataaccess.FindOne(CityMst, { where: { Id: apBranch2.City_Code } })
            } else {
                city2.City_name = ' ';
            }
        }


        if (apBranchDtls && apBranch2) {
            if (apBranchDtls.Address_1 == apBranch2.Address_1 && apBranchDtls.Address_2 == apBranch2.Address_2 && apBranchDtls.City_Code == apBranch2.City_Code && apBranchDtls.State_Code == apBranch2.State_Code && apBranchDtls.Pin_Code == apBranch2.Pin_Code && apBranchDtls.Country_Code_ID == apBranch2.Country_Code_ID) {
                oldAddress = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()
                newAddress = ''
            } else {
                oldAddress = ((apBranch2.Address_1 == null ? ' ' : apBranch2.Address_1) + ', ' + (apBranch2.Address_2 == null ? ' ' : apBranch2.Address_2) + ', ' + (city2.City_name == null ? ' ' : city2.City_name) + ', ' + (state2.State_Name == null ? ' ' : state2.State_Name) + '-' + (apBranch2.Pin_Code == null ? ' ' : apBranch2.Pin_Code) + ', ' + (country2.Country_Name == null ? ' ' : country2.Country_Name)).toUpperCase()

                newAddress = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()

            }
		}
var dd = {

	content: [
	    
	    `\n\n\n\n\n`,
	    {text:`MCX Checklist`,bold: 'true', decoration: 'underline', alignment:'center'},
	    `\n`,
	    	{
			style: 'tableExample',
			table: {
				widths: [36,430,55],
				body: [
					
					[{text: 'Sr. No.',alignment: 'center', bold: 'true'}, {text: 'Particulars ', bold: 'true', alignment: 'center'}, {text: 'Status (Yes/NO)',bold: 'true', alignment: 'center'}],
					[{text: '1',alignment: 'center'}, `Request Letter – Draft letter as below`, {text: '',alignment: 'center'}],
					
					[{text: '2',alignment: 'center'},  `Valid Address Proof (list of valid address proof – as per registration checklist)`, {text: '',alignment: 'center'}],
					[{text: '3',alignment: 'center'}, `Pan Card Copy – self attested `, {text: '',alignment: 'center'}],
					
					[{text: '4',alignment: 'center'},`AP 1 - Application form - Change of Office address`, {text: '',alignment: 'center'}],
			[{text: '5',alignment: 'center'},`AP – 3 - Change of Office address`,{text: '',alignment: 'center'} ],
				[{text: '6',alignment: 'center'},`AP-7 Change of Details`,{text: '',alignment: 'center'} ]
				]
			}
		},
	    {text:'\n',pageBreak:'before'} , 
	    `Date: ${date}

To,
${entityData[0].Entity_Name}


`,
				{ text: `\nSubject : Change of Address in MCX`, bold: 'true',decoration:'underline' },

	    
	    {text:[
	        `Dear Sir,


I active Authorised Person (Authorised Person Reg No ${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}) of ${entityData[0].Entity_Name} member of `,
{text:`Multi Commodity Exchange of India Ltd (Reg No. ${entityData[0].MCX_Memberid== null ? ' ' : entityData[0].MCX_Memberid}) having registered office `,bold:'true'},
{text:`${oldAddress}`,bold:'true', decoration:'underline'},
` shifting our office. So kindly update our new address in your record as per details given below.

`,
  ]},
{text:'\nNew Office address:',bold:'true', decoration:'underline'},
{text:`\n${newAddress}`,bold:'true', decoration:'underline'},




`\nKindly do the needful at the earliest.

Thanking You,	

For,



(Authorised Signatory)

AP Name:- ${apData.Account_Name == null ?' ': apData.Account_Name.toUpperCase()}
Trade Name:- ${apData.Trade_Name == null ?' ': apData.Trade_Name.toUpperCase()}
Reg. No. :- ${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}`,
{text:[
`Reg. Date:-`,  
{text:commonFunction.ConvertDateSlash_2(registration.RegistrationDate)},
]},	        
{text:`AP-7
Application for Change in Registered Details
`, bold:'true', decoration:'underline', alignment:'center',pageBreak:'before'},	        
{text:`(On the letterhead of the Authorised person)`,alignment:'center'},	        
	        `\nI Mr. /Ms. / M/s. ${apData.Account_Name == null ?' ': apData.Account_Name.toUpperCase()} (name of the applicant authorised person) registered Authorised Person under ${entityData[0].Entity_Name} (name of Member).

I/We have applied for change in my/our registered details marked below.   
`,
// 	 {text:[
// 	     { text: "\n\uf096 ", style: 'fontawesome' },
//                         ` Address (Residential/Office)\n `,
//                         { text: "\uf096 ", style: 'fontawesome' },
//                         `  Contact Details\n`,
//                          { text: "\uf096 ", style: 'fontawesome' },
//                         `  Trade Name\n`,
//                          { text: "\uf096 ", style: 'fontawesome' },
//                         `  Director/Partner\n`,
// 	    ]},
	    
	      {text: `\nExisting (before change) details of Authorized Person are as follows:\n\n`,bold:'true',decoration:'underline'}, 
 {
            style: 'tableExample',
            table: {
                widths: [110, 150, 80, 140],
                body: [
                    [{ text: `Name of the Authorised Person`, bold: 'true' }, { text: `Trade Name of the Authorised Person`, bold: 'true' }, { text: `AP Registration number `, bold: 'true' }, { text: `Existing Details (Address/Contact Details/Trade Name/Director/Partner)`, bold: 'true' }],
                    [{ text: `${apData.Account_Name == null ?' ': apData.Account_Name.toUpperCase()}`, bold: 'true' }, { text: `${apData.Trade_Name == null ?' ': apData.Trade_Name.toUpperCase()}`, bold: 'true' }, { text: `${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()} `, bold: 'true' }, { text: `${oldName}
					${oldTrade}
					${oldPartners}
					${oldAddress}`, bold: 'true' }],


                ]
            }
        },
         {text: `\nFollowing changes to be made (details after change):\n\n`,bold:'true',decoration:'underline'}, 
	 {
            style: 'tableExample',
            table: {
                widths: [110, 150, 80, 140],
                body: [
                    [{ text: `Name of the Authorised Person`, bold: 'true' }, { text: `Trade Name of the Authorised Person`, bold: 'true' }, { text: `AP Registration number `, bold: 'true' }, { text: `New Details (Address/Contact Details/Trade Name/Director/Partner)`, bold: 'true' }],
                    [{ text: `${apData.Account_Name == null ?' ': apData.Account_Name.toUpperCase()}`, bold: 'true' }, { text: `${apData.Trade_Name == null ?' ': apData.Trade_Name.toUpperCase()}`, bold: 'true' }, { text: `${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()} `, bold: 'true' }, { text: `${newName}
					${newTrade}
					${newPartners}
					${newAddress}`, bold: 'true' }],


                ]
            }
	 },
	 
	 `\nFurther, please find enclosed following documents towards aforesaid changes. `,
	 {text:`\nIn case of Change in Address:`,bold:'true'},
	 `\na.	Latest Address proof of the new address duly certified by the Member.
_______________________________ 
`,
     {text:`@Authorized Signatory `, bold:'true'},   
     `\n(To be attested by the Member):- __________________________________`,
     {text:`                                                      #Authorized Signatory & Seal of Member`, bold:'true', alignment:'center'},

{text:`\n@To be signed by the AP whose signature is on the records of the Exchange

# To be signed only by Proprietor/ Karta / Managing Partner/ Designated Director/ authorized signatory as on the records of the Exchange
`,bold:'true'},
     ],
    styles: {

                fontawesome: {

                    'font': 'FontAwesome',

                    'color': "#656565"



                }

            }
}
return dd
}
}
		
// 		['We confirm that', { text: ` ${f} (${str})`, bold: 'true' }, '
