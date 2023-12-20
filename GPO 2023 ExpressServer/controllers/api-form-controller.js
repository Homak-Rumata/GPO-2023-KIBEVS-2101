const { Person, 
        Role,
        Person_Role,
        Student,
        Kafedra,
        Group,
        Naprav,
        Vid_Tip,
        Form,
        Op} = require("../models/db");
const handleError = (res, error) => {
  res.status(500).send(error.message);
}

/*
ввёл данные
"/getInfo" 
req.body =
{"FirstNameTextField":"Имя пользователя",
"SecondNameTextField":"Фамилия пользователя",
"TreeNameTextField":"Иванович",

"Grp":"Группа пользователя",
"Direction":"Направление подготовки",
"PracticeSort":"Вид практики",
"PracticeType":"Тип практики",
"FirstTime":"2022-01-01",
"LastTime":"2023-03-02",

"id":ID Поста,
"token":"Идентификатор сессии",
status":"В каком статусе находится заявление",

"WorkLeaderSecondNameTextField":"Фамилия руководителя",
"WorkLeaderTreeNameTextField":"Отчество Руководителя",

"CafedralLeaderFirstNameTextField":"Имя заведующего",
"CafedralLeaderSecondNameTextField":"Фамилия заведующего",
"CafedralLeaderTreeNameTextField":"Отчество заведующего",

"FactoryNameTextField":"Наименование компании",
"RegionNameTextField":"Область предприятия",
"DistrictNameTextField":"Район предприятия",

"LocalityNameTextField":"Населённый пункт предприятия",
"StreetTextField":"Улица предприятия",

"buildingNumberTextField":"Дом предприятия",
"MailPostNumberTextField":"Почтовый индекс предприятия"}


res.send (Если не пусто, то выведет сообщение пользователю, что заполнено не так)
*/

const getInfo = async (req, res) => {
    let {FirstNameTextField, SecondNameTextField, TreeNameTextField,
        Grp, Direction, PracticeSort, PracticeType, FirstTime, 
        LastTime, id, token, status, CafedralLeaderFirstNameTextField,
        WorkLeaderSecondNameTextField, WorkLeaderTreeNameTextField,
        CafedralLeaderSecondNameTextField, CafedralLeaderTreeNameTextField,
        WorkLeaderFirstNameTextField} = req.body; 
    console.log(JSON.stringify(req.body, null, 3))

    let P = await Person.findOne({ where: { id: token }, include: Role });
    let R = P.Roles[0].id;
    let send = {};

    if(R == 1){
        const form = await Form.findOne({where: {id: id}});
        if (FirstTime != null && LastTime != null){
            form.datestart = FirstTime;
            form.dateend = LastTime;
        }        

        if (Grp != null && FirstNameTextField != null && SecondNameTextField != null) {
            const gr = await Group.findOne(
                {
                    where:  { Gr: Grp }
                });
            let persST;
            if (TreeNameTextField != null) {
                persST = await Person.findOne(
                    {
                    where: {[Op.or]: [ 
                        { Name: FirstNameTextField }, 
                        { FName: SecondNameTextField },
                        { OName: TreeNameTextField },
                    ]}
                });
            } else {
                persST = await Person.findOne(
                    {
                    where: {[Op.or]: [ 
                        { Name: FirstNameTextField }, 
                        { FName: SecondNameTextField }
                    ]}
                });
            }
            if (gr != null && persST != null) {
                const stud = await Student.findOne(
                    {
                        where: {[Op.or]: [ 
                            { Pers: persST.id }, 
                            { Gr: gr.Gr },
                        ]}
                    });
                stud.addGrID(form);
                stud.addStudID(form);

            } else send = {code: '1'}

        }

        if (Direction != null) {
            const nap = await Naprav.findOne(
                {
                    where:  { Name: Direction }, 
                });
            if (nap == null) send = {code: '1'}
        }

        if (PracticeSort != null && PracticeType != null) {
            const VT = await Vid_Tip.findOne(
                {
                    where:  {[Op.or]: [ 
                        { Vid: PracticeSort }, 
                        { Tip: PracticeType },
                      ]},
                });
            if (VT != null){
                VT.addVTID(form);
            }
            else send = {code: '1'};
        }

        if (CafedralLeaderFirstNameTextField != null && CafedralLeaderSecondNameTextField != null && CafedralLeaderTreeNameTextField != null){
            const persKAF = await Person.findOne(
                {
                    where: {[Op.or]: [ 
                        { Name: CafedralLeaderFirstNameTextField }, 
                        { FName: CafedralLeaderSecondNameTextField },
                        { OName: CafedralLeaderTreeNameTextField },
                        ]}
                });
            if (persKAF == null) send = {code: '1'}
        }

        if (WorkLeaderFirstNameTextField != null && WorkLeaderSecondNameTextField != null && WorkLeaderTreeNameTextField != null){
            const persWor = await Person.findOne(
                {
                    where: {[Op.or]: [ 
                        { Name: WorkLeaderFirstNameTextField }, 
                        { FName: WorkLeaderSecondNameTextField },
                        { OName: WorkLeaderTreeNameTextField },
                        ]}
                });
            if (persWor != null) persWor.addRuctusurID(form);
            else send = {code: '1'}
        }
        
        console.log(JSON.stringify(form, null, 3))
    }
    res
    .status (200)
    .send (send)
    .end
}

/*
"/setRecenze" req.dody = {"text":"Новый комментарий","id": ID-заявления,"token":Токен сессии,
"status": 1 - если принято, 0 - если отказано} 
//Важно, передать в status надо именно число, не "1" или "0", а 1 или 0. Можешь для проверки на 1 поделить

state: Статус заявления, 0-незаполненно, 2-Ответственный за оформленние док-тов на кафедре, 
                                  4-Руководитель практики от Университета, 6-Заведующий Кафедры, 
                                  5-Директор центра карьеры, 7-одобрено

*/

const setRecenze = async (req, res) => {
    let {text, id, token, status} = req.body;
    let P = await Person.findOne({ where: { id: token }, include: Role });
    let R = P.Roles[0].id;
    let form = await Form.findOne({where: {id: id}});

    if((R/1) != 1) {form.recenz = text;
    if (R == 2){
        if (status == 1) form.state = 4;
        else form.state = 0;
    }
    if (R == 4){
        if (status == 1) form.state = 6;
        else form.state = 0;
    }
    if (R == 6){
        if (status == 1) form.state = 5;
        else form.state = 0;
    }
    if (R == 5){
        if (status == 1) form.state = 7;
        else form.state = 0;
    }
    }
    else {
        console.log(status);
        if (status == 1) {form.state = 2; }  
    }
    form.save();
    res
    .status (200)
    .end
}
/*
берёт данные
'/getformDate' req.body 
{"id":ID-заявления,"token":token}

res.send {{
    "FirstNameTextField":"Имя пользователя",
    "SecondNameTextField":"Фамилия пользователя",
    "TreeNameTextField":"Иванович",

    "Group":"Группа пользователя",
    "Direction":"Направление подготовки",
    "PracticeSort":"Вид практики",
    "PracticeType":"Тип практики",
    "FirstTime":"2022-01-01",
    "LastTime":"2023-03-02","id":ID Поста,

    "token":"Идентификатор сессии"
    "status":"В каком статусе находится заявление",

    "WorkLeaderFirstNameTextField":"Имя руководителя",
    "WorkLeaderSecondNameTextField":"Фамилия руководителя",
    "WorkLeaderTreeNameTextField":"Отчество Руководителя",

    "CafedralLeaderFirstNameTextField":"Имя заведующего",
    "CafedralLeaderSecondNameTextField":"Фамилия заведующего",
    "CafedralLeaderTreeNameTextField":"Отчество заведующего",

    "FactoryNameTextField":"Наименование компании",
    "RegionNameTextField":"Область предприятия",
    "DistrictNameTextField":"Район предприятия",
    "LocalityNameTextField":"Населённый пункт предприятия",
    "StreetTextField":"Улица предприятия",
    "buildingNumberTextField":"Дом предприятия",
    "MailPostNumberTextField":"Почтовый индекс предприятия"}}
*/

const getformDate = async (req, res) => {
    const {id, token} = req.body;
    const form = await Form.findOne({
        where: {id: id}, 
        include: [{
            model: Vid_Tip, 
            as: "VTID", 
        },{
            model: Person, 
            as: "RuctusurID"
        }]
    });

    let vt;
    if(form.VTID != null){
        vt = form.VTID
    } else {
        vt = {VTID: [{ Vid: '', Tip: '' }]}
    }

    let dt = {datestart: '', dateend: ''};
    if(form.datestart != null)
        dt.datestart = form.datestart;
    if(form.dateend != null)
        dt.dateend = form.dateend;
    
    let ruc;
    if(form.Ruc_tusur != null){
        ruc = form.RuctusurID;
    } else {
        ruc = {Name: '', FName: '', OName: '' }
    }

    let stud;
    if (form.Stud != null){
        stud = await Student.findOne({
            where: {Pers: form.Stud}, 
            include:{
                model: Person,
                as: "PersonStudentID"
            }
        });
    } else {
        stud = {PersonStudentID : [ {Name: '', FName: '', OName: '' } ]}
    }

    let gr;    
    if (form.Gr != null){
        gr = await Group.findOne({
            where: {Gr: form.Gr}, 
            include: [{
                model: Kafedra, 
                as: "KafedraID", 
                include:{
                    model: Person, 
                    as: "PersonKafID", 
                }
            },{
                model: Naprav, 
                as: "NapravID"
            }]
        });
    } else {
        gr = {Gr: '', NapravID: {Name: ''}, KafedraID: {PersonKafID: {Name: '', FName: '', OName: '' }}}
    }


    let send = {
    FirstNameTextField: stud.PersonStudentID.Name,
    SecondNameTextField: stud.PersonStudentID.FName,
    TreeNameTextField: stud.PersonStudentID.OName,

    Grp: gr.Gr,
    Direction: gr.NapravID.Name,
    PracticeSort: vt.Vid,
    PracticeType: vt.Tip,
    FirstTime: dt.datestart,
    LastTime: dt.dateend,
    id: id,
    token: token,
    status: form.state,

    WorkLeaderFirstNameTextField: ruc.Name,
    WorkLeaderSecondNameTextField: ruc.FName,
    WorkLeaderTreeNameTextField: ruc.OName,

    CafedralLeaderFirstNameTextField: gr.KafedraID.PersonKafID.Name,
    CafedralLeaderSecondNameTextField: gr.KafedraID.PersonKafID.FName,
    CafedralLeaderTreeNameTextField: gr.KafedraID.PersonKafID.OName,

    FactoryNameTextField:"ТУСУР",
    RegionNameTextField:"Томская обл",
    DistrictNameTextField:"",
    LocalityNameTextField:"Томск",
    StreetTextField:"пр. Ленина",
    buildingNumberTextField:"40",
    MailPostNumberTextField:"634050"
    }


    res
    .status (200)
    .send (send)
    .end
}

module.exports = {
getInfo,
setRecenze,
getformDate, 
};
  
  