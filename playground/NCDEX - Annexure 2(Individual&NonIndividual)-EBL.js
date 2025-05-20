// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunction = require('../Common/CommonFunctions');
var path = require('path')

module.exports = {


    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let AP_Draft_Other_Details = datamodel.AP_Draft_Other_Details()
        let ConstitutionMst = datamodel.ConstitutionMst()
        let DesignationMst = datamodel.DesignationMst()
        let CountryMst = datamodel.CountryMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
        let EntityMst = datamodel.EntityMst()

        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let constitution = await dataaccess.FindOne(ConstitutionMst, { where: { Id: apData.Constitution_Id } })
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: fileParams.apId, IsRegistered: true } })
        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
        let apOther = await dataaccess.FindOne(AP_Draft_Other_Details, { where: { AP_Id: fileParams.apId } })
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
        let b;
        let add;
        if (apBranchDtls) {
            add = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)+'.').toUpperCase()
            b = (apBranchDtls.STD_Code == null ? ' ' : apBranchDtls.STD_Code) + '\n' + (apBranchDtls.Telephone_Number == null ? ' ' : apBranchDtls.Telephone_Number) + ' \n' + (apBranchDtls.FAX_Number == null ? ' ' : apBranchDtls.FAX_Number) + '\n' + (apData.Email == null ? ' ' : apData.Email.toUpperCase()) + '\n' + (apBranchDtls.Branch_Mobile_Number == null ? ' ' : apBranchDtls.Branch_Mobile_Number);
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

        let date;
        if (constitution.Constitution_Name == 'INDIVIDUAL' || constitution.Constitution_Name == 'HNI' || constitution.Constitution_Name == 'OTHER') {
            date = ' '
        } else {
            date = commonFunction.ConvertDateSlash(new Date(apData.DOB_INC))
        }
        let a;
        if (apData.Account_Name == apData.Trade_Name) {
            a = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()
        } else {
            a = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase() + ' (' + (apData.Trade_Name == null ? ' ' : apData.Trade_Name.trim().toUpperCase()) + ')';
        }

        let date1 = commonFunction.ConvertDateSlash(new Date())

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
                                        text: `Registered Office: ${entityData[0].RegisteredAddress} Tel No.: +91 79-40019900 & 79 6692 9900
                        Corporate Office: ${entityData[0].CorporateAddress} Tel No.: +91 22 4009 4400`, fontSize: 8,
                                    },
                                ]
                            },]]
                },
            },
            content: [
                `\n\n`,
                { text: `\nANNEXURE II`, bold: 'true', alignment: 'center', },
                {
                    text: [
                        {text:`\n to circular No. NCDEX/COMPLIANCE-017/2019  April 15, 2019`,alignment:'center'},
                        { text: `\n\nDetails of Authorised Person\n`,alignment: 'center',fontSize: 14, },
                    ]
                },


                {
                    style: 'tableExample',
                    table: {
                        widths: [35, 170, '*'],
                        body: [
                            [{ text: 'Sr. No.', bold: 'true', alignment: 'center' }, { text: 'Particulars', bold: 'true', alignment: 'center' }, { text: 'Details Required', bold: 'true', alignment: 'center' }],
                            [{ text: ' 1', alignment: 'center' }, 'Whether application is for existing or new Authorised Person', { text: `${d}`, bold: 'true', }],
                            [{ text: ' 2', alignment: 'center' }, 'Name of Authorised Person ', { text: `${a}`, alignment: 'justify' },],
                            [{ text: ' 3', alignment: 'center' }, 'Constitution: (Individual/Partnership/LLP/Body Corporate)',
                            { text: `${constitution.Constitution_Name == null ? ' ' : constitution.Constitution_Name.toUpperCase()} `, fontSize: 14, alignment: 'justify' },],
                            [{ text: ' 4', alignment: 'center' }, 'Nationality', { text: `INDIAN`, bold: 'true' }],
                            [{ text: ' 5', alignment: 'center' }, 'Date of Incorporation/Registration (In case of corporate/firm/LLP)', `${date}`],
                            [{ text: ' 6', alignment: 'center' }, ` Office Address Details** 


STD Code:
Telephone No.: 
 Fax No.: 
Email Address:
Mobile No. :  
`,



                            `${add}\n\n                           ${b}`],



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
                `\n** In case the Authorised Person operates from more than one location, similar details to be provided location-wise in separate annexure.`,

                { text: `\n\n\n\n (Signature & Name of Member)`, alignment: 'right'},
                {text:`\n\nDate: ${date1}`, bold: 'true', pageBreak:'before'},
                `\n\n\nTo`,
                {text:`National Commodity & Derivatives Exchange Limited`, bold: 'true'},
                
                `(Customer Service Department)
            1st floor, Akruti Corporate Park, LBS Road
            Kanjurmarg (West)
            Mumbai 400 078
            
            
            
            Dear Sir / Madam,`,
            
            {text:[
                
              `\nSub: Authorised person application of `, 
               {text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold: 'true'},
               `\n\n\n\n With reference to the above please find enclosed the following documents for registration of `, 
               {text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold:'true'}, 
                ` for appointment of authorised person in commodity segment of NCDEX:`,
             ]},
             `\n\n`,
             
                 {
                        style: 'tableExample',
                        table: {
                            widths:[40, '*'],
                            body: [
                                [{text:'Sr. No.', bold:'true', alignment:'center'},{text: 'Particulars', bold:'true', alignment:'center'}],
                                [{text:`1`, alignment:'center'}, 'Application Form for appointment of Authorised Person – Annexure I'],
                                [{text:`2`, alignment:'center'},`Details of Authorised Person duly signed by Trading Member  –  Annexure II`],
                                [{text:`3`, alignment:'center'}, `Details of the Individual / Details of Directors/Partners of Authorised Person – Annexure III`],
                                [{text:`4`, alignment:'center'}, `Shareholding/sharing pattern for Corporate/firm - Annexure IV, if application from Firm`],
                                [{text:`5`, alignment:'center'}, `Undertaking From Authorised Person- Annexure V`],
                                [{text:`6`, alignment:'center'}, `Certified true copy of PAN card of the applicant/directors/partners`],
                                [{text:`7`, alignment:'center'}, `Copy of residence address and office address proof of the applicant/directors/partners`],
                                [{text:`8`, alignment:'center'}, `Certified true copies of Education proof of the applicant/all directors/all partners`],
                            ]
                        }
                    },
                    
                    `\n\nKindly process the application of registration as Authorised Person at the earliest and acknowledge receipt.
            
            Thanking you.
            Yours Faithfully,`,
            {text:`For ${entityData[0].Entity_Name}
            
            
            
            
            
            Authorised Signatory`, bold:'true'},
            
                
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