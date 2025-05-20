// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');

module.exports = {


	createDocDefinition: async (fileParams) => {
		let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
		let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
		let CityMst = datamodel.CityMst()
		let StateMst = datamodel.StateMst()
		let CountryMst = datamodel.CountryMst()
		let EducationMst = datamodel.EducationMst()

		let param = { where: { Id: Number(fileParams.apId) } }
		let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
		let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })

		let city = [];
		let state = [];
		let country = [];
		let education = []

		let m = apContact.map(async e => {
			if (e.City_Code) {
				let city1 = await dataaccess.FindOne(CityMst, { where: { Id: e.City_Code } })
				city.push(city1 == null ? ' ' : city1.City_name.toUpperCase())
			} else {
				city.push(' ')
			}
			if (e.State_Code) {
				let state1 = await dataaccess.FindOne(StateMst, { where: { Id: e.State_Code } })
				state.push(state1 == null ? ' ' : state1.State_Name.toUpperCase())
			} else {
				state.push(' ')
			}
			if (e.Country) {
				let country1 = await dataaccess.FindOne(CountryMst, { where: { Id: e.Country } })
				country.push(country1 == null ? ' ' : country1.Country_Name.toUpperCase())
			} else {
				country.push(' ')
			}
			if(e.Contact_Person_Education){
				let education1 = await dataaccess.FindOne(EducationMst, {where: {Id: e.Contact_Person_Education}})
				education.push(education1 == null ? ' ': education1.Education_Name.toUpperCase())
			}else{
				education.push(' ')
			}
		})
		await Promise.all(m)
		
		let t1 = [`Sl. No`, `Name (in full)`, `Name (in full) of Father/Hus band`, `Date of Birth`, `PAN`, `Educational Qualification`, `Residential Address`, `Contact No./Email ID`, `Signature`]
		var dd = {
			content: [
				`\n\n\n\n\n\n\n\n`,
				{
					text: 'On the letter head of Authorised Person',
					fontSize: 11,
					alignment: 'center',
					color: '#919191',
				},
				{ text: `\nANNEXURE III`, bold: 'true', alignment: 'center', },
				{
					text: [
						{ text: `\nto circular No. NCDEX/COMPLIANCE-017/2019  April 15, 2019`, alignment: 'center' }
					]
				},
				{
					text: [
						{
							text: `\nDetails of the Individual / Details of Directors/Partners of\n
M/s `, bold: 'true'
						},
						{ text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline' },
						{
							text: ` (Applicant Authorised Person)\n
`, bold: 'true',
						},]
				},
				'\n',
				table(apContact, t1, city, state, country, education),

				// {text:`\n`,pageBreak:'before'},
				{
					text: [
						{
							text: `\n\nPhotographs of the Individual or each of the Directors/Partners of\n M/s `, bold: 'true'
						},
						{ text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline' },

						{
							text: ` (Applicant Authorised Person)\n`, bold: 'true',
						},

						{ text: `(to be signed across and pasted below)`, alignment: 'center', },
						`\n
`,
					]
				},
				{
					style: 'tableExample',
					table: {
						widths: [77, 77, 77, 77, 77, 77],
						heights: [20, 90],
						body: [
							[{ text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' },],
							[`  `, `  `, `  `, `  `, `  `, `  `,],

						]
					}
				},
			`\n`,
				{
					style: 'tableExample',
					table: {
						widths: [77, 77, 77, 77, 77, 77],
						heights: [20, 80],
						body: [
							[{ text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' }, { text: `Name`, alignment: 'center' },],
							[`  `, `  `, `  `, `  `, `  `, `  `,],

						]
					}
				},
				`\nConfirmed`,

				{
					text: `For Edelweiss Broking Limited 


 
					
					(Name & Signature of the Member)`, bold: 'true',
				},
			]

		}
		return dd
	}
}

function table(data, columns,ar, ar2,ar3, ar4) {

	return {
		fontSize: 9,
		table: {
			headerRows: 1,
			widths: [10, 35, 40, 40, 45, 45, 115, 60, 45],
			body: buildTableBody(data, columns,ar, ar2,ar3, ar4)
		}
	}
}


function buildTableBody(data, columns,ar, ar2,ar3, ar4) {
	var body = [];
	data.map((e, i) => e['index'] = i + 1)
	body.push(columns);

	data.map(function (row, index) {
		var dataRow = [];
		dataRow.push(row.index.toString());
		dataRow.push(row.Contact_Person_Name == null ? ' ' : row.Contact_Person_Name.toUpperCase());
		row.Contact_Father_Name ? dataRow.push(row.Contact_Father_Name == null ? ' ' : row.Contact_Father_Name.toUpperCase()) : dataRow.push(row.Contact_Spouse_Name == null ? ' ' : row.Contact_Spouse_Name);
		//dataRow.push(row.Contact_Spouse_Name == null ? ' ' : row.Contact_Spouse_Name);
		dataRow.push(row.Contact_Person_DOB == null ? ' ' : row.Contact_Person_DOB.toString().slice(0, 10).split('-').reverse().join('/'));
		dataRow.push(row.Contact_PAN == null ? ' ' : row.Contact_PAN.toUpperCase());
		dataRow.push(ar4[index]);
		dataRow.push(((row.Address_1 == null ? ' ' : row.Address_1) + ', ' + (row.Address_2 == null ? ' ' : row.Address_2) + ', ' + ar[index] + ', ' + ar2[index] + '-' + (row.Pin_Code == null ? ' ' : row.Pin_Code) + ', ' + ar3[index] + '.').toUpperCase());
		dataRow.push(row.Mobile_No == null ? ' ' : row.Mobile_No + '/' + (row.Email == null ? ' ' : row.Email.toUpperCase()));
		dataRow.push('')
		body.push(dataRow);
	});


	return body;
}