const { Person, 
        Role,
        Person_Role,
        Student,
        Kafedra,
        Group,
        Naprav,
        Vid_Tip,
        Form,
        connect,
        sequelize} = require("./db");

// Создание-заполнение бд
async function filldb () {
    await sequelize.sync({ alter: true });

     //Создание Пользователей
    const Student1 = await Person.create({ 
        Email: "tatarinov.m.731-1@e.tusur.ru",
        Password: "12345",
        Name: "Максим",
        FName: "Татаринов",
        OName: "Денисович"
    });
    const Student2 = await Person.create({ 
        Email: "repnikov.n.711-2@e.tusur.ru",
        Password: "12345",
        Name: "Никита",
        FName: "Репников",
        OName: "Иванович"
    });
    const OtvOnfac = await Person.create({ 
        Email: "etf@fb.tusur.ru",
        Password: "12345",
        Name: "Татьяна",
        FName: "Евенко",
        OName: "Францевна"
    });
    const Rucpractusur1 = await Person.create({ 
        Email: "ria@fb.tusur.ru",
        Password: "12345",
        Name: "Иван",
        FName: "Рахманенко",
        OName: "Андреевич"
    });
    const Rucpractusur2 = await Person.create({ 
        Email: "1man@fb.tusur.ru",
        Password: "12345",
        Name: "Андрей",
        FName: "Мальчуков",
        OName: "Николаевич"
    });
    const Dircentrcar = await Person.create({ 
        Email: "irina.a.trubcheninova@tusur.ru",
        Password: "12345",
        Name: "Ирина",
        FName: "Трубченинова",
        OName: "Анатольевна"
    });
    const ZavKafBIS = await Person.create({ 
        Email: "key@fb.tusur.ru",
        Password: "12345",
        Name: "Евгений",
        FName: "Костюченко",
        OName: "Юрьевич"
    });
    const ZavKafKIBEVS = await Person.create({ 
        Email: "saa@fb.tusur.ru",
        Password: "12345",
        Name: "Александр",
        FName: "Шелупанов",
        OName: "Александрович"
    });
    const ZavKafEB = await Person.create({ 
        Email: "polina.a.shelupanova@tusur.ru",
        Password: "12345",
        Name: "Полина",
        FName: "Шелупанова",
        OName: "Александровна"
    });

    // Создание ролей
    const role1 = await Role.create({
        Name: "Студент"
    });
    const role2 = await Role.create({
        Name: "Ответственный за заполнение документов на факультете"
    });
    const role3 = await Role.create({
        Name: "Ответственный по направлению"
    });
    const role4 = await Role.create({
        Name: "Руководитель практики от ТУСУРа"
    });
    const role5 = await Role.create({
        Name: "Директор центра карьеры"
    });
    const role6 = await Role.create({
        Name: "Заведующий кафедрой"
    });

    // Присвоение ролей пользователям
    await role1.addPerson(Student1);
    await role1.addPerson(Student2);
    await role2.addPerson(OtvOnfac);
    await role4.addPerson(Rucpractusur1);
    await role4.addPerson(Rucpractusur2);
    await role5.addPerson(Dircentrcar);
    await role6.addPerson(ZavKafBIS);
    await role6.addPerson(ZavKafKIBEVS);
    await role6.addPerson(ZavKafEB);
    
    await Student1.addRole(role1);
    await Student2.addRole(role1);
    await OtvOnfac.addRole(role2);
    await Rucpractusur1.addRole(role4);
    await Rucpractusur2.addRole(role4);
    await Dircentrcar.addRole(role5);
    await ZavKafBIS.addRole(role6);
    await ZavKafKIBEVS.addRole(role6);
    await ZavKafEB.addRole(role6);

    // Создание кафедр
    const KafBIS = await Kafedra.create({ 
        Name: "БИС",
        Zav: ZavKafBIS.id
    });
    const KafKIBEVS = await Kafedra.create({ 
        Name: "КИБЭВС",
        Zav: ZavKafKIBEVS.id
    });
    const KafEB = await Kafedra.create({ 
        Name: "ЭБ",
        Zav: ZavKafEB.id
    });

    // Создание направлений
    const nap1 = await Naprav.create({
        Code: "10.03.01",
        Name: "Информационная безопасность",
        Profile: "Безопасность автоматизированных систем",
    });
    const nap2 = await Naprav.create({ 
        Code: "10.05.02",
        Name: "Информационная безопасность телекоммуникационных систем",
        Profile: "Управление безопасностью телекоммуникационных систем и сетей",
    });
    const nap3 = await Naprav.create({ 
        Code: "10.05.03",
        Name: "Информационная безопасность автоматизированных систем",
        Profile: "Безопасность автоматизированных систем в кредитно-финансовой сфере",
    });
    const nap4 = await Naprav.create({ 
        Code: "10.05.04",
        Name: "Информационно-аналитические системы безопасности",
        Profile: "Информационная безопасность финансовых и экономических структур",
    });
    const nap5 = await Naprav.create({ 
        Code: "38.05.01",
        Name: "Экономическая безопасность",
        Profile: "Экономико-правовое обеспечение экономической безопасности",
    });
    const nap6 = await Naprav.create({ 
        Code: "09.04.04",
        Name: "Программная инженерия",
        Profile: "Искусственный интеллект в безопасности киберфизических систем",
    });
    const nap7 = await Naprav.create({ 
        Code: "10.04.01",
        Name: "Информационная безопасность",
        Profile: "Информационная безопасность объектов критической информационной инфраструктуры",
    });

    // Создание вид-тип практики
    const vt1 = await Vid_Tip.create({ 
        Vid: 'Производственная',
        Tip: '',
    });
    const vt2 = await Vid_Tip.create({ 
        Vid: 'Учебная',
        Tip: '',
    });
    const vt3 = await Vid_Tip.create({ 
        Vid: 'Производственная',
        Tip: 'Преддипломная',
    });

    // Создание групп
    // 1 курс
    const gr7131 = await Group.create({ 
        Gr: '713-1',
        kurs: '1',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7132 = await Group.create({ 
        Gr: '713-2',
        kurs: '1',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7231 = await Group.create({ 
        Gr: '723-1',
        kurs: '1',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7232 = await Group.create({ 
        Gr: '723-2',
        kurs: '1',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7331 = await Group.create({ 
        Gr: '733-1',
        kurs: '1',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7431 = await Group.create({ 
        Gr: '743-1',
        kurs: '1',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7432 = await Group.create({ 
        Gr: '741-2',
        kurs: '1',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7631 = await Group.create({ 
        Gr: '763-1',
        kurs: '1',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });
    const gr713m = await Group.create({ 
        Gr: '713-М',
        kurs: '1',
        Napr: nap6.id, 
        Kaf: KafKIBEVS.id
    });
    const gr723m = await Group.create({ 
        Gr: '723-М',
        kurs: '1',
        Napr: nap7.id, 
        Kaf: KafKIBEVS.id
    });
    // 2 курс
    const gr7121 = await Group.create({ 
        Gr: '712-1',
        kurs: '2',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7122 = await Group.create({ 
        Gr: '712-2',
        kurs: '2',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7221 = await Group.create({ 
        Gr: '722-1',
        kurs: '2',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7321 = await Group.create({ 
        Gr: '732-1',
        kurs: '2',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7322 = await Group.create({ 
        Gr: '732-2',
        kurs: '2',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7421 = await Group.create({ 
        Gr: '742-1',
        kurs: '2',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7422 = await Group.create({ 
        Gr: '742-2',
        kurs: '2',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7621 = await Group.create({ 
        Gr: '762-1',
        kurs: '2',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });
    const gr7622 = await Group.create({ 
        Gr: '762-2',
        kurs: '2',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });
    const gr712m = await Group.create({ 
        Gr: '712-М',
        kurs: '2',
        Napr: nap6.id, 
        Kaf: KafKIBEVS.id
    });
    // 3 курс
    const gr7111 = await Group.create({ 
        Gr: '711-1',
        kurs: '3',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7112 = await Group.create({ 
        Gr: '711-2',
        kurs: '3',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7211 = await Group.create({ 
        Gr: '721-1',
        kurs: '3',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7212 = await Group.create({ 
        Gr: '721-2',
        kurs: '3',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7311 = await Group.create({ 
        Gr: '731-1',
        kurs: '3',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7312 = await Group.create({ 
        Gr: '731-2',
        kurs: '3',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7411 = await Group.create({ 
        Gr: '741-1',
        kurs: '3',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7611 = await Group.create({ 
        Gr: '761-1',
        kurs: '3',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });
    // 4 курс
    const gr7101 = await Group.create({ 
        Gr: '710-1',
        kurs: '4',
        Napr: nap1.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7201 = await Group.create({ 
        Gr: '720-1',
        kurs: '4',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7301 = await Group.create({ 
        Gr: '730-1',
        kurs: '4',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7401 = await Group.create({ 
        Gr: '740-1',
        kurs: '4',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7601 = await Group.create({ 
        Gr: '760-1',
        kurs: '4',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });
    // 5 курс
    const gr7291 = await Group.create({ 
        Gr: '729-1',
        kurs: '5',
        Napr: nap3.id, 
        Kaf: KafKIBEVS.id
    });
    const gr7391 = await Group.create({ 
        Gr: '739-1',
        kurs: '5',
        Napr: nap2.id, 
        Kaf: KafBIS.id
    });
    const gr7491 = await Group.create({ 
        Gr: '749-1',
        kurs: '5',
        Napr: nap4.id, 
        Kaf: KafBIS.id
    });
    const gr7691 = await Group.create({ 
        Gr: '769-1',
        kurs: '5',
        Napr: nap5.id, 
        Kaf: KafEB.id
    });

    // Создание студентов
    const st1 = await Student.create({ 
        Pers: Student1.id,
        Gr: gr7311.Gr,
        data: '2021',
    });
    const st2 = await Student.create({ 
        Pers: Student2.id,
        Gr: gr7112.Gr,
        data: '2021',
    });
}
async function doit () {
    connect(); 
    filldb();
    /* //Get ролей
    const role1 = await Role.findOne({ where: { id: '1' } });
    const role2 = await Role.findOne({ where: { id: '2' } });
    const role3 = await Role.findOne({ where: { id: '3' } });
    const role4 = await Role.findOne({ where: { id: '4' } });
    const role5 = await Role.findOne({ where: { id: '5' } });
    const role6 = await Role.findOne({ where: { id: '6' } });
    */
    
    /* //Переменные
    const Student1 = await Person.findOne({ where: { id: '1' } });
    const Student2 = await Person.findOne({ where: { id: '2' } });
    const OtvOnfac = await Person.findOne({ where: { id: '3' } });
    const Otvponap1 = await Person.findOne({ where: { id: '4' } });
    const Otvponap2 = await Person.findOne({ where: { id: '5' } });
    const Rucpractusur = await Person.findOne({ where: { id: '6' } });
    const Dircentrcar = await Person.findOne({ where: { id: '7' } });
    const ZavKaf1 = await Person.findOne({ where: { id: '8' } });
    const ZavKaf2 = await Person.findOne({ where: { id: '9' } });
   
    const Kaf1 = await Kafedra.findOne({ where: { id: '1' } });
    const Kaf2 = await Kafedra.findOne({ where: { id: '2' } });
    
    const nap1 = await Naprav.findOne({ where: { id: '1' } });
    const nap2 = await Naprav.findOne({ where: { id: '2' } });

    const vt1 = await Vid_Tip.findOne({ where: { id: '1' } });
    const vt2 = await Vid_Tip.findOne({ where: { id: '2' } });

    const gr1 = await Group.findOne({ where: { Gr: '700' } });
    const gr2 = await Group.findOne({ where: { Gr: '701' } });

    const st1 = await Student.findOne({ where: { Gr: '700' } });
    const st2 = await Student.findOne({ where: { Gr: '701' } });
    */
    //console.log();
    /*
    let stud = await Student.findOne({
        where: {Pers: '1'}, 
        include:{
            model: Person,
            as: "PersonStudentID"
        }
    });

    console.log(JSON.stringify(stud, null, 3))
    console.log(stud.PersonStudentID.Name);
    */
}

try{
    doit();
    console.log("Работаем");
} catch (error){
    console.log("Ошибка")
}