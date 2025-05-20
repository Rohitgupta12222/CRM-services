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
        let AP_Bank_Details = datamodel.AP_Bank_Details()
        let SegmentMst = datamodel.SegmentMst()
        let ExchangeMst = datamodel.ExchangeMst()
        let CityMst = datamodel.CityMst()
        let NeftActivationDetails = datamodel.NeftActivationDetails();



        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let entityGst = await dataaccess.FindOne(EntityGSTMst, { limit: 1, order: [['Id']] })
        let param1 = { where: { Id: Number(fileParams.apId), IsActive: true } }
        let neftBankDtls = await dataaccess.FindAll(NeftActivationDetails, param1)
        let param = { where: { Id: Number(fileParams.apId), Process_Id: 2 } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param4 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true, Process_Id: 2 } }
        let apBranchDtls = await dataaccess.FindOne(AP_Branch_Details, param4)
        let param5 = { where: { AP_Id: Number(fileParams.apId), Process_Id: 2, Is_Default: true } }
        let apBankDtls = await dataaccess.FindOne(AP_Bank_Details, param5)
        let invoice = await dataaccess.FindOne(InvoicingProcessDetails, { where: { Id: Number(fileParams.invoiceId) } })
        console.log('b', invoice)
        let a, x, y, z, p, q , gst, entitygst
        if (invoice) {
            a = invoice.Segment == null ? ' ' : invoice.Segment
            x = invoice.Exchange == null ? ' ' : invoice.Exchange
            y = invoice.StateId == null ? ' ' : invoice.StateId
            z = invoice.Code == null ? ' ' : invoice.Code
            p = invoice.AccountCode == null ? ' ' : invoice.AccountCode
            q = invoice.BrokerageAmount == null ? ' ' : parseFloat(invoice.BrokerageAmount).toFixed(2)
            // q = invoice.BrokerageAmount == null ? ' ' : invoice.BrokerageAmount
            gst = invoice.AP_GST_Number == null ? ' ' : invoice.AP_GST_Number
            entitygst = invoice.Entity_GST_Number == null ? ' ' : invoice.Entity_GST_Number

        } else {
            a = ' '
            x = ' '
            y = ' '
            z = ' '
            p = ' '
            q = ' '
            gst = ' '
            entitygst = ' '
        }

        console.log('a', a)
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
            // let g = apData.Account_Name.toUpperCase()
        } else {
            state.State_Name = ' '
            state.StateCode = ' '
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

        let accName, panNo
        if (apData) {
            accName = apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()
            panNo = apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()
        } else {
            accName = ' '
            panNo = ' '
        }
        let bankName, accNo, IFSC
        if (apBankDtls) {
            bankName = apBankDtls.Bank_Name == null ? ' ' : apBankDtls.Bank_Name.toUpperCase()
            accNo = apBankDtls.Bank_Ac_Number == null ? ' ' : apBankDtls.Bank_Ac_Number.toUpperCase()
            IFSC = apBankDtls.IFSC_Code == null ? ' ' : apBankDtls.IFSC_Code.toUpperCase()
        } else {
            bankName = ' '
            accNo = ' '
            IFSC = ' '
        }
        let intraday, r, total,roundtotal, word
        if (invoice && invoice.State_Type == 'Intra State') {
            intraday = ` CGST @ 9.00 %
            
            SGST @ 9.00 %` + '\n'

            r = (invoice.CGST == null ? ' ' : parseFloat(invoice.CGST).toFixed(2)) + '\n\n' + (invoice.SGST == null ? ' ' : parseFloat(invoice.SGST).toFixed(2))
            // r = (invoice.CGST == null ? ' ' : invoice.CGST) + '\n\n' + (invoice.SGST == null ? ' ' : invoice.SGST)
            total = (parseFloat((invoice.BrokerageAmount == null ? '0' : invoice.BrokerageAmount)) + parseFloat((invoice.SGST == null ? '0' : invoice.SGST)) + parseFloat((invoice.CGST == null ? '0' : invoice.CGST)))
            roundtotal = parseFloat(total).toFixed(2);
            word = commonFunction.number2text(roundtotal);

        } else if (invoice && invoice.State_Type == 'Inter State') {
            intraday = `IGST @ 18.00 %` + '\n\n'
            r = invoice.IGST == null ? ' ' : parseFloat(invoice.IGST).toFixed(2)
            total = (parseFloat((invoice.BrokerageAmount == null ? '0' : invoice.BrokerageAmount)) + parseFloat((invoice.IGST == null ? '0' : invoice.IGST)))
            roundtotal = parseFloat(total).toFixed(2);
            word = commonFunction.number2text(roundtotal);

        } else {
            intraday = ' '
            r = ' '
            total = ' '
            word = ' '
        }

        let startDate, last_Date, lastDate
        if (invoice) {
            startDate = commonFunction.MonthDateFormatter(invoice.MonthYear)
            lastDate = commonFunction.lastday(invoice.MonthYear);
            last_Date = commonFunction.last_day(invoice.MonthYear)
            // console.log(total)
        } else {
            startDate = ' '
            lastDate = ' '
            last_Date = ' '

        }

        // console.log(word)
        var dd = {

            content: [

                {
                    text: [

                        { text: `${accName}\n`, bold: 'true', alignment: 'center', fontSize: 12 },
                        { text: ` ${b}\n`, bold: 'true', alignment: 'center', fontSize: 10 },
                        { text: ` GSTIN: ${gst}\n`, bold: 'true', alignment: 'center', fontSize: 10 },
                        { text: `TAX INVOICE UNDER SECTION 31 OF GST ACT\n`, bold: 'true', alignment: 'center', fontSize: 10 },
                        { text: ` ORIGINAL FOR RECEPIENT\n`, bold: 'true', alignment: 'center', fontSize: 10 },

                        {
                            text: `               
To,
${entityData[0].Entity_Name}
`, fontSize: 10
                        },



                        { text: `Date: `, bold: 'true', alignment: 'right', fontSize: 10 }, `  ${last_Date}`,
                        { text: `\nInvoice No:`, bold: 'true', alignment: 'right', fontSize: 10 }, ` ${z}`,

                        { text: `\nYour Ref: `, bold: 'true', alignment: 'right', fontSize: 10 }, `  ${p}`,

                        {
                            text: `\n\nPlace of Supply: ${state.State_Name == null ? ' ' : state.State_Name} State Code: ${state.StateCode == null ? ' ' : state.StateCode}
Receiver's GSTIN: ${entitygst}
\n\n`, fontSize: 10
                        },

                    ]
                },

                {
                    style: 'tableExample',
                    fontSize: 10,
                    table: {
                        widths: [400, '*'],
                        body: [
                            [{ text: `Particulars`, alignment: 'center', bold: 'true' }, { text: `Amount (Rs.)`, alignment: 'center', bold: 'true' }],
                            [`Brokerage Sharing - ${exchange.Exchange_Name} ${segment.Segment_Alias} - ${startDate} TO ${lastDate}
                            
                            ${intraday}
                            `, {
                                text: `${q}
                            
                             ${r}`, alignment: 'center'
                            }],
                            // [{ text: `${intraday}`, border: [true, true, true, true], }, { text: `${r}`, alignment: 'center', border: [true, false, true, true] }],
                            ['Total', { text: `${roundtotal} `, alignment: 'center' }],
                            [{ text: `\n`, border: [true, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [{ text: `${word} `, border: [true, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],



                        ]
                    }
                },

                {
                    text: `\n\n\n\n\n\nFor ${accName}

Authorised signatory

`, alignment: 'right', fontSize: 10
                },

                {
                    text: `\n
                Bank Name    : ${bankName}

                Bank A/c No. : ${accNo}

                IFSC Code      : ${IFSC}

                PAN No.         : ${panNo}
                `, fontSize: 10
                },

            ]
        }
        return dd
    }
}