const pdfMake = require('pdfmake');
const fs = require("fs");
const PdfPrinter = require('pdfmake');


let Cafedral = "КИБЭВС";
let LeaderName = "Иванов Иван Иванович";
let StudentGroup = "711-2";
let StudentName = "Петров Петр Петрович";
let PracticViem = "Научной";
let PracticType = "";
let OrganizationName = "Томский университет систем радиоуправления и электронники";
let Adress = "Вершинина 46";
let FirstTime = "21.01.2023";
let LastTime = "11.11.2024"
let date = "01.01.2023";
let WorkerLeaderName = "Тихонов Тихон Тихонович"

function ReturnPDF({Cafedral, LeaderName, StudentGroup, StudentName, PracticViem, PracticType, OrganizationName, Adress, FirstTime, LastTime, date, WorkerLeaderName}) {

//

const PlaceHolder = "______________";

var fonts = {
    Roboto: {
        normal: 'fonts/roboto/TimesNewRomanRegular.ttf',
        bold: 'fonts/roboto/Roboto-Medium.ttf',
        italics: 'fonts/roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf'
    }
};

let docInfo = {

    info: {
        title: "Заявление на прохождение практики",
        author: "User",
        subject: "Theme",
        keywords: "Ключевые слова"
    },

    pageSize: 'A4',
    pageOrientation:'Portret',
    pageMargins:[45,30,60,60],

    content: [
        {
            text: `Заведующему кафедрой ${Cafedral} `+
            `${LeaderName} `+
            `от студента группы ${StudentGroup} `+
            `${StudentName}`,
            alignment: "justify",
            lineHeight: 1,
            fontSize: 14,
            margin: [350, 0, 0, 0]
        },
        {
            text: "\nЗаявление\n",
            bold: true,
            lineHeight: 1,
            alignment: "center",
            fontSize: 14,
            margin: [30, 20, 30, 10]
        },
        {
            lineHeight: 1,
            text: `\t Прошу направить меня для прохождения ${PracticViem} практики ${PracticType} `+
            `в профильную организацию "${OrganizationName}" ${"("+Adress+")"} c ${FirstTime} по ${LastTime}`,
            fontSize: 14,
            alignment: "justify",
            leadingIndent: 20
        },
        {
            lineHeight: 1,
            columns: [{text:`Дата ${date}`}, {text:`Подпись${PlaceHolder}`}],
            fontSize: 14,
            margin: [0, 40, 0, 100]
        },
        {
            columns: [
            {
                text:"Согласованно",
                widths: "auto",
                style: 'cell'
            },
            {
                text:"",
                widths: "*",
                style: 'cell'
            },
            {
                text:"",
                widths: "auto",
                style: 'cell'
            }
            ]
        },
        {
            columns: [
            {
                text:`Зав. кафедрой `,
                widths: "auto",
                style: 'cell'
            },
            {
                text:`${PlaceHolder}`,
                widths: "*",
                style: 'cell'
            },
            {
                text:`${LeaderName}`,
                widths: "auto",
                style: 'cell'
            }
            ]
        },
        {
            columns: [
            {
                text:`Руководитель практики\nот университета`,
                widths: "auto",
                style: 'cell'
            },
            {
                text:`${PlaceHolder}`,
                widths: "*",
                style: 'cell'
            },
            {
                text:`${WorkerLeaderName}`,
                widths: "auto",
                style: 'cell'
            }
            ]
        }
    ],
    styles: {
        cell: {
            margin: [0, 10, 0, 10],
            fontSize: 14,
            widths: [ 'auto', '*', 'auto'],
            lineHeight: 1
        }
    }

}

console.log(fonts);
let a = new PdfPrinter(fonts);
let pdfDoc = a.createPdfKitDocument(docInfo);

console.log (pdfDoc);

return pdfDoc;

}
let a = ReturnPDF({Cafedral, LeaderName, StudentGroup, StudentName, PracticViem, PracticType, OrganizationName, Adress, FirstTime, LastTime, date, WorkerLeaderName});
a.pipe(fs.createWriteStream("file.pdf"));
a.end();
//export default ReturnPDF;