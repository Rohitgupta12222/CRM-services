var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')

module.exports = {
    createDocDefinition: async (fileParams) => {
        let EntityMst = datamodel.EntityMst()
        let AP_General_Details = datamodel.AP_General_Details()
        let AP_Branch_Details = datamodel.AP_Branch_Details()
        let InvoicingProcessDetails = datamodel.InvoicingProcessDetails()
        let StateMst = datamodel.StateMst()
        let EntityGSTMst = datamodel.EntityGSTMst()
        let SegmentMst = datamodel.SegmentMst()
        let ExchangeMst = datamodel.ExchangeMst()
        let CityMst = datamodel.CityMst()
        let NeftActivationDetails = datamodel.NeftActivationDetails();
        let AP_Bank_Details = datamodel.AP_Bank_Details()




        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let entityGst = await dataaccess.FindAll(EntityGSTMst, { limit: 1, order: [['Id']] })
        let param1 = { where: { Id: Number(fileParams.apId),IsActive: true } }
        let neftBankDtls = await dataaccess.FindAll(NeftActivationDetails, param1)

        let param = { where: { Id: Number(fileParams.apId), Process_Id: 2 } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param4 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true, Process_Id: 2 } }
        let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, param4)
        let param5 = { where: { AP_Id: Number(fileParams.apId), Process_Id: 2, Is_Default: true } }
        let apBankDtls = await dataaccess.FindOne(AP_Bank_Details, param5)
        let invoice = await dataaccess.FindOne(InvoicingProcessDetails, { where: { Id: Number(fileParams.invoiceId) } })
        let a, x, y, z, p, q, r, s
        if (invoice) {
            a = invoice.Segment == null ? ' ' : invoice.Segment
            x = invoice.Exchange == null ? ' ' : invoice.Exchange
            y = invoice.StateId == null ? ' ' : invoice.StateId
            z = invoice.Code == null ? ' ' : invoice.Code
            p = invoice.AccountCode == null ? ' ' : invoice.AccountCode
            q = invoice.BrokerageAmount == null ? ' ' : parseFloat(invoice.BrokerageAmount).toFixed(2);
            // q = invoice.BrokerageAmount == null ? ' ' : invoice.BrokerageAmount
            r = invoice.CGST == null ? ' ' : invoice.CGST
            s = invoice.SGST == null ? ' ' : invoice.SGST
        } else {
            a = ' '
            x = ' '
            y = ' '
            z = ' '
            p = ' '
            q = ' '
            r = ' '
            s = ' '
        }

        let segment = {};
        if (a && invoice) {
            segment = await dataaccess.FindOne(SegmentMst, { where: { Id: invoice.Segment } })
        } else {
            segment.Segment_Alias = ' ';
        }
        let exchange = {};
        if (x && invoice) {
            exchange = await dataaccess.FindOne(ExchangeMst, { where: { Id: invoice.Exchange } })
        } else {
            exchange.Exchange_Name = ' ';
        }
        let state = {};
        if (y && invoice) {
            state = await dataaccess.FindOne(StateMst, { where: { Id: invoice.StateId } })
        } else {
            state.State_Name = ' ';
        }
        let city = {};
        let state1 = {};
        if (apBranchDtls) {
            if (apBranchDtls.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
            } else {
                city.City_name = ' ';
            }
            if (apBranchDtls.State_Code) {
                state1 = await dataaccess.FindOne(StateMst, { where: { Id: apBranchDtls.State_Code } })
            } else {
                state1.State_Name = ' ';
            }
        }
        let b;
        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ' ,' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state1.State_Name == null ? ' ' : state1.State_Name) + '- ' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code)).toUpperCase()
                ;
        } else {
            b = '';
        }
        let startDate, last_Date, lastDate, word
        if (invoice) {
            startDate = commonFunction.MonthDateFormatter(invoice.MonthYear)
            lastDate = commonFunction.lastday(invoice.MonthYear);
            last_Date = commonFunction.last_day(invoice.MonthYear)
            word = commonFunction.number2text(parseFloat(invoice.BrokerageAmount).toFixed(2));
            // word = commonFunction.number2text(invoice.BrokerageAmount);
        } else {
            startDate = ' '
            lastDate = ' '
            last_Date = ' '
            word = ' '
        }
        let accName, panNo
        if (apData) {
            accName = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()
            panNo = apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()
        } else {
            accName = ' '
            panNo = ' '
        }
let bankName, accNo, IFSC
        if(apBankDtls){
            bankName = apBankDtls.Bank_Name == null ? ' ' : apBankDtls.Bank_Name.toUpperCase()
            accNo= apBankDtls.Bank_Ac_Number == null ? ' ' : apBankDtls.Bank_Ac_Number.toUpperCase()
            IFSC = apBankDtls.IFSC_Code == null ? ' ' : apBankDtls.IFSC_Code.toUpperCase()
        }else{
            bankName= ' '
            accNo = ' '
            IFSC = ' '
        }
        // console.log(word)
        var dd = {
            content: [
                {
                    text: [
                        { text: `${accName}`, bold: 'true', alignment: 'center' },
                        '\n\n\n\n\n',
                        { text: `Date: `, bold: 'true' },
                        `${last_Date}`,
                        { text: `\n\nTo:`, bold: 'true' },
                        `\n${entityData[0].Entity_Name} - ${exchange.Exchange_Name} ${segment.Segment_Alias}
${entityData[0].CorporateAddress}`,

                    ]
                },
                `\n\n`,
                {
                    style: 'tableExample',
                    table: {
                        widths: [350, 150],
                        body: [
                            [{ colSpan: 2, text: `BILL`, bold: 'true', alignment: 'center' }, ``],
                            [{ text: 'Particulars', alignment: 'center', bold: 'true', border: [true, true, true, true] }, { text: 'Amount (Rs.)', bold: 'true', alignment: 'center', border: [true, true, true, true] }],
                            [{
                                text: `
                    Professional Charges for the period ${startDate} to ${lastDate}`, border: [true, true, true, false]
                            }, {
                                text: `
                    ${q}`, alignment: 'center', border: [true, true, true, false]
                            }],
                            [{
                                text: `Your reference: Code:${p}





`, border: [true, false, true, true]
                            }, { text: ``, border: [true, false, true, true] }],
                            ['Total', { text: `${q}`, alignment: 'center' }],

                            [{ text: ' ', border: [true, true, false, true] }, { text: ' ', border: [false, true, true, true] }],
                            [{ text: `${word}`, border: [true, true, false, true] }, { text: '', border: [false, true, true, true] }],
                            [{ text: '', border: [false, false, false, false] }, {
                                text: `
				
				
				
				
				
						For ${accName}`, alignment: 'right', border: [false, false, false, false]
                            }],
                            [{ text: '', border: [false, false, false, false] }, {
                                text: `
				
				
	Authorised signatory`, alignment: 'right', border: [false, false, false, false]
                            }],


                        ]
                    }
                },

                {
                    text: `\n
Bank Name    : ${bankName}

Bank A/c No. : ${accNo}

IFSC Code      : ${IFSC}

PAN No.         : ${panNo}
`,
                },

            ]

        }
        return dd
    }
}