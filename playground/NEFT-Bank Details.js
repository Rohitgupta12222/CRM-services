var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')


module.exports = {


    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let CountryMst = datamodel.CountryMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let EntityMst = datamodel.EntityMst()
        let NeftActivationDetails = datamodel.NeftActivationDetails();


        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let param1 = { where: { Id: Number(fileParams.apId), IsActive: true } }
        let neftBankDtls = await dataaccess.FindOne(NeftActivationDetails, param1)
        // console.log('dddd', neftBankDtls)
        let param4 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } }
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, param4)
        console.log('ffff', apBranchDtls)
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
        if (apBranchDtls) {
            b = ' and '+ ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name) + '.').toUpperCase()
                ;
        } else {
            b = '';
        }
        let p, q=[], r=[], s=[], t=[], u=[], v=[]
        if (neftBankDtls) {
            p = neftBankDtls.BankName == null ? ' ' : neftBankDtls.BankName.toUpperCase()
            q = neftBankDtls.AccountNo == null ? ' ' : neftBankDtls.AccountNo.toUpperCase()
            r = neftBankDtls.Name == null ? ' ' : neftBankDtls.Name.toUpperCase()
            s = neftBankDtls.AccountType == null ? ' ' : neftBankDtls.AccountType.toUpperCase()
            t = neftBankDtls.Branch == null ? ' ' : neftBankDtls.Branch.toUpperCase()
            u = neftBankDtls.IFSC == null ? ' ' : neftBankDtls.IFSC.toUpperCase()
            v = neftBankDtls.IFSC == null ? ' ' : neftBankDtls.IFSC.toUpperCase()
        }else{
            p = ' '
            q = ' '
            r = ' '
            s = ' '
            t = ' '
            u = ' '
            v = ' '
        }
        let date = commonFunc.ConvertDateSlash(new Date())
        var dd = {

            content: [
                `\n\n\n\n`,

                {
                    style: 'tableExample',

                    table: {
                        body: [
                            [{ text: ` Check list for AP Bank Details Mapping`, bold: 'true', alignment: 'center', fontSize: 20, margin: [10, 12, 10, 12] }],
                            [{ text: `1. Fill up all the required details in RTGS/NEFT Application form with Bank Stamp and Bank Seal.`, fontSize: 15 }],
                            [{ text: `    OR`, bold: 'true', fontSize: 15, alignment: 'center', margin: [6, 10, 10, 6] }],
                            [{ text: `2. Fill up all the required details in RTGS/NEFT Application form and submit the Original Cheque.`, fontSize: 15 }],

                        ]
                    }
                },

                { text: `\n`, pageBreak: 'before' },


                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        widths: [270, 30,'*'],
                        body: [
                            [{ text: `Date:  ${date}`, bold: 'true', fontSize: 9, alignment: 'left' },{ text: `From: `, alignment: 'right', bold: 'true', fontSize: 9 }, { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}${b}`, fontSize: 9, alignment: 'left' },]
                        ]
                    }
                },
                // { text: `From: `, alignment: 'right', bold: 'true', fontSize: 9 }, 
                {
                    text: [
                        
                        {
                            text: `\n\nTo, 
 Accounts Department –Ops.`, fontSize: 9
                        },
                        { text: `\n${entityData[0].Entity_Name}`, bold: 'true', fontSize: 9 },
                        {
                            text: `\n5th Floor, Tower 3, Wing B, Kohinoor City Mall,
Kohinoor City,Kirol Road, Kurla(W)

Dear Sir, 
`, fontSize: 9
                        },

                        { text: `\nSub : Authorization/Mandate to remit amount electronically into my/ our bank account`, alignment: 'center', decoration: 'underline', bold: 'true', fontSize: 9 },

                        {
                            text: `\n\nThis has reference to my/ours Remissor / Authorized Person / Sub-broker / BDA account number _____________ maintained with you. 

I/We hereby at my/our entire costs and risk, irrevocably, authorize`, fontSize: 9
                        }, { text: ` ${entityData[0].Entity_Name}`, bold: 'true', fontSize: 9 }, {
                            text: ` to credit my/ours Current/ Savings/etc bank account number as per details tabulated below through Net Banking, RTGS, NEFT etc. for all payments / funds payout  which may become payable  to me/us . I/We confirm that I/We am/are the first holder & bonafide owner of below mentioned bank account.
`, fontSize: 9
                        },

                        { text: `\nBank Details to be filled by Remissor / Authorized Person / Sub-broker / BDA`, bold: 'true', fontSize: 9 },


                    ]
                },

                {
                    style: 'tableExample',
                    fontSize: 9,
                    table: {
                        widths: [250, '*'],
                        body: [
                            [{ text: `Bank Name` }, `${p}`],
                            [{ text: `Bank Account Number (All digits / alphanumeric)` }, `${q} `],
                            [{ text: `Name of Bank Account Holder` }, `${r}`],
                            [{ text: `Account Type (Current / Savings / Etc)` }, `${s}`],
                            [{ text: `Branch Address` }, `${t}`],
                            [{ text: `IFSC Code (11 Digits-for RTGS to be obtained from the bank)` }, `${u}`],
                            [{ text: `IFSC Code (11 Digit-for NEFT to be obtained from the bank)` }, `${v}`],

                        ]
                    }
                },

                { text: `\nI/We am/are enclosing a canceled cheque as proof for your reference and record (refer note 1) `, bold: 'true', fontSize: 9 },
                { text: `\nI/We am/are aware & understand the risks associated with electronic transfer of funds & hereby irrevocably indemnify  Edelweiss Broking Ltd. from all liabilities/ losses resulting either from delay in crediting of payments / funds payout and / or non-execution of such electronic credit payment instruction related thereto and/or otherwise on account of any other reason/s. I/We further declare & undertake that I/We shall not have any claim/s against Edelweiss Stock Broking Ltd. Upon each of the said constituent acting upon this authorization/mandate.  `, fontSize: 9 },
                { text: `\nThanking you,                                                                                                    	We confirm Bank details mentioned above (refer note 1) `, fontSize: 9, bold: true },
                { text: `\n\nSignature of`, bold: true, fontSize: 9 },
                { text: `\nRemissor/Authorized Person/Subbroker/BDA	                                                        Signature & Stamp/Seal of Bank Authority `, fontSize: 9, bold: true },
                {
                    text: `\nMobile Number  : ${apData.Mobile_Number == null ?' ': apData.Mobile_Number}


Email id              : ${apData.Email == null ?' ': apData.Email}
`, bold: true, fontSize: 9
                },
                {
                    text: [
                        { text: `\nNote 1:`, bold: true, fontSize: 9 }, { text: ` In case (a) the name of Remissor / Authorized Person / Sub-broker / BDA / Intermediary as account holder OR (b) IFSC code OR (c) bank account number `, fontSize: 9 }, { text: ` is not printed / stamped on the canceled cheque enclosed `, decoration: 'underline', fontSize: 9 }, { text: ` as documentary proof, `, fontSize: 9 }, { text: ` then along with the canceled cheque copy, bank authority’s signature and stamp / seal is also required on this form / letter`, decoration: 'underline', fontSize: 9 },
                    ]
                },





            ]
        }
        return dd
    }
}
