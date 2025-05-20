var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        //  try {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let date = commonFunction.ConvertDateSlash(new Date())
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let CityMst = datamodel.CityMst()
		let StateMst = datamodel.StateMst()
		let CountryMst = datamodel.CountryMst()
        let EducationMst = datamodel.EducationMst()
console.log(date)

        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let param2 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }


        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, param2)
        let str = apContact.map(e =>e.Contact_Person_Name == null ? ' ' :e.Contact_Person_Name).join(', ')
        let city = [];
		let state = [];
		let country = [];
        let education=[];

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

        let t1 = ['Sr. No.', 'Name $', 'Father’s Name $', 'Husband’s Name **', 'Date of Birth', 'PAN No', 'Qualification', 'Residential Address **', 'Contact/Mobile No', 'Email ID']

        var dd = {
            content: [
                `\n\n\n\n\n\n\n\n`,
                {
                    text: [
                        { text: `(On the letter head of Authorised Person)`, bold: 'true', alignment: 'center', color: '#919191' },
                        { text: `\n\nAP-3 `, bold: 'true', alignment: 'center', },

                        { text: `\n\nDetails of Individual/Director/ Partners/ of M/s. `, bold: 'true' },
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, decoration: 'underline', bold: 'true' },
                        { text: `\n(Applicant Authorised Person’s Name) as on `, bold: 'true' },
                        { text: `${date}`, decoration: 'underline', bold: 'true' },
                        { text: ` (date)\n\n`, bold: 'true' },




                    ]
                },


                table(apContact, t1, city, state, country, education),
                { text: `\nNOTES:`, bold: 'true' },

                {
                    text: `* All initials to be expanded (full name to be indicated)

** Applicable only in case of married female applicants. In case if the applicant has not changed her name and address post marriage an undertaking to be obtained from applicant(s) for no change in name and address post marriage duly self-certified and the confirmed by the Member.

`},

                {
                    text: `Date :
Place:                                                                           
`}, { text: `Signature of Authorised Person:-________________`, bold: 'true', alignment: 'right' },

                {
                    text: `\n***Signature of Individual/Partner/Director with Stamp of the Authorised Person
*** Signature of the applicant should match with the PAN, If not than please provide the bank verification as per the prescribed format of the Exchange available on the Exchange website.


`},


                { text: `\nCERTIFICATE`, alignment: 'center', bold: 'true', pageBreak:'before' },
                {
                    text: [

                        `This is to certify that the details of Individual/partner/director in `,
                        { text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()} (${str})`, decoration: 'underline', bold: 'true' },
                        ` and as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction and signed before me.`,
                    ]
                },



                { text: `\n For (Name of Certifying Firm)`, alignment: 'left', bold: 'true' },
                { text: `Name of the Partner/Proprietor `, alignment: 'left', bold: 'true' },
                { text: `Chartered Accountant `, alignment: 'left', bold: 'true' },
                { text: `Membership Number`, alignment: 'left', bold: 'true' },
                { text: `Date:`, alignment: 'left', bold: 'true' },
               
                `\n\n\n\n\n`,
                { text: `\nPlease paste self-attested photographs of the Individual / partners / directors duly signed across:` },

                {
                    style: 'tableExample',
                    table: {
                        widths: [100, 100, 100, 100, 100],
                        heights: [100],
                        body: [

                            [' ', ' ', ' ', ' ', ' '],


                        ]
                    }
                },
                `\n`,
                {
                    style: 'tableExample',
                    table: {
                        widths: [100, 100, 100, 100, 100],
                        heights: [120],
                        body: [

                            [' ', ' ', ' ', ' ', ' '],


                        ]
                    }
                },


                {
                    text: `\n(Name & Signature of member)
(to be signed only by individual / proprietor / managing partner / designated director as the case may be or the authorised signatory as on the records of the Exchange)
`},


            ]
        }

        return dd
        //  } catch (error) {
        //   console.log(error);
        //  }

    }
}
function table(data, columns,ar, ar2,ar3, ar4) {

    return {
        fontSize: 9,
        table: {
            headerRows: 1,
            widths: [10, 30, 35, 40, 30, 40, 45, 75, 40, 60],
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
        dataRow.push(row.Contact_Person_Name.toUpperCase());
        dataRow.push(row.Contact_Father_Name== null ? ' ' : row.Contact_Father_Name.toUpperCase());
        dataRow.push(row.Contact_Spouse_Name == null ? ' ' : row.Contact_Spouse_Name.toUpperCase());
        dataRow.push(row.Contact_Person_DOB == null ? ' ' : row.Contact_Person_DOB.toString().slice(0, 10).split('-').reverse().join('/'));
        dataRow.push(row.Contact_PAN == null ? ' ' : row.Contact_PAN.toUpperCase());
        dataRow.push(ar4[index]);
        dataRow.push(((row.Address_1== null ? ' ' :row.Address_1)  + ', ' + (row.Address_2== null ? ' ' :row.Address_2)  + ', ' + ar[index] + ', ' + ar2[index] + '-' + (row.Pin_Code== null ? ' ' : row.Pin_Code) + ', ' + ar3[index] +'.').toUpperCase());
        dataRow.push(row.Mobile_No== null ? ' ' :row.Mobile_No );
        dataRow.push(row.Email.toUpperCase());

        body.push(dataRow);
    });


    return body;
}