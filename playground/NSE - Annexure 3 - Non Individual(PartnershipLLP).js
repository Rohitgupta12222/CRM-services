var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions');

module.exports = {
	createDocDefinition: async (fileParams) => {
		let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
		let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
		let CityMst = datamodel.CityMst()
		let StateMst = datamodel.StateMst()
		let CountryMst = datamodel.CountryMst()
		let EducationMst = datamodel.EducationMst()
		let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
		let apContactData = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
		let str = apContactData.map(e => e.Contact_Person_Name).join(',')
		let date = new Date()

		let city = [];
                let state = [];
                let country= [];
				let education=[];

                let m = apContactData.map(async e => {
                        if (e.City_Code ) {
                                let city1 = await dataaccess.FindOne(CityMst, { where: { Id: e.City_Code } })
                                city.push(city1==null?' ': city1.City_name.toUpperCase())
                        } else {
                                city.push(' ' )
                        }
                        if ( e.State_Code) {
                                let state1 = await dataaccess.FindOne(StateMst, { where: { Id: e.State_Code } })
                                state.push(state1==null?' ': state1.State_Name.toUpperCase())
                        } else {
                                state.push(' ')
                        }
                        if ( e.Country) {
                                let country1 = await dataaccess.FindOne(CountryMst, { where: { Id: e.Country} })
                                country.push(country1==null?' ': country1.Country_Name.toUpperCase())
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

		let t1 = ['No.', 'Name $', 'Father’s Name', 'Date of Birth', 'PAN No. #', 'Qualification ', 'Residential Address', 'Contact / Mobile No. ', 'Profit / Loss Sharing Ratio']

		date = commonFunc.ConvertDateSlash(date)
		var dd = {
			content: [
				{
					text: ` (On the letterhead of the Authorised Person)
(For Partnership/LLP)
`, bold: 'true', background: '#ffff00', alignment: 'center'
				},


				{
					text: 'Annexure - 3', bold: 'true', alignment: 'center',
				},
				{
					text: [
						{
							text: `\n
	DETAILS OF PARTNERS OF M/S. `, bold: true
						},
						{ text: ` ${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}  `, bold: 'true', decoration: 'underline' },
						{
							text: ` (APPLICANT AUTHORISED PERSON’S NAME) AS ON Date  `, bold: 'true', alignment: 'center'
						},
						{ text: `  ${date} `, bold: 'true', alignment: 'center', decoration: 'underline' }


					]
				},
				'\n', 
				table(apContactData,t1, city, state, country, education),

				// {
				// 	style: 'tableExample',
				// 	table: {
				// 		widths: [5, 30, 50, 45, 40, '*', '*', '*', '*'],
				// 		body: [
				// 			[{
				// 				text: `No`, bold: 'true'
				// 			}, { text: `Name $`, bold: 'true' }, { text: `Partner’s Name`, bold: 'true' }, { text: `Date of Birth`, bold: 'true' }, { text: `PAN No.#`, bold: 'true' }, { text: `Qualification`, bold: 'true' }, { text: `Residential Address`, bold: 'true' }
				// 				, { text: `Contact / Mobile No.`, bold: 'true' }, { text: `Profit / Loss Sharing Ratio`, bold: 'true' }],
				// 			[`1`, ` `, ` `, ``, ``, ``, ` `, ` `, ` `],
				// 			[`2`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
				// 			[`3`, ` `, ` `, ` `, ` `, ``, ` `, ` `, ` `],
				// 			[`4`, ``, ``, ``, ``, ``, ` `, ` `, ` `]
				// 		]

				// 	}
				// },
				{
					text: [{
						text: `\nNOTES: `, bold: 'true', decoration: 'underline',
					},
					{
						text: `\n\n$`, bold: 'true',

					},
						`  All initials to be expanded(full name to be indicated) `
					]
				},
				{
					text: '\n\nPlace:'
				},
				{
					text: 'Signature of Director of Authorised Person :'
				},
				{
					text: 'With Stamp of the Authorised Person '
				},
				{
					text: '\n\nCERTIFICATE ', alignment: 'center'
				},
				{
					text: [
						{
							text: `\nThis is to certify that the details of directors in M / s. `
						},
						{ text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, decoration: 'underline', bold: 'true' },
						{
							text: ` as given above, based on my / our scrutiny of the books of accounts, records and documents is true and correct to the best of my / our knowledge and as per information provided to my / our satisfaction.
`
						}
					]
				},
				{
					text: `\n\nFor(Name of Certifying Firm)
Name of the Partner / Proprietor 
Chartered Accountant / Company Secretary 
Membership Number
					
Date : `
				}]

		}
		return dd
	}
}

function table(data, columns, ar, ar2,ar3, ar4) {
	return {
		table: {
			headerRows: 1,
			widths: [15, 35, 50, 45, 40,62,75,62,'*'],
			body: buildTableBody(data, columns, ar, ar2,ar3, ar4)
		}
	}

}


function buildTableBody(data, columns, ar, ar2,ar3, ar4) {
	var body = [];
	data.map((e, i) => e['index'] = i + 1)
	body.push(columns);

	data.map(function (row, index) {
		var dataRow = [];

		dataRow.push(row.index.toString());
		dataRow.push(row.Contact_Person_Name == null ? ' ' :row.Contact_Person_Name.toUpperCase());
		//row.Contact_Father_Name ? dataRow.push(row.Contact_Father_Name) : dataRow.push(row.Contact_Spouse_Name);
		dataRow.push(row.Contact_Father_Name == null ? ' ' : row.Contact_Father_Name.toUpperCase());
		dataRow.push(row.Contact_Person_DOB == null ? ' ' : row.Contact_Person_DOB.toString().slice(0, 10).split('-').reverse().join('/'));
		dataRow.push(row.Contact_PAN == null ? ' ' : row.Contact_PAN.toUpperCase());
		dataRow.push(ar4[index]);
		dataRow.push(((row.Address_1==null ?' ':row.Address_1) + ', ' + (row.Address_2 == null ? ' ' :row.Address_2) + ', ' + ar[index] + ', ' + ar2[index]  + '-' + (row.Pin_Code== null ? ' ' :row.Pin_Code)  + ', ' + ar3[index] +'.').toUpperCase());
		dataRow.push(row.Mobile_No == null ? ' ' :row.Mobile_No)
		dataRow.push('')
		body.push(dataRow);
	});


	return body;
}