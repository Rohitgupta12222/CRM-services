var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')


module.exports = {


    createDocDefinition: async (fileParams) => {
        let EntityMst = datamodel.EntityMst()
        let AP_General_Details = datamodel.AP_General_Details()
        let CountryMst = datamodel.CountryMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
        let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
        let AP_Brokerage_Sharing_Details = datamodel.AP_Brokerage_Sharing_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let AP_Branch_Details = datamodel.AP_Draft_Branch_Details()

        let apBrokerage = await dataaccess.FindAll(AP_Draft_Brokerage_Sharing_Details, { where: { AP_Id: Number(fileParams.apId) } })
        let apBrokerage2 = await dataaccess.FindOne(AP_Brokerage_Sharing_Details, { where: { AP_Id: Number(fileParams.apId) } })
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_General_Details, param)
        let param4 = { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } }
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, param4)
        let date = commonFunc.ConvertDateSlash(new Date())
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
        let b, code
        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name) + '.').toUpperCase()
                ;
            code = apBranchDtls.AP_Code == null ? ' ' : apBranchDtls.AP_Code
        } else {
            b = '';
            code = ' '
        }

        let apBranch, apGeneral;
        if (apBrokerage2 && apBrokerage2.Introducer_Code) {
            apBranch = await dataaccess.FindOne(AP_Branch_Details, { where: { AP_Code: '${apBrokerage2.Introducer_Code}', IsRegistered: true } })
        } else {
            apBranch = ' '
        }
        if (apBranch && apBranch.AP_Id) {
            apGeneral = await dataaccess.FindOne(AP_General_Details, { where: { Id: apBranch.AP_Id } })
        } else {
            apGeneral = ' '
        }


        let x = [], x1 = [], x2 = [], x3 = [], x4 = [], x5 = [], x6 = [], x7 = [], x8 = [], x9 = [], x10 = [], x11 = [], x12 = [], x13 = [], x14 = [], x15 = []
        let y = [], z = [], h = [], k = [], l = [], m = [], n = [], o = [], p = [], q = [], r = [], s = [], t = [], u = [], v = [], w = [], y1 = [], z1 = [], h1 = [], k1 = [], l1 = [], m1 = [], n1 = [], o1 = [], p1 = [], q1 = [], r1 = [], s1 = [], t1 = [], u1 = [], v1 = [], w1 = []

        let operation = apBrokerage.map(e => {
            if (e.Exchange == 4 && e.Segment == 1 && e.Delivery_Type == 1 && e.Instrument_Type == 1) {  //Equity Cash – Delivery ----NSE Cash
                x = e.Sharing_Amount_Per_Crore
                y += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                z += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 5 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Equity Cash – Delivery ----NSE SLBM 
                x1 = e.Sharing_Amount_Per_Crore
                h += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                k += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 1 && e.Segment == 1 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Equity Cash – Delivery ----BSE CASH
                x2 = e.Sharing_Amount_Per_Crore
                l += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                m += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 1 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Equity Cash - Intraday ----NSE CASH
                x3 = e.Sharing_Amount_Per_Crore
                n += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                o += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 1 && e.Segment == 1 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Equity Cash - Intraday ----BSE CASH
                x4 = e.Sharing_Amount_Per_Crore
                p += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                q += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 2 && e.Instrument_Type == 2) { //Equity Intraday Derivatve ----NSE FO
                x5 = e.Sharing_Amount_Per_Crore
                r += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                s += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 1 && e.Instrument_Type == 2) { //Currency Futures ----NSE CD
                x6 = e.Sharing_Amount_Per_Crore
                t += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                u += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 1 && e.Instrument_Type == 2) { //Currency Futures ----MSEI CD
                x7 = e.Sharing_Amount_Per_Crore
                v += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                w += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 1 && e.Instrument_Type == 3) { //Options ----NSE F&O DELIVERY 
                x8 = e.Sharing_Amount_Per_Crore
                y1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                z1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----NSE FO OPTION 
                x9 = e.Sharing_Amount_Per_Crore
                h1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                k1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----NSE CD OPTION
                x10 = e.Sharing_Amount_Per_Crore
                l1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                m1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----MSEI CD OPTION
                x11 = e.Sharing_Amount_Per_Crore
                n1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                o1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 2 && e.Segment == 2 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Commodites – Intraday/Setlement ----MCX
                x12 = e.Sharing_Amount_Per_Crore
                p1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                q1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 3 && e.Segment == 2 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Commodites – Intraday/Setlement ----NCDEX
                x13 = e.Sharing_Amount_Per_Crore
                r1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                s1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 2 && e.Segment == 2 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Commodites – Delivery ----MCX
                x14 = e.Sharing_Amount_Per_Crore
                t1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                u1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 3 && e.Segment == 2 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Commodites – Delivery ----NCDEX
                x15 = e.Sharing_Amount_Per_Crore
                v1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                w1 += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Sharing_Percentage) + '%\n'
            }
        })
        await Promise.all(operation)
        console.log('x7', x7)
        console.log('t', t)
        console.log('u', u)

        let xa = [], xb = [], xc = [], xd = [], xe = [], xf = [], xg = [], xh = [], xi = [], xj = [], xk = [], xl = [], xm = [], xn = [], xo = [], xp = []
        let ya = [], za = [], ha = [], ka = [], la = [], ma = [], na = [], oa = [], pa = [], qa = [], ra = [], sa = [], ta = [], ua = [], va = [], wa = [], y1a = [], z1a = [], h1a = [], k1a = [], l1a = [], m1a = [], n1a = [], o1a = [], p1a = [], q1a = [], r1a = [], s1a = [], t1a = [], u1a = [], v1a = [], w1a = []

        let authorised = apBrokerage.map(e => {
            if (e.Exchange == 4 && e.Segment == 1 && e.Delivery_Type == 1 && e.Instrument_Type == 1) {  //Equity Cash – Delivery ----NSE Cash
                xa = e.Int_Sharing_Amount_Per_Crore
                ya += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Sharing_Percentage + '%\n'
                za += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 5 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Equity Cash – Delivery ----NSE SLBM 
                xb = e.Int_Sharing_Amount_Per_Crore
                ha += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                ka += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 1 && e.Segment == 1 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Equity Cash – Delivery ----BSE CASH
                xc = e.Int_Sharing_Amount_Per_Crore
                la += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                ma += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 1 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Equity Cash - Intraday ----NSE CASH
                xd = e.Int_Sharing_Amount_Per_Crore
                na += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                oa += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 1 && e.Segment == 1 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Equity Cash - Intraday ----BSE CASH
                xe = e.Int_Sharing_Amount_Per_Crore
                pa += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                qa += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 2 && e.Instrument_Type == 2) { //Equity Intraday Derivatve ----NSE FO
                xf = e.Int_Sharing_Amount_Per_Crore
                ra += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                sa += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 1 && e.Instrument_Type == 2) { //Currency Futures ----NSE CD
                xg = e.Int_Sharing_Amount_Per_Crore
                ta += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                ua += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 1 && e.Instrument_Type == 2) { //Currency Futures ----MSEI CD
                xh = e.Int_Sharing_Amount_Per_Crore
                va += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                wa += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 1 && e.Instrument_Type == 3) { //Options ----NSE F&O DELIVERY 
                xi = e.Int_Sharing_Amount_Per_Crore
                y1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                z1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 4 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----NSE FO OPTION 
                xj = e.Int_Sharing_Amount_Per_Crore
                h1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                k1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----NSE CD OPTION
                xk = e.Int_Sharing_Amount_Per_Crore
                l1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                m1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 4 && e.Segment == 3 && e.Delivery_Type == 2 && e.Instrument_Type == 3) { //Options ----MSEI CD OPTION
                xl = e.Int_Sharing_Amount_Per_Crore
                n1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                o1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 2 && e.Segment == 2 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Commodites – Intraday/Setlement ----MCX
                xm = e.Int_Sharing_Amount_Per_Crore
                p1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                q1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 3 && e.Segment == 2 && e.Delivery_Type == 2 && e.Instrument_Type == 1) { //Commodites – Intraday/Setlement ----NCDEX
                xn = e.Int_Sharing_Amount_Per_Crore
                r1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                s1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 2 && e.Segment == 2 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Commodites – Delivery ----MCX
                xo = e.Int_Sharing_Amount_Per_Crore
                t1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                u1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            } else if (e.Exchange == 3 && e.Segment == 2 && e.Delivery_Type == 1 && e.Instrument_Type == 1) { //Commodites – Delivery ----NCDEX
                xp = e.Int_Sharing_Amount_Per_Crore
                v1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + e.Introducer_Sharing_Percentage + '%\n'
                w1a += e.From_Brokerage + '-' + e.To_Brokerage + ' ' + (100 - e.Introducer_Sharing_Percentage) + '%\n'
            }
        })
        await Promise.all(authorised)
        var dd = {

            content: [

                {
                    text: [

                        { text: `MEMORANDUM OF UNDERSTANDING`, alignment: 'center', bold: true },

                        { text: ` \n\n\nTHIS MEMORANDUM OF UNDERSTANDING `, bold: true }, ` (“the`, { text: ` MoU `, bold: true }, `”)`,
                        ` entered is made
At __________ this________ day of_____________________ , 20___ between;`,
                        { text: `\n${entityData[0].Entity_Name},`, bold: true }, ` incorporated under the Companies Act, 1956 and having
its Registered Office situated at ${entityData[0].RegisteredAddress}, and Corporate Office at
${entityData[0].CorporateAddress}, hereinafter 
called`, { text: ` “${entityData[0].Entityshort_Name == null ? ' ':entityData[0].Entityshort_Name}”`, bold: true }, ` or `, { text: ` “the Stock Broker”`, bold: true }, ` or `, { text: ` “Trading Member”`, bold: true },
                        ` (which terms and 
expression shall, unless it be repugnant or contrary to the context thereof, mean and 
include its successors and permitted assigns) of the`, { text: `  FIRST PART;`, bold: true },
                        { text: `\n AND`, bold: true },
                        `\nMr/Mrs./M/s`, { text: ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()} `, decoration: 'underline', bold: 'true' }, `, a individual / partnership firm / Karta
of HUF / LLP / body corporate having his / her / its resident / registered office address
at`, { text: ` ${b} `, decoration: 'underline' }, `herein after referred to
as `, { text: ` “Authorised Person”`, bold: true }, ` (which term or expression shall, unless it be repugnant to the
meaning or context thereof, mean and include, where the Authorized Person is an
individual, his / her heirs, executors and administrators, were the Authorised person is a
partnership firm, the partners of the said firm, the survivors or survivor of them and 
their respective heirs, executors, administrators and assigns where the Authorised
Person is the Karta of a Hindu Undivided Family (HUF) and the borrowing is for the
purposes of the HUF, the member or members for the time being of the said HUF, and 
them / their respective heirs, executors and administrators, where the Authorised Person
is a company, its successors in title and assigns, where the Authorised Person is a
Limited Liability Partnership (LLP), its successors in interest and assigns) of the`, {
                            text: `  SECOND
PART;`, bold: true
                        },
                        `\n\n(The Stock Broker and the Authorised Person are individually referred to as the
Party and collectively as the Parties).
`,
                    ]
                }, /////first



                { text: `\nWHEREAS\n\n`, bold: true, pageBreak: 'before' },
                {

                    style: 'tableExample',

                    layout: 'noBorders',

                    table: {



                        widths: [20, '*'],

                        body: [
                            [{ text: `1.`, bold: 'true' }, {
                                text: [{ text: `“${entityData[0].Entityshort_Name== null ?' ': entityData[0].Entityshort_Name}”`, bold: 'true' }, ` is holding memberships of the National Stock Exchange of India Limited 
(NSE), Bombay Stock Exchange Limited (BSE), Multi Commodity Exchange of 
India Limited (MCX), Metropolitan Stock Exchange of India (MSEI), 
National Commodity and Derivatives Exchange Limited (NCDEX), 
NCDEXe Markets Limited (NeML) and is registered with the Securities and 
Exchange Board of India (hereinafter referred to as SEBI) bearing SEBI 
registration No. ${entityData[0].SebiRegistrationNo == null ?' ':entityData[0].SebiRegistrationNo}. `]
                            }],
                            [{ text: `2.` }, {
                                text: [`Mr/Mrs./M/s`, { text: ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()} `, decoration: 'underline', bold: 'true' }, `has / have desired to be 
associated with EBL as an Authorised Person of EBL on various 
Exchange/s and has / have desired to enter into this MoU for soliciting 
his / her / its clients respectively for EBL and Mr / Mrs. / M/s has / 
have also forwarded his / her / its application/s as Authorised Person to 
EBL, who in turn has / have submitted the same to the concerned 
Exchange pursuant to the Trading Member – Authorised Person 
agreement respectively entered into between EBL and Mr/Mrs./M/s`,
                                    { text: ` ${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()} `, decoration: 'underline', bold: 'true' }, `.
`]
                            }],

                            // [{ text: ` `, bold: 'true',alignment: 'center'},{text:` is/will be transacting business through me and funds & securities of the clients shall be settled directly between stock brokers and client and all documents like contract note, statement of funds and securities would be issued to client by us. Authorised person may provide administrative assistance in procurement of documents and settlement, but will not issue any contract notes / statements to client in its own name. No fund/securities of clients will go to account of authorized person. I/We further confirm that, authorised person will not charge any amount as brokerage from the clients.`,border: [false, false, false, false]}],

                            [{ text: `3.`, bold: 'true' }, {
                                text: `EBL and the Authorised Person has /have, also as of the ___ day of 
_____ 20__, executed the Trading Member – Authorised Person 
Agreement inter-alia dealing with the scope of the activates, 
responsibilities, confidentiality and information, commission sharing 
termination etc.` }]
                        ]



                    }

                },

                {
                    text: `\nNOW THIS MoU WITNESSETH HEREWITH AND IT IS HEREBY AGREED BY 
AND BETWEEN THE PARTIES HERETO AS UNDER:-`, bold: true, pageBreak: 'before'
                },
                {

                    style: 'tableExample',

                    layout: 'noBorders',

                    table: {

                        widths: [20, '*'],

                        body: [

                            [{ text: `A.`, bold: 'true' }, {
                                text: [{ text: `CTCL / Terminal Facility `, bold: true }, `\nEBL at its absolute discretion may make CTCL / Terminal facility available to
the Authorized Person. However, required certification shall have to be
arranged by the Authorized Person, there for and also Authorized Person shall 
at his / her / its own expenses arrange for all lines cabling, software
equipment’s and other communication facilities including Voice Recording 
System (for trade confirmation) as may be required. The Authorized Person
undertakes to pay any such License Fees / Charges / Royalties as may be
levied by DOT / MTNL / the Trading Member / any other Regulatory / 
Statutory Authorities from time to time. The Fees if any payable to EBL, for
using the CTCL facility shall be paid in advance. The Annual Charges and
other Maintenance Costs of Hardware and Software shall be borne by
the Authorised Person. The Authorised Person shall ensure that the 
Connectivity of the CTCL facility is as per Exchange’s requirement and 
Department of Tele communication (DOT) and/or MTNL/BSNL/any other 
service provider and / or any other appropriate governmental / statutory 
authority approved network diagram and that the Authorized Person shall
produce the necessary approvals to EBL in order to meet one of its 
requirements for enabling the Authorized Person for having access to the CTCL
facility.
`]
                            }],
                            [{ text: `B.`, bold: 'true' }, {
                                text: [{ text: `Initial Deposit`, bold: true }, {
                                    text: [`\n\ni. The Authorised Person has / have given an Initial Interest Free deposit
amounting to Rs. _________________/-(Rupees
_____________________________ Only) to EBL, vide cheque / Pay order/ 
Demand Draft / NEFT, (details of which are as under) and/or in the form of 
securities as acceptable to EBL (subject to the applicable haircut & valuation 
method) as stated in Annexure of this MoU hereto attached & marked as`, { text: `\nAnnexure -1;\n\n\n`, bold: true }]
                                }]
                            }],

                            [``, {
                                style: 'tableExample',

                                table: {
                                    widths: [50, 80, 185, 80],
                                    heights: [25, 25],
                                    body: [
                                        [{ text: `Date`, bold: true, alignment: 'center' }, { text: `Bank Name`, bold: true, alignment: 'center' }, {
                                            text: `Cheque / Pay Oder/ Demand 
Draft no.
and name of `, bold: true, alignment: 'center'
                                        }, { text: `Amount`, bold: true, alignment: 'center' }],
                                        [``, ``, ``, ``],


                                    ],
                                }
                            },],
                            [{}, {
                                text: [`\nii. The Authorized Person has/have also pledged and / or shall pledge in 
favour of EBL the Securities as security deposit or alternatively Authorised 
Person shall transfer the shares given as security deposit in EBL’s beneficiary 
account simultaneously on signing of this MoU. It is further agreed by and 
between the Parties that with a view to enable the Authorized Person to 
provide services to his/her/its clients, EBL may also allow limits at the clients 
level and for the purpose the Authorised Person herein absolutely and 
unconditionally agrees with EBL to be solely responsible for all such trades / 
transactions and further authorise EBL to liquidate such stocks at its sole 
discretion with a view to clear the outstanding dues from such clients of 
Authorised Person. The policy for Security deposit is attached hereto and 
marked as`, { text: ` “Annexure 1-A”.`, bold: true }, `\n\niii. This interest free security deposit will be returned back to the Authorised 
Person in accordance with the Termination Clause under this MOU.
\n\n`]
                            }],


                            [{ text: `C.`, bold: true }, { text: `Revenue Sharing`, bold: true }],
                            [{}, {
                                style: 'tableExample',

                                layout: 'noBorders',

                                table: {

                                    widths: [20, '*'],

                                    body: [
                                        [`i) `, `The arrangement for revenue sharing will come into effect 
prospectively only after the Authorised Person obtains approval 
from the Exchange/s.
`],
                                        [`ii) `, {
                                            text: [{
                                                text: `Revenue generated from the Authorised Person under this MOU will
be shared in the manner provided in all income broking as set out in `}, { text: `\n“Annexure – 2”`, bold: true }, ` of this MOU hereto attached and marked as`, { text: `\n“Annexure – 2”`, bold: true }, `hereto in ___ slabs depending on revenue 
generated from the clients introduced by the Authorised Person.
Provided the Authorised Person shall obtain the required
registration from the relevant Exchanges as the case may be
before the settlement date. Authorised Person shall be paid by
way of fees, charges, commission, salary etc. on a monthly basis
subject to necessary deductions such as tax, incidental expense,
etc. the income which is accrued after obtaining registration from 
the Exchange to operate as an Authorised Person. However, his 
account shall be settle at the end of each financial year i.e March 
31st Subject to any debits in his accounts or in accounts of client(s) 
introduces by him.`]
                                        }],
                                        [`iii) `, {
                                            text: `EBL can issue a one month notice for termination to it’s Authorised
person who is b e i n g a n Authorised Person with it for more than
one year and generating a net to EBL broking revenue of less than 
Rs.10000/- per month, calculated as average of a financial year 
quarter, retain a minimum of Rs.10000/- as EBL’s share of 
 commitment revenue.
`}],
                                        [{ text: `iv)` }, {
                                            text: [{ text: `The revenue sharing terms shall be as set out in` }, { text: ` “Annexure – 1”`, bold: true }, {
                                                text: ` of
this MOU, forming an integral part of this MOU.
`}]
                                        }],

                                    ]
                                }
                            }],//caution 
                            [{ text: `E.`, bold: true }, { text: `Obligations of EBL:`, bold: true }],
                            [{}, {
                                style: 'tableExample',

                                layout: 'noBorders',

                                table: {

                                    widths: [20, '*'],

                                    body: [
                                        [`(i) `, `In case of termination of the agreement by the EBL, it shall be the
duty of the EBL to intimate and request for cancellation of association
of Authorised Person to the Exchange, as per the procedures
prescribed from time to time. Any fees, charges, levies, taxes etc., 
required to be paid and/or documentation with respect to processing 
the termination, the same shall be paid / recoverable by from 
Authorised Person.`],
                                        [`(ii) `, `EBL will provide a centralized Back Office support, which inter–alia, 
included trade processing, contract generation, contract printing 
and dispatch of reports / contract notes, issuance of payout 
cheques / transfer of payout. The Authorised Person shall, however, 
be liable to collect the pay–in cheques / direct transfer from the clients 
introduced by him/her/itself to EBL for all obligations of such clients.`],
                                        [`(iii) `, `EBL shall provide complete business support which shall include Order 
execution facility for the derivatives and cash market segment and 
providing research report services.`]

                                    ]
                                }
                            }],  //e ends      
                            [{ text: `F.`, bold: true }, { text: `Obligations and duties of the Authorised Person`, bold: true }],
                            [{}, {
                                style: 'tableExample',

                                layout: 'noBorders',

                                table: {

                                    widths: [20, '*'],

                                    body: [
                                        [`a.  `, ` The Authorised Person shall ensure due compliance with all the rules, 
regulations, bye-laws of the SEBI, Exchanges and any other regulatory 
authority`],
                                        [`b. `, `The Authorised Person agrees and undertakes to collect margins 
payable by all the clients severally introduced to EBL by him. The 
Authorised Person further agrees to ensure that such margins to be 
collected from his client will be delivered to EBL latest by 1300 HRS 
on T+1 basis.`],
                                        [`c.  `, `The Authorised Person hereby declares that: -`],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [`i.`, `He/she/it is/are presently not affiliated as an Authorised Person
or as any other intermediary with any other Stock Broker on
the Exchange or no such application is pending with the 
authorities to that effect.`],
                                                    [`ii.`, `He /she/it has/have no direct/indirect interest in any other
Stock Broker of the Exchange.
`],
                                                    [`iii. `, `He/she/it meets the required eligibility criterion prescribed by
regulatory authority & EBL from time to time.
`],
                                                    [`iv.`, `All the employees, approved users and/or sales personnel 
appointed by him/her/it shall hold all the necessary certification
for the respective segments at all points of time as may be 
required by regulators and EBL from time to time.`],

                                                ]
                                            }
                                        }],
                                        [`d. `, `The Authorised Person assures that he / she / it has/have ensured
that he / she/ it is/are having the requisite authorization and clauses 
in the MOA/approvals from the Board / partnership deed / any other 
document as required enabling himself / herself / itself to carry out
securities business and has not been debarred / prohibited / restricted
from carrying out such business under any Law of India. The 
Authorised Person further agrees to ensure that the above clauses
continue to hold true till the time he/she/it is/are associated with the
Stock Broker to carry out the said activity. The Authorised Person
agrees to communicate any changes made to the above to the notice
of the Stock Broker before the changes are effected in writing.`],

                                        [`e.`, `The Authorised Person shall ensure that the Client introduced by the
Authorised Person shall pay the Stock Broker brokerage, commission, 
fees Account opening/maintenance charges, charges for availing
research reports, charges for availing special facility for mobile
broking / SMS facility or any other charges for the special
services/facilities availed by such Client, inter Settlement charges, 
auction charges, penalties levied by the Exchange or Client limit 
violation charges for dishonoured of cheque (s) given by such clients /
statutory levies, GST and other taxes and trade / transaction expenses 
including inter alia depository charges, settlement charges and any 
other charges/fees as may they exist/introduced from time to time.`],
                                        [`f.`, `In case, such client fails to pay the above-mentioned charges, fees, 
etc., the Authorised Person is liable to pay the above- mentioned 
charges, fees, etc. in respect of such client (s). The EBL is also entitled 
to recover the above- mentioned charges, fees, etc. out of any of the 
credits available with EBL including but not limited to Authorised Person 
deposits, fees, charges, commission, salary etc. to be paid by the EBL 
to the Authorised Person.`],
                                        [`g.`, `The Authorised Person agrees and declares that he / she / it shall be 
fully responsible for the bad debts and / or losses / claims arising out 
of trades executed by EBL on behalf of either the Authorised Person and 
/ or any of the clients introduced by the Authorised Person. The 
Authorised Person is also responsible to bear and make good any loss 
/ bad debts / claims / loss arising out of liquidation of securities under 
pledge / penalties, which EBL may suffer on account of default by the 
clients introduced by the Authorised Person, and shall bear all the 
expenses resulting from but not limited to client litigations in cases of 
any dispute.`],
                                        [`h.`, `EBL shall have the unconditional and irrevocable right to liquidate the 
securities held as security deposit to recover all the losses as mentioned 
in the above clause F (d) and/or F (f) hereinabove or to recover any 
other liability. In such case Authorised Person shall also be further liable 
to replenish the security deposit immediately.
`],
                                        [`i. `, `Any cost, loss, claim damages, penalties etc. incurred by EBL towards
wrong punching of an order shall be borne and made good
immediately by the Authorised Person.
`],
                                        [`j. `, `While introducing client, all formalities like the Client Registration 
Form (KYC formalities) to be filled and all supporting documents to
be duly attached will have to be satisfactorily completed by the 
Authorised Person before submitting such documents for registration
with EBL. All account opening and Demat account opening will be 
centralized at EBL and its group company.
`],
                                        [`k.`, `The Authorised Person shall ensure that no cash transactions and no
third party transfer of funds / securities shall take place. The 
Authorised Person also agrees to abide by Anti-Money Laundering 
Guidelines issued from time to time by EBL or as may be notified from
time to time by Exchanges / FMC or under laws and adherence to the 
Law of the Land in this respect at all times.
`],
                                        [`l. `, `The Authorised Person shall transfer all his / her / its erstwhile or 
existing broking business with any other Broker to EBL within one
month from the date of execution of the MoU and stop all his broking 
business with any other Broker.`],
                                        [`m.`, `The Authorised Person shall ensure that he/she/it shall not carry out
any business in the securities/commodities market other than with EBL
and/ or its associate entities. The Authorised Person shall ensure
adherence to FMC/Exchange guidelines on Clubbing of open position, 
Open Interest Limit, etc.`],
                                        [`n.`, `The Authorised Person agrees that the Stock Broker be Authorised 
to establish additional internal controls like deposit, verification of 
identity of client (s) registered, review of transactions in respect 
of clients contributing large volumes, power to scrutinize Authorised 
Person related documents etc., at any time during the period of the 
MOU/arrangement /agreement in force and until a period of one year 
after the expiry of this agreement. Further, even after this agreement 
ceases to be in effect, the Authorised person agrees to co-operate to 
the best of his knowledge and ability with EBL and any related entity 
to carry out inspections as may be warranted / required / instructed 
to be done by any regulatory authority.`],
                                        [`o.`, `The Authorised Person agrees that the Stock Broker would be
entitled to establish any other additional control that it desires to
ensure safe and secure dealing of investors with the Authorised 
Person.
`],
                                        [`p.`, `The Authorized Person shall not shift / open / close his / her/ its
office / branch office and also not shifts any terminal provided by EBL, 
without seeking prior written permission of EBL. The Authorized Person
also shall not carry-out any transactions with any other Broker in any 
of the Exchange and / or Segments.`],
                                        [`q.`, `The Authorized Person agrees that he would display at all of his / her 
/ its branches in prominent location, Display Board as per regulatory
norms and as provided by EBL from time to time. The Authorized
person also undertakes to use the visiting cards / emails and other
office-materials which may be provided by EBL with due care and
ensure that it shall not be used in any manner as would tantamount
to misrepresent the investors and / or general public. In case of such
misuse and / or misrepresentation herein contained, the Authorized
Person shall be liable to EBL, including but not limited to any
third party actions and EBL shall also be entitled to initiate legal actions 
[Civil and/or Criminal] against the Authorized Person.`],
                                        [`r.`, `In the event of termination as an Authorised Person, the Authorised 
person shall inform to the clients introduced by himself /herself / 
itself about surrender of registration as an Authorised Person and 
confirm said adherence to EBL forthwith.
`],
                                        [`s.`, `The Authorised Person shall ensure that all the requisite 
registrations and licenses whether under local laws or otherwise in
respect of the premises where he/she/it carries on the activities of the
Authorised Person (where such premises are of the Authorised Person 
or is under lease / leave & license of the Authorised Person) has been 
obtained and agrees to maintain all such registrations and licenses on 
regular basis and shall be solely responsible for due compliance 
with the provisions of all applicable law relating to such
establishments.`],
                                        [`t.`, `The Authorised Person shall not carry on any business, whether
relating to stock/commodity market or otherwise, other than that of
an Authorised Person as contemplated herein except with the specific 
approval of the Stock Broker in writing.
`],
                                        [`u. `, `The Authorised Person take due care and shall ensure that there 
would be proper execution of business as per this MOU and 
further undertakes the responsibility to ensure that no manipulative,
illegal or unwarranted activity is carried out by him / her / its self and
/ or employees Authorised person understands and agrees that he /
she / it would be solely responsible for any violation found in this
respect.
`],
                                        [`v. `, `The Authorised Person shall ensure satisfaction of the condition of the
pre-requisite Exchange certification such as NCFM/BCFM NISM/MCCP 
if he/she/it proposes to operate a terminal in the various segment.`],
                                        [`w.`, `The Authorised Person shall ensure due compliance with all the 
rules, regulations, bye-laws of the SEBI, Exchanges and any other 
regulatory authority and compliance guidelines / standards 
communicated by EBL from time to time.`],
                                        [`x.`, `The Authorised person agrees to pay penalties decided by regulatory
authorities and / or Stock broker as may be applicable for non-adherence to compliance requirements from time to time. In the event 
of non-payment of such money which may be accrued against penalty
as per this clause, EBL would have the right to recover the same
from accrued income and / or deposit of the Authorised person with
EBL.
`],
                                        [`y. `, `The Person employed by the Authorised Person shall be the employees
of the Authorised Person and shall have no claim whatsoever of 
employment or otherwise vis-a-vis EBL.`],



                                    ]
                                }
                            }],//end
                            [{ text: `G.`, bold: true }, { text: `Term and Termination`, bold: true }],
                            [{}, {
                                style: 'tableExample',

                                layout: 'noBorders',

                                table: {

                                    widths: [20, '*'],

                                    body: [
                                        [`i.`, `This MoU shall commence from the date of execution of this MOU.
Subject to clause G ii herein. Either Party can terminate this MOU by
giving 30 days’ notice in writing to the other Party and after 
settlement of obligation by either Party.
`],
                                        [`ii. `, `The Authorised Person agrees not to terminate this MOU before the
end of One (1) Year from the date of execution of this MOU. In the
event the Authorised Person terminate this MOU before the end of One
(1) Year, as is stated herein above, then EBL shall deduct an amount
of Rs. 25,000/- (Rupees Twenty five Thousand only) from the interest
free Security deposit as penalty. Further, the Authorized Person also
agrees that the balance amount of Deposit paid by the Authorized 
Person shall be withheld by the Stock Broker for a period not
exceeding three (3) months from the date of termination of this
agreement provided all dues whatsoever including but not limited
to the trades carried out by EBL for the clients introduced and serviced
by the Authorised Person, fines, penalties and any other ancillary cost
having been cleared by the Authorised person.
`],
                                        [`iii.`, `Authorised Person agrees that upon termination of this MOU, the
Authorised Person will not solicit the employees of EBL up to a period
of 1 (one) year after termination unless otherwise agreed to between
the Parties in writing.
`],
                                        [`iv. `, `Authorised Person agrees provide to the Member a copy of the
database along with such developments, alterations, modifications
and additions made thereto from time to time and permit the
Member to retain a copy thereof on termination of this agreement.`],
                                        [`v.`, `This MOU shall forthwith terminate:`],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [`a)`, `On the violation of any of the terms of this MOU either not 
rectifiable or which is not rectified even after one month’s written
notice by the party aggrieved by the violation to the other party.
`],
                                                    [`b)`, `Upon the demise /insolvency of either party.
`],
                                                    [`c)  `, `If the Stock Broker for any reason ceases to be a Member
of the respective Exchange/s including cessation of Membership
by reason of the expulsion or if the registration issued by SEBI 
/ Exchanges is cancelled or suspended.

`],

                                                ]
                                            }
                                        }],//inner
                                        [{ text: `H `, bold: true }, { text: `Force Majeure`, bold: true }],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `In the event of any failure, interruption or delay in performance of 
obligations resulting from acts, events or circumstances of force 
majeure or otherwise, such as but not limited to acts of God, acts or
regulations of any governments / governmental authorities, 
breakdown of communication systems and suspension of trading, EBL
shall not be liable or be held responsible for any kind for any loss or
damage arising / incurred or suffered by either the clients and / or
the Authorised Person and / or any third person as a result of such
failure, interruption or delay. The Authorised Person agrees to keep
EBL always indemnified against such losses / claims.
`],

                                                ]
                                            }
                                        }],

                                        [{ text: `I`, bold: true }, { text: `Indemnity`, bold: true }],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `The Authorised Person shall indemnify and keep indemnified EBL and
/ or its group / associates companies, its respective officers, directors, 
stockholders, agents Affiliates, representatives and employees (each, 
an “Indemnified Person”) against any losses, claims, damages,
liabilities or litigation (including legal and other expenses) to which any
of the foregoing may become subject, arising out of performance of
its obligations under this agreement, insofar as such losses, claims,
damages, liabilities or litigation are (a) based upon any wrongful act
by the Authorised Person or its employees, agents or other 
representatives, or (b) based on a breach by the Authorised 
Person or its representations, warranties, covenants or agreements 
contained in the terms and conditions.`],

                                                ]
                                            }
                                        }],

                                        [{ text: `J.`, bold: true }, { text: `Arbitration`, bold: true }],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `Notwithstanding anything specifically stipulated under any law and
any bye law and regulations of Exchange framed under Securities
Contracts (Regulation) Act, 1956 and having regard to the commercial 
understanding voluntary agreed to by and between Parties therein if
is specifically agreed that any disputes between the Parties in respect
of any claim, difference and/or contravention of terms of this MOU or
otherwise shall be referred to a sole arbitrator appointed mutually by
the Parties. Each party will bear the cost of the arbitrator so engaged
by the Parties equally. The arbitration shall be conducted in accordance
with the provisions of the Arbitration and Conciliation Act, 1996 as 
applicable from time to time including any statutory amendment or
re-enactments thereof. The arbitration proceedings shall be conducted
in English language and the venue of arbitration shall be Mumbai.
Each party irrevocably waives any objection it may have at any time
to the laying of the venue of arbitration. The decision of the 
arbitrator(s) will be final and binding on the Parties and may be
entered and enforced in any court of competent jurisdiction by either
party`],

                                                ]
                                            }
                                        }],

                                        [{ text: `K.`, bold: true }, { text: `Severability`, bold: true }],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `If any provision of this MoU is determined to be invalid or 
unenforceable in whole or in part by reason of it being in conflict with
the prevailing laws or for any other reason, such invalidity or 
unenforceability shall attach only to such provision or the applicable
part of such provision and the remaining part of such provision and all
other provisions of this MoU shall continue to remain in full force and
effect.`],

                                                ]
                                            }
                                        }],

                                        [{ text: `L.`, bold: true }, { text: `Amendments`, bold: true }],
                                        [{}, {

                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `The terms and provisions of this MoU may be amended or modified 
only by a written intimation mail and/or confirmation letter sent and/or 
issued by the EBL to be charged by such amendment or modification.`],

                                                ]
                                            }
                                        }],

                                        [{ text: ` M.`, bold: true }, { text: `Jurisdiction & Governing Laws`, bold: true }],
                                        [{}, {
                                            style: 'tableExample',

                                            layout: 'noBorders',

                                            table: {

                                                widths: [20, '*'],

                                                body: [
                                                    [``, `This MOU shall be governed by, construed, and take effect in
accordance with the Laws of India. The Courts of Mumbai shall have
exclusive jurisdiction in all matters.
`],

                                                ]
                                            }
                                        }],



                                    ]
                                }
                            }],//end                            




                        ]
                    }
                },                          //outer

                {
                    text: [
                        `\n\n\n\n\n\n\n\n\n`,
                        {
                            text: `IN WITNESS WHEREOF THE PARTIES HERETO HAVE SET AND SUBSCRIBED
THEIR RESPECTIVE HANDS AND SEALS THE DAY AND YEAR FIRST 
HEREINABOVE WRITTEN.
\n\nSIGNED AND DELIVERED                                 )`, bold: true
                        },
                        `\nBy the within named                                         )\n`,
                        { text: `\n ________________                                                 )`, bold: true },
                        `\nIn the presence of                                               )\n
1.                                                                           )\n`,
                        { text: `\nSIGNED AND DELIVERED                                          )`, bold: true },
                        { text: `\n${entityData[0].Entity_Name}                                     ) `, bold: true },
                        { text: `\nDirector/Authorized Signatory                                  ) `, bold: true },
                        `\nIn the presence of                                                    )\n
1.                                                                       )\n\n\n\n`,

                    ]
                },
                { text: '\n', pageBreak: 'before' },
                {
                    text: [

                        { text: `Annexure 1 -`, decoration: 'underline', bold: true }, { text: ` Annexure 1 Forming a part of MoU`, },
                        { text: `\n\nList of securities: \n\n\n`, decoration: 'underline', bold: true },
                        { text: ``, }
                    ]
                },

                {
                    style: 'tableExample',

                    layout: 'noBorders',

                    table: {

                        widths: [20, '*'],

                        body: [
                            [{}, {
                                style: 'tableExample',


                                table: {
                                    widths: [50, 185, 60],
                                    //  heights:[45,20],
                                    body: [
                                        [{ text: `Sr. No.`, alignment: 'center', bold: true }, { text: `Name of Securities  `, alignment: 'center', bold: true }, { text: `Quantity`, alignment: 'center', bold: true }],
                                        [{ text: `1`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `2`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `3`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `4`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `5`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `6`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `7`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `8`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `9`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `10`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `11`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `12`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `13`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `14`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `15`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `16`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `17`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `18`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `19`, alignment: 'center', bold: true }, ``, ``],
                                        [{ text: `20`, alignment: 'center', bold: true }, ``, ``],


                                    ]
                                }
                            },],

                        ]
                    }
                },

                `\n\n\n\n`,
                { text: '\n', pageBreak: 'before' },
                [{}, {
                    style: 'tableExample',

                    layout: 'noBorders',

                    table: {

                        widths: [20, '*'],

                        body: [
                            [``, {
                                text: [{ text: `Annexure – 1a: Forming a part of MoU\n\n`, bold: true }, { text: `Security deposit policy for the Authorised  \n\n\n`, bold: true, decoration: 'underline' }, {
                                    text: `Authorised Person willing to keep collateral as security deposit need to follow below
things:
`}]
                            }],
                            [``, {
                                style: 'tableExample',

                                layout: 'noBorders',

                                table: {

                                    widths: [20, '*'],

                                    body: [
                                        [``, {
                                            style: 'tableExample',

                                            layout: 'noBorders',


                                            table: {

                                                widths: [10, '*'],

                                                body: [
                                                    [`*`, `Authorised Person need to open separate demat account with Edelweiss in his
own name or in name of his company (Authorised Person being a company) and 
need to transfer the shares from his other demat accounts.`],
                                                    [`*`, `EBL will pledge or keep the securities separately in its account, as the case 
may be, for the shares transferred by Authorised Person towards such
security deposit.
`],
                                                    [`*`, `Stocks to be accepted for pledging need to be only approved stocks with pre 
defined hair cut.`],
                                                    [`*`, `In the event of default by any client introduced by the Authorised Person, EBL
will revoke the pledged shares & sell the stocks to meet the debt obligation.
`],
                                                    [`*`, `Credit of the same will be passed to respective client account only to the 
extent of the debit obligation or funds realized by revoking shares pledged by 
Authorised person whichever is lower.`],
                                                    [`*`, `Exposure on basis of collateral will be provided after considering the hair cut 
value of the shares.`],
                                                    [`*`, `If ageing debit of any client of Authorised Person exceeds the pre-determined 
ageing days, stocks pledged by the Authorised person will be liquidated through
EBL.
`],
                                                    [`*`, `Security deposit value should never be less than Rs. 1 lac. Any market event
like market fall, bonus / split which may lead to drop in market value of collateral 
/ deposit; in such event Authorised Person has / have to infuse more deposit 
in form of cash or collateral to meet minimum required threshold deposit
requirements.
`],

                                                ]
                                            }
                                        }],

                                    ]
                                }
                            }],

                        ]
                    }
                }],


                { text: '\n', pageBreak: 'before' },
                {
                    text: [
                        { text: `Annexure 2 – Forming a part of MOU\n`, decoration: 'underline', bold: true },
                        { text: `\nName : `, bold: true },
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, decoration: 'underline', alignment: 'left' },
                        { text: `\nCode : `, bold: true },
                        { text: `${code}`, decoration: 'underline', alignment: 'right' },
                    ]
                },
                `\n\n`,
                {
                    style: 'tableExample',
                    fontSize: 9,

                    table: {
                        widths: [50, 70, 50, 70, 100, 70, '*'],
                        body: [
                            [{
                                text: `Sharing
Level
`, alignment: 'center',
                            }, {
                                text: `Deposit
(Upfront)`, alignment: 'center', bold: true
                            }, {
                                text: `Partner
Share `, alignment: 'center', bold: true
                            }, {
                                text: `Edelweiss
Share`, alignment: 'center', bold: true
                            }, {
                                text: `Subject to 
Minimum 
retention by 
Edelweiss(Rs/Cr 
of TO)`, alignment: 'center', bold: true
                            }, {
                                text: `Min Gross 
Brokerage 
In absolute 
Rupee term 
(Avg per 
month of 
quarter
post 
Gestation 
period)`, alignment: 'center', bold: true
                            }, {
                                text: `Gestat 
ion 
Period 
(Qtrs)
`, alignment: 'center', bold: true
                            }],
                            [{ text: `D`, alignment: 'center' }, {
                                text: `50000 upfront
50000
Deferred 
within 3 
quarters`, alignment: 'center'
                            }, { text: `50`, alignment: 'center' }, { text: `50`, alignment: 'center' }, { text: `500`, alignment: 'center' }, {
                                text: `Less than
2500`, alignment: 'center'
                            }, { text: `N.A.`, alignment: 'center' },],
                            [{ text: `C`, alignment: 'center' }, {
                                text: ` 50000 upfront
                    
50000
Deferred 
within 3 
quarters`, alignment: 'center'
                            }, { text: `60`, alignment: 'center' }, { text: `40`, alignment: 'center' }, { text: `500`, alignment: 'center' }, { text: `2500`, alignment: 'center' }, { text: `N.A.`, alignment: 'center' },],
                            [{ text: `B`, alignment: 'center' }, { text: `1 Lac`, alignment: 'center' }, { text: `70`, alignment: 'center' }, { text: `30`, alignment: 'center' }, { text: `400`, alignment: 'center' }, { text: `100000`, alignment: 'center' }, { text: `3`, alignment: 'center' },],
                            [{ text: `A`, alignment: 'center' }, { text: `1.50 Lacs`, alignment: 'center' }, { text: `75`, alignment: 'center' }, { text: `25`, alignment: 'center' }, { text: `300`, alignment: 'center' }, { text: `300000`, alignment: 'center' }, { text: `3`, alignment: 'center' },],



                        ]
                    }
                },

                { text: `\n\nTerms: \n\n`, bold: true },
                {
                    style: 'tableExample',

                    fontSize: 9,
                    table: {
                        //  widths:[50,80,185,60],
                        //  heights:[45,20],
                        body: [
                            [{ text: `1. Authorised Person may choose to join with any of the above sharing arrangements as per levels in the table above, provided other terms with respect to the such sharing slab are adhered to` },],
                            [{ text: `2. Gestation period starts from 1st day of next financial year quarter start from the date of code generation. i.e.1st of April, July, Oct & Jan can only be the start dates of gestation period` }],
                            [{
                                text: `3. Sharing slabs would be dynamic and Authorised person would be automatically be shifted from one to another slab based upon their quarterly performance review. Alternatively, downgrading of non performing partner
would be also automatic based upon their performance review. Authorised Person agrees to such dynamic performance based revenue sharing arrangement`}],
                            [{ text: `4. For sitting Franchisee, the sharing slab would be 15% lesser than the aforesaid slabs for the partner` }],
                            [{ text: `6.Master Franchisee would get 25% of net brokerage earned by Edelweiss from Franchisee introduced by him` }],
                        ]
                    }
                },

                { text: `\n`, pageBreak: 'before' },
                { text: `Sharing Level as per above table selected by AP:\n\n`, bold: true },

                {
                    style: 'tableExample',

                    table: {
                        heights: [25, 35],
                        body: [
                            [{
                                text: ` Sharing
Level`}, {
                                text: `Deposit
(Upfront)`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Authroised 
Person 
Share`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Edelweiss
Share`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Subject to 
Minimum retention 
by
Edelweiss(Rs/Cr 
of TO)`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Min Gross
Brokerage In
absolute Rupee 
term (Avg per
month of quarter 
post Gestation`, bold: 'true', alignment: 'left'
                            }, {
                                text: `Gest 
ation 
Perio d 
(Qtrs)`, bold: 'true', alignment: 'left'
                            }],
                            [``, ``, ``, ``, ``, ``, ``],



                        ]
                    }
                },

                {
                    text: `\nSecurity Deposit Details:
Cheque/Draft No___________ Bank:______________________________________________ Amount
__________________ \n
Value of Shares after haircut as per Annexure – 1 `, bold: true
                },
                `\n\nSigned for and on behalf of`,
                {
                    text: `Edelweiss Broking Limited                                  AP Name:\n
        __________________________                                          _______________________________________\n\n
Authorised                                                             Signatory Authorised Personn
(Signature)                                                            (Signature)\n\n
_______________________________                            _______________________________________\n\n
Witness Name (O/b Of EBL):                             Witness Name (O/b of AP)\n\n
Witness Signature:                                              Witness Signature:
`, bold: true
                },
                `\n\nAdditional Charges or specific conditions for calculation if any:
         __________________________________________________________________
The brokerage share of AP shall be calculated on monthly basis and the 
account between the Member and the AP shall be settled by the 10th of the
following month\n`, { text: `\n___________________`, alignment: 'right' },
                { text: '\n', pageBreak: 'before' },
                {
                    text: [
                        { text: `Annexure 2 – Forming a part of Memorandum of Understanding (1/2)\n\n`, bold: 'true' },
                        {
                            text: `Name of Main Authorised
                 Person: `, bold: true, alignment: 'left'
                        },
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, decoration: 'underline', alignment: 'left' },
                        { text: `                                                          Code of Main Authorised Person: `, bold: true, alignment: 'right' },
                        { text: `${code}`, decoration: 'underline', alignment: 'right' },
                    ]
                },
                `\n\nInterest Free Security Deposit: _____________________\n\n`,

                {
                    style: 'tableExample',
                    fontSize: 10,
                    table: {
                        widths: [130, 110, 20, 60, 60, 90],

                        body: [
                            [{
                                rowSpan: 3, text: `
                    
                    SEGMENT`, bold: true
                            }, { text: `FIXED BROKERAGE`, bold: true }, { rowSpan: 3, text: ` ` }, { colSpan: 3, text: `SHARING RATIO (In % terms)`, bold: true }, ``, ``],
                            [``, { text: `To Edelweiss`, bold: true }, ``, {
                                rowSpan: 2, text: `Authorised
Person Share`, bold: true
                            }, {
                                    rowSpan: 2, text: `Edelweiss
Share`, bold: true
                                }, {
                                    rowSpan: 2, text: `Subject to
Minimum retention
by EBL`, bold: true
                                }],
                            [``, `(in Rs per crore terms )`, ``, ``, ``, ``],
                            [{ text: `Equity Cash – Delivery`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE Cash `, {
                                text: [`Rs`, { text: `    ${x}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 3, text: `


OR `, alignment: 'center'
                                }, { text: `${y} `, alignment: 'right' }, { text: `${z} `, alignment: 'right' }, ``],
                            [`NSE SLBM `, {
                                text: [`Rs`, { text: `    ${x1}    `, decoration: 'underline' }, ` Per 
Crore`]
                            }, ``, { text: `${h}`, alignment: 'right' }, { text: `${k}`, alignment: 'right' }, ``],
                            [`BSE Cash`, {
                                text: [`Rs`, { text: `    ${x2}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${l}`, alignment: 'right' }, { text: `${m}`, alignment: 'right' }, ``],
                            [{ text: `Equity Cash - Intraday`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE Cash`, {
                                text: [`Rs`, { text: `    ${x3}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${n}`, alignment: 'right' }, { text: `${o}`, alignment: 'right' }, ``],
                            [`BSE Cash`, {
                                text: [`Rs`, { text: `    ${x4}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${p}`, alignment: 'right' }, { text: `${q}`, alignment: 'right' }, ``],

                            [{ text: `Equity Intraday Derivative`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],

                            [`NSE FO `, {
                                text: [`Rs`, { text: `    ${x5}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, { text: ` OR `, alignment: 'center' }, { text: `${r}`, alignment: 'right' }, { text: `${s}`, alignment: 'right' }, ``],
                            [{ text: `Currency Futures`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE CD `, {
                                text: [`Rs`, { text: `    ${x6}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${t}`, alignment: 'right' }, { text: `${u}`, alignment: 'right' }, ``],
                            [`MSEI CD `, {
                                text: [`Rs`, { text: `    ${x7}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${v}`, alignment: 'right' }, { text: `${w}`, alignment: 'right' }, ``],

                            [{ text: `Options`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE F&O DELIVERY `, {
                                text: [`Rs`, { text: `    ${x8}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 4, text: `


OR `, alignment: 'center'
                                }, { text: `${y1}`, alignment: 'right' }, { text: `${z1}`, alignment: 'right' }, ``],
                            [`NSE FO OPTION `, {
                                text: [`Rs`, { text: `    ${x9}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${h1}`, alignment: 'right' }, { text: `${k1}`, alignment: 'right' }, ``],
                            [`NSE CD OPTION`, {
                                text: [`Rs`, { text: `    ${x10}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${l1}`, alignment: 'right' }, { text: `${m1}`, alignment: 'right' }, ``],
                            [`MSEI CD OPTION`, {
                                text: [`Rs`, { text: `    ${x11}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${n1}`, alignment: 'right' }, { text: `${o1}`, alignment: 'right' }, ``],
                            [{ text: `Client Subscription fees*`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`All Equity Exchanges 
& Segments`, { text: `NA`, alignment: 'center' }, { text: ` OR `, alignment: 'center' }, { text: `%`, alignment: 'right' }, { text: `%`, alignment: 'right' }, ``],





                        ]
                    }
                },
                { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        { text: `Code & Name of 1st Chain Authorised Person: `, fontSize: 10, bold: true },
                        { text: `${apBrokerage2.Introducer_Code == null ? ' ' : apBrokerage2.Introducer_Code} - ${apGeneral.Account_Name == null ? ' ' : apGeneral.Account_Name.toUpperCase()} `, fontSize: 10, decoration: 'underline' }

                    ]
                },
                {
                    style: 'tableExample',
                    fontSize: 9,
                    table: {
                        widths: [130, 110, 20, 60, 60, 90],

                        body: [
                            [{
                                rowSpan: 3, text: `
                    
                    SEGMENT`, bold: true
                            }, { text: `FIXED BROKERAGE`, bold: true }, { rowSpan: 3, text: ` ` }, { colSpan: 3, text: `SHARING RATIO (In % terms)`, bold: true }, ``, ``],
                            [``, { text: `To Edelweiss`, bold: true }, ``, {
                                rowSpan: 2, text: `Authorised
Person Share`, bold: true
                            }, {
                                    rowSpan: 2, text: `Edelweiss
Share`, bold: true
                                }, {
                                    rowSpan: 2, text: `Subject to
Minimum retention
by EBL`, bold: true
                                }],
                            [``, `(in Rs per crore terms )`, ``, ``, ``, ``],
                            [{ text: `Equity Cash – Delivery`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE Cash `, {
                                text: [`Rs`, { text: `    ${xa}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 3, text: `


OR `, alignment: 'center'
                                }, { text: `${ya}`, alignment: 'right' }, { text: `${za}`, alignment: 'right' }, ``],
                            [`NSE SLBM `, {
                                text: [`Rs`, { text: `    ${xb}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${ha}`, alignment: 'right' }, { text: `${ka}`, alignment: 'right' }, ``],
                            [`BSE Cash`, {
                                text: [`Rs`, { text: `    ${xc}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${la}`, alignment: 'right' }, { text: `${ma}`, alignment: 'right' }, ``],
                            [{ text: `Equity Cash - Intraday`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE Cash`, {
                                text: [`Rs`, { text: `    ${xd}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${na}`, alignment: 'right' }, { text: `${oa}`, alignment: 'right' }, ``],
                            [`BSE Cash`, {
                                text: [`Rs`, { text: `    ${xe}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${pa}`, alignment: 'right' }, { text: `${qa}`, alignment: 'right' }, ``],

                            [{ text: `Equity Intraday Derivative`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],

                            [`NSE FO `, {
                                text: [`Rs`, { text: `    ${xf}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, { text: ` OR `, alignment: 'center' }, { text: `${ra}`, alignment: 'right' }, { text: `${sa}`, alignment: 'right' }, ``],
                            [{ text: `Currency Futures`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE CD `, {
                                text: [`Rs`, { text: `    ${xg}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${ta}`, alignment: 'right' }, { text: `${ua}`, alignment: 'right' }, ``],
                            [`MSEI CD `, {
                                text: [`Rs`, { text: `    ${xh}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${va}`, alignment: 'right' }, { text: `${wa}`, alignment: 'right' }, ``],

                            [{ text: `Options`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`NSE F&O DELIVERY `, {
                                text: [`Rs`, { text: `    ${xi}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 4, text: `


OR `, alignment: 'center'
                                }, { text: `${y1a}`, alignment: 'right' }, { text: `${z1a}`, alignment: 'right' }, ``],
                            [`NSE FO OPTION `, {
                                text: [`Rs`, { text: `    ${xj}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${h1a}`, alignment: 'right' }, { text: `${k1a}`, alignment: 'right' }, ``],
                            [`NSE CD OPTION`, {
                                text: [`Rs`, { text: `    ${xk}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${l1a}`, alignment: 'right' }, { text: `${m1a}`, alignment: 'right' }, ``],
                            [`MSEI CD OPTION`, {
                                text: [`Rs`, { text: `    ${xl}    `, decoration: 'underline' }, ` Per 
                          Lot/Crore`]
                            }, ``, { text: `${n1a}`, alignment: 'right' }, { text: `${o1a}`, alignment: 'right' }, ``],
                            [{ text: `Client Subscription fees*`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`All Equity Exchanges 
& Segments`, { text: `NA`, alignment: 'center' }, { text: ` OR `, alignment: 'center' }, { text: `%`, alignment: 'right' }, { text: `%`, alignment: 'right' }, ``],





                        ]
                    }
                },
                {
                    text: `\nEdelweiss Broking Limited                                                             Authorised Person Name: ___________________\n\n\n

Authorised Signatory                                                                      AP Signature:\n\n
Witness Name                                                                                 Witness Name
(on Behalf Of Edelweiss):                                                             (On Behalf of AP):\n\n
Witness Signature:                                                                         Witness Signature:\n
Additional Charges or specific conditions for calculation`, fontSize: 9, bold: true
                },
                {
                    text: `if any:_____________________________________________________________\n
The brokerage share of Authorised Person shall be calculated on monthly basis and the account between the Member and the AP shall be settled by the 10th of the following month\n\n
Date: __________________________                                                             Place: __________________________
`, fontSize: 9
                },
                { text: '\n', pageBreak: 'before' },
                {
                    text: [
                        { text: `Annexure 2 – Forming a part of Memorandum of Understanding\n\n`, fontSize: 9, bold: true },
                        { text: `Name of Main Authorised Person: `, fontSize: 9, bold: true, alignment: 'left' },
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, decoration: 'underline', fontSize: 9, alignment: 'left' },
                        { text: `                                                                                 Code of Main Authorised Person: `, fontSize: 9, bold: true, alignment: 'right' },
                        { text: `${code}`, decoration: 'underline', fontSize: 9, alignment: 'right' },

                    ]
                },

                { text: `\nInterest Free Security Deposit: _____________________\n\n`, fontSize: 9 },

                {
                    style: 'tableExample',
                    fontSize: 8.5,
                    table: {
                        widths: [130, 110, 20, 60, 60, 90],

                        body: [
                            [{
                                rowSpan: 3, text: `
                    
                    SEGMENT`, bold: true
                            }, { text: `FIXED BROKERAGE`, bold: true }, { rowSpan: 3, text: ` ` }, { colSpan: 3, text: `SHARING RATIO (In % terms)`, bold: true }, ``, ``],
                            [``, { text: `To Edelweiss`, bold: true }, ``, {
                                rowSpan: 2, text: `Authorised
Person Share`, bold: true
                            }, {
                                    rowSpan: 2, text: `Edelweiss
Share`, bold: true
                                }, {
                                    rowSpan: 2, text: `Subject to
Minimum retention
by EBL`, bold: true
                                }],
                            [``, `(in Rs per crore terms )`, ``, ``, ``, ``],
                            [{ text: `Commodities – Intraday/Settlement`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`MCX`, {
                                text: [`Rs`, { text: `    ${x12}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${p1}`, alignment: 'right' }, { text: `${q1}`, alignment: 'right' }, ``],
                            [`NCDEX`, {
                                text: [`Rs`, { text: `    ${x13}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${r1}`, alignment: 'right' }, { text: `${s1}`, alignment: 'right' }, ``],
                            [{ text: `Commodities – Delivery`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`MCX`, {
                                text: [`Rs`, { text: `    ${x14}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${t1}`, alignment: 'right' }, { text: `${u1}`, alignment: 'right' }, ``],
                            [`NCDEX`, {
                                text: [`Rs`, { text: `    ${x15}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${v1}`, alignment: 'right' }, { text: `${w1}`, alignment: 'right' }, ``],
                            [{ text: `Client Subscription fees*`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`All Commodities 
Exchanges & 
Segments
`, { text: `NA`, alignment: 'center' }, {
                                    text: `
OR `, alignment: 'center'
                                }, { text: `%`, alignment: 'right' }, { text: `%`, alignment: 'right' }, ``],





                        ]
                    }
                },
                {
                    text: [
                        { text: `\n Code & Name of 1st Chain Authorised Person : `, bold: true, fontSize: 9 },
                        { text: `${apBrokerage2.Introducer_Code == null ? ' ' : apBrokerage2.Introducer_Code} - ${apGeneral.Account_Name == null ? ' ' : apGeneral.Account_Name.toUpperCase()}`, fontSize: 9, decoration: 'underline' }
                    ]
                },
                `\n`,
                {
                    style: 'tableExample',
                    fontSize: 8.5,
                    table: {
                        widths: [130, 110, 20, 60, 60, 90],

                        body: [
                            [{
                                rowSpan: 3, text: `
                    
                    SEGMENT`, bold: true
                            }, { text: `FIXED BROKERAGE`, bold: true }, { rowSpan: 3, text: ` ` }, { colSpan: 3, text: `SHARING RATIO (In % terms)`, bold: true }, ``, ``],
                            [``, { text: `To Edelweiss`, bold: true }, ``, {
                                rowSpan: 2, text: `Authorised
Person Share`, bold: true
                            }, {
                                    rowSpan: 2, text: `Edelweiss
Share`, bold: true
                                }, {
                                    rowSpan: 2, text: `Subject to
Minimum retention
by EBL`, bold: true
                                }],
                            [``, `(in Rs per crore terms )`, ``, ``, ``, ``],
                            [{ text: `Commodities – Intraday/Settlement`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`MCX`, {
                                text: [`Rs`, { text: `    ${xm}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${p1a}`, alignment: 'right' }, { text: `${q1a}`, alignment: 'right' }, ``],
                            [`NCDEX`, {
                                text: [`Rs`, { text: `    ${xn}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${r1a}`, alignment: 'right' }, { text: `${s1a}`, alignment: 'right' }, ``],
                            [{ text: `Commodities – Delivery`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`MCX`, {
                                text: [`Rs`, { text: `    ${xo}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, {
                                    rowSpan: 2, text: `

 OR `, alignment: 'center'
                                }, { text: `${t1a}`, alignment: 'right' }, { text: `${u1a}`, alignment: 'right' }, ``],
                            [`NCDEX`, {
                                text: [`Rs`, { text: `    ${xp}    `, decoration: 'underline' }, ` Per 
                            Crore`]
                            }, ``, { text: `${v1a}`, alignment: 'right' }, { text: `${w1a}`, alignment: 'right' }, ``],
                            [{ text: `Client Subscription fees*`, bold: 'true', border: [true, true, false, true], }, { text: `\n`, border: [false, true, false, true] }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, false, true], }, { text: `\n`, border: [false, true, true, true], }],
                            [`All Commodities 
Exchanges & 
Segments
`, { text: `NA`, alignment: 'center' }, {
                                    text: `
OR `, alignment: 'center'
                                }, { text: `%`, alignment: 'right' }, { text: `%`, alignment: 'right' }, ``],





                        ]
                    }
                },

                {
                    text: `\n*Note : The Amount received from the client towards the subscription Plan selected will be shared with the Authorised Person \n
Edelweiss Broking Limited                                                             Authorised Person Name: ___________________\n\n
Authorised Signatory                                                                      AP Signature:\n
Witness Name                                                                                 Witness Name
(on Behalf Of Edelweiss):                                                             (On Behalf of AP):\n
Witness Signature:                                                                         Witness Signature:\n
Additional Charges or specific conditions for calculation\n`, fontSize: 8.5, bold: true
                },
                {
                    text: `if any:_____________________________________________________________\n
The brokerage share of Authorised Person shall be calculated on monthly basis and the account between the Member and the AP shall be settled by the 10th of the following month\n\n
Date: __________________________                                                             Place: __________________________
`, fontSize: 8.5, bold: true
                },

            ]
        }
        return dd
    }
}
