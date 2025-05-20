// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
var commonFunction = require('../Common/CommonFunctions');

module.exports = {
    createDocDefinition: async (fileParams) => {

        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Registration_Details = datamodel.AP_Draft_Registration_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let EntityMst = datamodel.EntityMst()
        let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
        let segmentMst = datamodel.SegmentMst()
        let AP_Snapshot_General_Details = datamodel.AP_Snapshot_General_Details()
        let AP_Snapshot_Contact_Details = datamodel.AP_Snapshot_Contact_Details()
        let AP_Snapshot_Branch_Details = datamodel.AP_Snapshot_Branch_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let CountryMst = datamodel.CountryMst()
        let StateMst = datamodel.StateMst()
        let CityMst = datamodel.CityMst()


        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let apData2 = await dataaccess.FindOne(AP_Snapshot_General_Details, { where: { Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
        let param2 = { where: { AP_ID: Number(fileParams.apId) } }
        let registration = await dataaccess.FindOne(AP_Draft_Registration_Details, param2)
        let param3 = { where: { AP_Id: Number(fileParams.apId), IsActive: true } }
        let apContact = await dataaccess.FindOne(AP_Draft_Contact_Details, param3)
        let apContact2 = await dataaccess.FindOne(AP_Snapshot_Contact_Details, { where: { AP_Snapshot_Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })
        let apBrokerageDtls = await dataaccess.FindAll(AP_Draft_Brokerage_Sharing_Details, { where: { AP_Id: fileParams.apId, Exchange: 1 }, attributes: ['Segment'] })
        let str1 = apBrokerageDtls.map(e => e.Segment)
        let segmentData = await dataaccess.FindAll(segmentMst, { where: { Id: str1 }, attributes: ['Segment_Name'] })
        let str2 = segmentData.map(e => e.Segment_Name.toUpperCase()).join(', ')
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })

        let apBranch2 = await dataaccess.FindOne(AP_Snapshot_Branch_Details, { where: { AP_Snapshot_Id: Number(fileParams.apId) }, order: [['Id', 'DESC']] })

        let date = commonFunction.ConvertDateSlash_2(new Date())
        let oldName, newName, oldTrade, newTrade, oldAddress, newAddress, oldPartners, newPartners
        if (apData.Account_Name == apData2.Account_Name) {
            oldName = ''
            newName = ''
        } else {
            oldName = 'Old Account Name : ' + '\n' + apData2.Account_Name
            newName = 'New Account Name : ' + '\n' + apData.Account_Name
        }
        if (apData.Trade_Name == apData2.Trade_Name) {
            oldTrade = ''
            newTrade = ''
        } else {
            oldTrade = 'Old Trade Name : ' + '\n' + apData2.Trade_Name
            newTrade = 'New Trade Name : ' + '\n' + apData.Trade_Name
        }
        if (apContact.Contact_Person_Name == apContact2.Contact_Person_Name) {
            oldPartners = ''
            newPartners = ''
        } else {
            oldPartners = 'Old Partners Name : ' + '\n' + apContact2.Contact_Person_Name
            newPartners = 'New Partners Name : ' + '\n' + apContact.Contact_Person_Name
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
                oldAddress = ''
                newAddress = ''
            } else {
                oldAddress = 'Old Address : ' + '\n' + ((apBranch2.Address_1 == null ? ' ' : apBranch2.Address_1) + ', ' + (apBranch2.Address_2 == null ? ' ' : apBranch2.Address_2) + ', ' + (city2.City_name == null ? ' ' : city2.City_name) + ', ' + (state2.State_Name == null ? ' ' : state2.State_Name) + '-' + (apBranch2.Pin_Code == null ? ' ' : apBranch2.Pin_Code) + ', ' + (country2.Country_Name == null ? ' ' : country2.Country_Name)).toUpperCase()

                newAddress = 'New Address : ' + '\n' + ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()

            }
        }
        var dd = {
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
                `\n\n\n\n\n\n\n\n\n\n`,
                {
                    style: 'tableExample',
                    table: {
                        widths: [36, 430, 55],
                        body: [
                            [{ text: 'CHECKLIST FOR SUBMITTING DOCUMENTS FOR CHANGE IN NAME/TRADE NAME & ADDRESS OF AUTHORISED PERSON (AP) [PROPRIETORSHIP]', colSpan: 3, alignment: 'center', bold: 'true' }, {}, {}],
                            [{ text: 'Sr. No.', alignment: 'center', bold: 'true' }, { text: 'Documents Required', bold: 'true', alignment: 'center' }, { text: 'Submitted by ', bold: 'true', alignment: 'center' }],
                            [{ text: '1', alignment: 'center' }, ` Covering Letter from member requesting to change in AP Name/Trade Name/Address of AP 
     (In the prescribed format)
    `, { text: 'TM', alignment: 'center' }],

                            [{ text: '2', alignment: 'center' }, `Letter from AP requesting member for change in Name/Trade name /Address of AP. 
     (In the prescribed format)
    `, { text: 'AP', alignment: 'center' }],
                            [{ text: '3', alignment: 'center' }, ` Certified copy of new PAN CARD proof`, { text: 'AP', alignment: 'center' }],

                            [{ text: '4', alignment: 'center' }, ` Certified copy of address proof (as mentioned in our checklist of AP registration).`, { text: 'AP', alignment: 'center' }],
                        ]
                    }
                },
                { text: '\n', pageBreak: 'before' },
                `Date :  ${date}

General Manager,	
BSE Limited
Membership Operations,
P.J.Towers,
Dalal Strret, Fort,
Mumbai – 400 001.


Dear Sir/Madam

`,
                { text: `\nSub: Changes in Authorised Person details `, bold: 'true', alignment: 'center' },
                `\nWe hereby request the Exchange to make following changes in Authorised Person.

Details of Authorised Person are as follows.\n 
`,
                {
                    style: 'tableExample',
                    table: {
                        //   widths:[30,220,'*'],
                        body: [
                            [{ text: `Name of the Authorised Person`, bold: 'true' }, { text: `Trade Name of the Authorised Person`, bold: 'true' }, {
                                text: `Segment 
(Cash/ Derivative)
`, bold: 'true'
                            }, { text: `AP Registration number `, bold: 'true' }, { text: `AP Registration Date`, bold: 'true' }],
                            [{ text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: 'true' }, { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold: 'true' }, { text: `${str2}`, bold: 'true' }, { text: `${registration.RegistrationNo == null ? ' ' : registration.RegistrationNo.toUpperCase()}`, bold: 'true' }, { text: commonFunction.ConvertDateSlash_2(registration.RegistrationDate), bold: 'true' }],

                        ]
                    }
                },

                `\n\n`,
                { text: `Following changes to be made:`, bold: 'true', decoration: 'underline' },
                `\nAP Name and / AP Trade Name, Address, Partners/ Directors (mention details of changes to be made)`,
                `\n`,
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        //   widths:[30,220,'*'],
                        body: [
                            [{ text: `${oldName}`, bold: 'true' }, { text: `${newName}`, bold: 'true' },],
                            [{ text: `${oldTrade}`, bold: 'true' }, { text: `${newTrade}`, bold: 'true' },],
                            [{ text: `${oldAddress}`, bold: 'true' }, { text: `${newAddress}`, bold: 'true' },],
                            [{ text: `${oldPartners}`, bold: 'true' }, { text: `${newPartners}`, bold: 'true' },],
                        ]
                    }
                },
                `\nPlease find enclosed herewith required document as per checklist:`,


                {
                    text: `\n\n\nFor ${entityData[0].Entity_Name}




Authorised Signatory
`, bold: 'true'
                },
                `\nPlace: Mumbai`,
            ]

        }
        return dd
    }
}