// playground requires you to assign document definition to a variable called dd
var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
	createDocDefinition: async (fileParams) => {
		let p = path.join(__dirname, '/Sample1.png')

		let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
		let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
		let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
		let AP_Draft_Other_Details = datamodel.AP_Draft_Other_Details()
		let AP_Draft_Registration_Details = datamodel.AP_Draft_Registration_Details()
		let ConstitutionMst = datamodel.ConstitutionMst()
		let DesignationMst = datamodel.DesignationMst()
		let CountryMst = datamodel.CountryMst()
		let EntityMst = datamodel.EntityMst()
		let CityMst = datamodel.CityMst()
		let StateMst = datamodel.StateMst()
		let AP_Snapshot_Branch_Details = datamodel.AP_Snapshot_Branch_Details()

		let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

		let param = { where: { Id: Number(fileParams.apId) } }
		let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
		let constitution = await dataaccess.FindOne(ConstitutionMst, { where: { Id: apData.Constitution_Id } })
		let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: fileParams.apId, IsRegistered: true } })
		let apBranch2 = await dataaccess.FindOne(AP_Snapshot_Branch_Details, { where: { AP_Snapshot_Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
		let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
		let apOther = await dataaccess.FindOne(AP_Draft_Other_Details, { where: { AP_Id: fileParams.apId } })
		let registration = await dataaccess.FindOne(AP_Draft_Registration_Details, { where: { AP_ID: fileParams.apId } })
		let country = {};
		let city = {};
		let state = {};
		if (apBranchDtls) {
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
		}
		let b;
		let add;
		if (apBranchDtls) {
			add = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ' ,' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '- ' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()
			b = (apBranchDtls.STD_Code == null ? ' ' : apBranchDtls.STD_Code) + '\n' + (apBranchDtls.Telephone_Number == null ? ' ' : apBranchDtls.Telephone_Number) + ' \n' + (apBranchDtls.FAX_Number == null ? ' ' : apBranchDtls.FAX_Number) + '\n' + (apBranchDtls.CC_Email == null ? ' ' : apBranchDtls.CC_Email.toUpperCase()) + '\n' + (apBranchDtls.Branch_Mobile_Number == null ? ' ' : apBranchDtls.Branch_Mobile_Number);
		} else {
			b = '';
			add = '';
		}

		let d;
		if (apData.Process_Id == 1) {
			d = 'NEW'
		} else {
			d = 'EXISTING'
		}
		let ar = []
		let m = apContact.map(async e => {
			let a = await dataaccess.FindOne(DesignationMst, { where: { Id: e.Designation } })
			ar.push({ contact: e.Contact_Person_Name == null ? ' ' : e.Contact_Person_Name.toUpperCase(), designation: a.Designation_Name.toUpperCase() })
		})
		await Promise.all(m)
		// console.log(ar)

		let dob;
		if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
			dob = ' '
		} else {
			dob = commonFunction.ConvertDateSlash(new Date(apData.DOB_INC))
		}
		let a;
		if (apData.Account_Name == apData.Trade_Name) {
			a = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()
		} else {
			a = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase() + ' (' + (apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()) + ')';
		}

		let oldAddress, newAddress;
		let country2 = {};
		let state2 = {};
		let city2 = {};
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
				oldAddress = ''
				newAddress = ''
			} else {
				oldAddress = 'Old Address : ' + '\n' + ((apBranch2.Address_1 == null ? ' ' : apBranch2.Address_1) + ', ' + (apBranch2.Address_2 == null ? ' ' : apBranch2.Address_2) + ', ' + (city2.City_name == null ? ' ' : city2.City_name) + ', ' + (state2.State_Name == null ? ' ' : state2.State_Name) + '-' + (apBranch2.Pin_Code == null ? ' ' : apBranch2.Pin_Code) + ', ' + (country2.Country_Name == null ? ' ' : country2.Country_Name)).toUpperCase()

				newAddress = 'New Address : ' + '\n' + ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()

			}
		}
		let date = commonFunction.ConvertDateSlash(new Date())
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
										text: `Registered Office: ${entityData[0].RegisteredAddress} Tel No.: +91 79-40019900 &  79 6692 9900
				Corporate Office: ${entityData[0].CorporateAddress} Tel No.: +91 22 4009 4400  
				`, fontSize: 8,
									},
								]
							},]]
				},
			},
			content: [
				`\n\n\n\n\n`,
				{ text: `NCDEX Checklist`, bold: 'true', decoration: 'underline', alignment: 'center' },
				`\n`,
				{
					style: 'tableExample',
					table: {
						widths: [36, 430, 55],
						body: [

							[{ text: 'Sr. No.', alignment: 'center', bold: 'true' }, { text: 'Particulars ', bold: 'true', alignment: 'center' }, { text: 'Status (Yes/NO)', bold: 'true', alignment: 'center' }],
							[{ text: '1', alignment: 'center' }, `Request Letter – Draft letter as below`, { text: '', alignment: 'center' }],

							[{ text: '2', alignment: 'center' }, `Valid Address Proof (list of valid address proof – as per registration checklist) and kindly note that if rent agreement provided then the same should be only in English or Hindi no other language is accepted by NCDEX exchange.`, { text: '', alignment: 'center' }],
							[{ text: '3', alignment: 'center' }, `Pan Card Copy – self attested `, { text: '', alignment: 'center' }],

							[{ text: '4', alignment: 'center' }, `Annexure II - Application form – Change of Office address `, { text: '', alignment: 'center' }],
							[{ text: '5', alignment: 'center' }, `Annexure III – Change of Residential Address `, { text: '', alignment: 'center' }]
						]
					}
				},
				{ text: '\n', pageBreak: 'before' },
				`Date: ${date}

To

Membership Compliance,
National Commodity & Derivatives Exchange Ltd 
(Customer Service Department)
1st Floor, Akruti Corporate Park, LBS Road, 
Kanjurmarg(west), Mumbai – 400078.


Dear Sir/Madam, 
`,
				{ text: `\nSub: - Application for Change of Address of Authorised Person: ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' },
				{
					text: [
						`\nWe hereby request the Exchange to take in record the new address of`,
						{ text: ` Authorised Person ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' }, ` carrying registration no`,
						{ text: ` ${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}`, bold: 'true' }, ` (Reg No).`,
`\n\n`,
						{
							style: 'tableExample',
							layout: 'noBorders',
							table: {
								//   widths:[30,220,'*'],
								body: [
									[{ text: `${oldAddress}`, bold: 'true' }, { text: `${newAddress}`, bold: 'true' },],
								]
							}
						},

						`\n\n\nPlease take the same into records.`,
						`\n\n\n\n\n\nThanking you`,

						{ text: `\nFor ${entityData[0].Entity_Name}`, bold: 'true' },
						{ text: `\n\n\n\nAuthorised Signatory`, bold: 'true' }


					]
				},

				{ text: `\n\n\nANNEXURE II`, bold: 'true', alignment: 'center', pageBreak: 'before' },
				`to circular No. NCDEX/COMPLIANCE-017/2019 APRIL 15, 2019`,
				{ text: `\nDate: ${date}`, bold: 'true' },
				{ text: `\n\nDetails of Authorised Person`, bold: 'true', alignment: 'center' },
				{
					style: 'tableExample',
					table: {
						widths: [30, 220, '*'],
						body: [
							[{ text: 'Sr. no.', alignment: 'center', bold: 'true' }, { text: 'Particulars', alignment: 'center', bold: 'true' }, { text: 'Details required', alignment: 'center', bold: 'true' }],
							[{ text: ' 1', alignment: 'center' }, 'Whether application is for existing or new Authorised Person', { text: `EXISTING`, bold: 'true', }],
							[{ text: ' 2', alignment: 'center' }, 'Name of Authorised Person ', { text: `${a}`, alignment: 'justify' },],
							[{ text: ' 3', alignment: 'center' }, 'Constitution: (Individual/Partnership/LLP/Body Corporate)',
							{ text: `${constitution.Constitution_Name == null ? ' ' : constitution.Constitution_Name.toUpperCase()} `, fontSize: 14, alignment: 'justify' },],

							[{ text: ' 4', alignment: 'center' }, 'Nationality', { text: `INDIAN`, bold: 'true' }],
							[{ text: ' 5', alignment: 'center' }, 'Date of Incorporation/Registration (In case of corporate/firm/LLP)', `${dob}`],
							[{ text: ' 6', alignment: 'center' }, ` Office Address Details** 


					STD Code:
					Telephone No.: 
					 Fax No.: 
					Email Address:
					Mobile No. :  
					`,



							`${add}\n\n\n                           ${b}`],
							[{ text: ' 7', alignment: 'center' }, `Name
												and designation of the Contact Person in Authorised Person’s office **
												`, space(ar)],
							[{ text: ' 8', alignment: 'center' }, `Income Tax Permanent Account No. (PAN) of Authorised Person
												`, { text: `${apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()}`, bold: 'true' }],
							[{ text: ' 9', alignment: 'center' }, `No. of terminals existing/proposed at this location
												`, { text: `${apOther.Total_No_Of_Terminals == null ? ' ' : apOther.Total_No_Of_Terminals}` }],

						]
					}
				},
				{ text: `\n** In case the Authorised Person operates from more than one location, similar details to be provided location-wise in separate annexure.` },
				{ text: `\n\n\n(Signature & Name of Member)`, bold: 'true' }
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