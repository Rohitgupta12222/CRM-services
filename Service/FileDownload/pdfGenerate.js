const path = require('path')
const express = require('express')
let router = express.Router()
const pdfMake = require('pdfmake/build/pdfmake');
// const d1 = require(process.cwd() + '/playground/BSE- AP Agreement')
// const d2 = require(process.cwd() + '/playground/BSE- AP Application')
// const d3 = require(process.cwd() + '/playground/MCX AP Agreement')
// const d4 = require(process.cwd() + '/playground/MCX AP FORMAT')
// const d5 = require(process.cwd() + '/playground/NSE AP Agreement')
// const d6 = require(process.cwd() + '/playground/NSE AP Application')
// const d7 = require(process.cwd() + '/playground/NCDEX  1 TO 5')
// const d8 = require(process.cwd() + '/playground/NCDEX Agreement')
const d9 = require(process.cwd() + '/playground/BSE - Annexure 2b (i) - Individual')
const d10 = require(process.cwd() + '/playground/BSE - Annexure 2b (i) - Non Individual')
const d11 = require(process.cwd() + '/playground/BSE - Annexure 2b (ii)(Individual&NonIndividual)')
const d12 = require(process.cwd() + '/playground/BSE - Annexure 2b (iv) - Non Individual')
const d13 = require(process.cwd() + '/playground/BSE - AP Agreement(Individual&NonIndividual)')
const d14 = require(process.cwd() + '/playground/BSE - AP Application(Individual&NonIndividual)')
const d15 = require(process.cwd() + '/playground/NSE - Annexure 2(Individual&NonIndividual)')
const d16 = require(process.cwd() + '/playground/NSE - Annexure 3 - Non Individual(PartnershipLLP)')
const d17 = require(process.cwd() + '/playground/NSE - Annexure 3 - Non Individual(Corporate body)')
const d18 = require(process.cwd() + '/playground/NSE - Annexure 4 - Non Individual')
const d19 = require(process.cwd() + '/playground/NSE - AP Agreement(Individual&NonIndividual)')
const d20 = require(process.cwd() + '/playground/NSE - AP Application(Individual&NonIndividual)')


const d31 = require(process.cwd() + '/playground/MCX - AP3(Individual&NonIndividual)')
const d32 = require(process.cwd() + '/playground/MCX - AP5(a) - NonIndividual(Corporate)')
const d33 = require(process.cwd() + '/playground/MCX - AP5(b) - NonIndividual(PartnershipLLP)')
const d34 = require(process.cwd() + '/playground/MCX - Application Form(Individual&NonIndividual)')
const d35 = require(process.cwd() + '/playground/MCX - AP4(Individual&NonIndividual)')
const d36 = require(process.cwd() + '/playground/MCX - AP Agreement(Individual&NonIndividual)')

const d37 = require(process.cwd() + '/playground/NCDEX - Annexure 1(Individual&NonIndividual)-AP')
const d38 = require(process.cwd() + '/playground/NCDEX - Annexure 2(Individual&NonIndividual)-AP')
const d39 = require(process.cwd() + '/playground/NCDEX - Annexure 3(Individual&NonIndividual)')
const d40 = require(process.cwd() + '/playground/NCDEX - Annexure 4 - NonIndividual(Corporate)')
const d41 = require(process.cwd() + '/playground/NCDEX - Annexure 4 - NonIndividual(PartnershipLLP)')
const d42 = require(process.cwd() + '/playground/NCDEX - Annexure 5(NonIndividual)')
const d44 = require(process.cwd() + '/playground/NCDEX - Annexure 5(Individual)')
const d43 = require(process.cwd() + '/playground/NCDEX - Annexure 6(Individual&NonIndividual)')
//const d44 = require(process.cwd() + '/playground/NCDEX - Annexure 1(Individual&NonIndividual)')

const d51 = require(process.cwd() + '/playground/BSE AP Notice format')
const d52 = require(process.cwd() + '/playground/MCX AP Notice format')
const d53 = require(process.cwd() + '/playground/MCX Covering Letter for Termination Notice')
const d54 = require(process.cwd() + '/playground/NCDEX Covering Letter_EBL')
const d55 = require(process.cwd() + '/playground/Bank NEFT - Activation')

const d71 = require(process.cwd() + '/playground/BSE_ANNX_1 & 3')
const d72 = require(process.cwd() + '/playground/MCX covering letter for closure request')
const d73 = require(process.cwd() + '/playground/NCDEX_AP_NOTICE')
const d74 = require(process.cwd() + '/playground/NSE_ AP_NOTICE')
const d75 = require(process.cwd() + '/playground/Bank NEFT - Modification')
const d76 = require(process.cwd() + '/playground/BSE - Annexure 2b (v) - Non Individual')
const d77 = require(process.cwd() + '/playground/GST Invoice')
const d78 = require(process.cwd() + '/playground/Profession-Invoice')
const d79 = require(process.cwd() + '/playground/NCDEX Modificaiton Letter')
const d80 = require(process.cwd() + '/playground/BSE Modification Letter')
const d81 = require(process.cwd() + '/playground/NSE Modification Letter')
const d82 = require(process.cwd() + '/playground/NCDEX - Annexure 1(Individual&NonIndividual)-EBL')
const d83 = require(process.cwd() + '/playground/NCDEX - Annexure 2(Individual&NonIndividual)-EBL')

const d84 = require(process.cwd() + '/playground/Undertaking')
const d85 = require(process.cwd() + '/playground/MSMED')
const d86 = require(process.cwd() + '/playground/AP-MOU')
const d87 = require(process.cwd() + '/playground/Background Verfication Form')
const d88 = require(process.cwd() + '/playground/NEFT-Bank Details')
const d89 = require(process.cwd() + '/playground/MCX Modification Letter')





const fs = require('fs')
var fonts = {
    Roboto: {
        normal: process.cwd() + '/fonts/calibri.ttf',
        bold: process.cwd() + '/fonts/calibrib.ttf',
        italics: process.cwd() + '/fonts/calibril.ttf',

    },
    FontAwesome: {
        normal: process.cwd() + '/fonts/fontawesome-webfont.ttf'
    }
};
var PdfPrinter = require('pdfmake/src/printer');
var printer = new PdfPrinter(fonts);


router.post('/createPdf', async (req, res) => {
    try {
        console.log(req.body);
        let apId = req.body.apId
        var filename = req.body.filename;


        var pdfDoc;
        let temp;

        if (req.body.process == 'APClosure') {
            let base64PdfData = []
            for (let i = 0; i < filename.length; i++) {
                if (filename[i] == 'NCDEX_AP_NOTICE') {
                    temp = await d73.createDocDefinition(req.body)
                } else if (filename[i] == 'NSE_ AP_NOTICE') {
                    temp = await d74.createDocDefinition(req.body)
                }
                else if (filename[i] == 'BSE AP Notice format') {
                    temp = await d51.createDocDefinition(req.body);
                } else if (filename[i] == 'MCX AP Notice format') {
                    temp = await d52.createDocDefinition(req.body);
                } else if (filename[i] == 'BSE_ANNX_1 & 3') {
                    temp = await d71.createDocDefinition(req.body)
                } else if (filename[i] == 'MCX covering letter for closure request') {
                    temp = await d72.createDocDefinition(req.body)
                } else if (filename[i] == 'MCX Covering Letter for Termination Notice') {
                    temp = await d53.createDocDefinition(req.body);
                } else if (filename[i] == 'NCDEX Covering Letter_EBL') {
                    temp = await d54.createDocDefinition(req.body);
                }
                generatePdf(temp, filename[i])
                await delay(2000)
                let obj = {}
                obj.fileName = filename[i]
                obj.fileData = fs.readFileSync(path.join(process.cwd() + '/convertedDoc1/' + filename[i] + '.pdf')).toString('base64')
                base64PdfData.push(obj)


            }
            return res.status(200).send({ Success: true, Data: base64PdfData });

        } else if (req.body.process == 'NEFTActivation') {
            let base64PdfData1 = []
            for (let i = 0; i < filename.length; i++) {
                console.log("filename[i]",filename[i]);
                if (filename[i].filename == 'Bank NEFT - Activation') {

                    temp = await d55.createDocDefinition(filename[i]);

                } else if (filename[i].filename == 'Bank NEFT - Modification') {

                    temp = await d75.createDocDefinition(filename[i])

                }
                generatePdf(temp, filename[i])
                await delay(2000)
                let obj1 = {}
                obj1.fileName = filename[i]
                obj1.fileData = fs.readFileSync(path.join(process.cwd() + '/convertedDoc1/' + filename[i] + '.pdf')).toString('base64')
                base64PdfData1.push(obj1)


            }
            return res.status(200).send({ Success: true, Data: base64PdfData1 });


        }
        else if(req.body.process == 'InvoiceProcessing'){

            let InvoiceProcessingbase64PdfData = []
            for (let i = 0; i < filename.length; i++) {
                // console.log("filename[i]",filename[i]);
                if (filename[i].filename == 'Profession-Invoice') {

                    temp = await d77.createDocDefinition(filename[i]);

                } else if (filename[i].filename == 'GST Invoice') {

                    temp = await d78.createDocDefinition(filename[i]);

                }
                generatePdf(temp, filename[i])
                await delay(2000)
                let obj1 = {}
                obj1.fileName = filename[i]
                obj1.fileData = fs.readFileSync(path.join(process.cwd() + '/convertedDoc1/' + filename[i] + '.pdf')).toString('base64')
                InvoiceProcessingbase64PdfData.push(obj1)


            }
            return res.status(200).send({ Success: true, Data: InvoiceProcessingbase64PdfData });

        }
        else { 
            if (filename == 'BSE - Annexure 2b (i) - Individual') {
                temp = await d9.createDocDefinition(req.body);
            } else if (filename == 'BSE - Annexure 2b (i) - Non Individual') {
                temp = await d10.createDocDefinition(req.body);
            } else if (filename == 'BSE - Annexure 2b (ii)(Individual&NonIndividual)') {
                temp = await d11.createDocDefinition(req.body)
            } else if (filename == 'BSE - Annexure 2b (iv) - Non Individual') {
                temp = await d12.createDocDefinition(req.body)
            } else if (filename == 'BSE - AP Agreement(Individual&NonIndividual)') {
                temp = await d13.createDocDefinition(req.body)
                //console.log('temp', temp)

            } else if (filename == 'BSE - AP Application(Individual&NonIndividual)') {
                temp = await d14.createDocDefinition(req.body);
            } else if (filename == 'NSE - Annexure 2(Individual&NonIndividual)') {
                temp = await d15.createDocDefinition(req.body)
                //pdfDoc = printer.createPdfKitDocument(temp);
            } else if (filename == 'NSE - Annexure 3 - Non Individual(Corporate body)') {
                temp = await d17.createDocDefinition(req.body);
            } else if (filename == 'NSE - Annexure 3 - Non Individual(PartnershipLLP)') {
                temp = await d16.createDocDefinition(req.body)
                //pdfDoc = await printer.createPdfKitDocument(d17.createDocDefinition(req.body));
            } else if (filename == 'NSE - Annexure 4 - Non Individual') {
                temp = await d18.createDocDefinition(req.body);
            } else if (filename == 'NSE - AP Agreement(Individual&NonIndividual)') {
                temp = await d19.createDocDefinition(req.body);
            } else if (filename == 'NSE - AP Application(Individual&NonIndividual)') {
                temp = await d20.createDocDefinition(req.body);
            }
            else if (filename == 'MCX - AP3(Individual&NonIndividual)') {
                temp = await d31.createDocDefinition(req.body);
            } else if (filename == 'MCX - AP5(a) - NonIndividual(Corporate)') {
                temp = await d32.createDocDefinition(req.body);
            } else if (filename == 'MCX - AP5(b) - NonIndividual(PartnershipLLP)') {
                temp = await d33.createDocDefinition(req.body);
            } else if (filename == 'MCX - Application Form(Individual&NonIndividual)') {
                temp = await d34.createDocDefinition(req.body);
            } else if (filename == 'MCX - AP4(Individual&NonIndividual)') {
                temp = await d35.createDocDefinition(req.body);
            } else if (filename == 'MCX - AP Agreement(Individual&NonIndividual)') {
                temp = await d36.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 1(Individual&NonIndividual)-AP') {
                temp = await d37.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 2(Individual&NonIndividual)-AP') {
                temp = await d38.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 3(Individual&NonIndividual)') {
                temp = await d39.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 4 - NonIndividual(Corporate)') {
                temp = await d40.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 4 - NonIndividual(PartnershipLLP)') {
                temp = await d41.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 5(NonIndividual)') {
                temp = await d42.createDocDefinition(req.body);
            } else if (filename == 'NCDEX - Annexure 6(Individual&NonIndividual)') {
                temp = await d43.createDocDefinition(req.body);
            }  else if (filename == 'NCDEX - Annexure 5(Individual)') {
                temp = await d44.createDocDefinition(req.body);
            } else if (filename == 'BSE - Annexure 2b (v) - Non Individual') {
                temp = await d76.createDocDefinition(req.body)
            } else if (filename == 'GST Invoice') {
                temp = await d77.createDocDefinition(req.body)
            }else if (filename == 'Profession-Invoice') {
                temp = await d78.createDocDefinition(req.body)
            }else if (filename == 'NCDEX Modificaiton Letter') {
                temp = await d79.createDocDefinition(req.body)
            }else if (filename == 'BSE Modification Letter') {
                temp = await d80.createDocDefinition(req.body)
            }else if (filename == 'NSE Modification Letter') {
                temp = await d81.createDocDefinition(req.body)
            }else if (filename == 'NCDEX - Annexure 1(Individual&NonIndividual)-EBL') {
                temp = await d82.createDocDefinition(req.body)
            }else if (filename == 'NCDEX - Annexure 2(Individual&NonIndividual)-EBL') {
                temp = await d83.createDocDefinition(req.body)
            }
            else if (filename == 'MCX Modification Letter') {
                temp = await d89.createDocDefinition(req.body)
            }

            else if (filename == 'Bank NEFT - Activation') {
                temp = await d55.createDocDefinition(req.body)
            }

            else if (filename == 'Bank NEFT - Modification') {
                temp = await d75.createDocDefinition(req.body)
            }

            else if (filename == 'Undertaking') {
                temp = await d84.createDocDefinition(req.body)
            }
            else if (filename == 'MSMED') {
                temp = await d85.createDocDefinition(req.body)

            }
            else if (filename == 'AP-MOU') {
                temp = await d86.createDocDefinition(req.body)
            }
            else if (filename == 'Background Verfication Form') {
                temp = await d87.createDocDefinition(req.body)
            }
            else if (filename == 'NEFT-Bank Details') {
                temp = await d88.createDocDefinition(req.body)
            }
            
            else {
                res.status(200).send({ Success: false, Data: null });

            }
            generatePdf(temp, filename)
         

            setTimeout(() => {
                let buffer = fs.readFileSync(path.join(process.cwd() + '/convertedDoc1/' + filename + '.pdf'))
                // fs.unlinkSync(path.join(process.cwd() + '/convertedDoc1/' + filename + '.pdf'))
                //  res.status(200).send({ Success: true, Data: buffer});
                res.status(200).send({ Success: true, Data: buffer.toString('base64') });

            }, 2000);

        }
    } catch (error) {
        console.log(error)
        res.status(200).send({ Success: false, Data: null });

    }


})

function generatePdf(docDefinition, filename) {

    pdfDoc = printer.createPdfKitDocument(docDefinition);

    pdfDoc.pipe(fs.createWriteStream(path.join(process.cwd() + '/convertedDoc1/' + filename + '.pdf')));
    pdfDoc.end()
}
async function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

module.exports = router