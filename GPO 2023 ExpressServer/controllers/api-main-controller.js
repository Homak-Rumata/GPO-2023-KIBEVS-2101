const { Person, 
        Role,
        Person_Role,
        Student,
        Kafedra,
        Group,
        Naprav,
        Vid_Tip,
        Form,
        Op,} = require("../models/db");

const handleError = (res, error) => {
  res.status(500).send(error.message);
}

const autorize = async (req, res) => {
  // {login: "Введённый логин", password: "Введённый пароль"}
  let send;
  console.log(JSON.stringify(req.body))
  let P = await Person.findOne({ where: { Email: req.body.login }, include: Role });
  console.log(JSON.stringify(P))
  if (P !== null){
      if (P.Password == req.body.password){
          send = {token: P.id, rule: P.Roles[0].id == 1 ? '0' : '1'}
      } else {
          send = {message: "Неверный пароль"}
      }
  } else {
    send = {message: "Такого пользователя не существует"}
  }
  
  res
    .status (200)
    .send (send)
    .end
}

/* 
"/NewStatmen" req.body = {login: token}
Отсылаешь ID нового заявления.
res
.send({id: ID нового заявления})
*/

const newstatmen = async (req, res) => {
  let {login} = req.body;
  let newForm = await Form.create({});
  console.log(newForm.id);
  res
    .status (200)
    .send ({id: newForm.id})
    .end
}

/*
"/getRecenze" req.body = {"id": ID заявления}
res.send ({text: "Информация для пользователя "})
*/

const getRecenze = async (req, res) => {
  let {id} = req.body;
  let newForm = await Form.findOne({where: {id: id}});
  console.log(newForm.recenz);
  res
    .status (200)
    .send ({text: newForm.recenz})
    .end
}

/*
"/getstatmens" req.body = {userlogin: token пользователя}
res
.status (200)
.send ([{id: ID Поста,
        tyme: Время подачи заявления,
        status: Статус заявления, 0-незаполненно, 2-Ответственный за оформленние док-тов на кафедре, 
                                  4-Руководитель практики от Университета, 6-Заведующий Кафедры, 
                                  5-Директор центра карьеры, 7-одобрено
        type: тип практики: 0-производственна, 1-научная}, ...]

*/

const getstatmens = async (req, res) => {
  const {userlogin} = req.body;
  let forms; //
  let send = [];
  let P = await Person.findOne({ where: { id: userlogin }, include: Role });
  let R = P.Roles[0].id;
  if(R == 1){
    forms = await Form.findAll(
      {include: [{model: Vid_Tip, as: "VTID"}]});
  }
  else if(R !== 3) forms = await Form.findAll({where: {state: R}, include: [{model: Vid_Tip, as: "VTID"}]});

  console.log(JSON.stringify(forms, null, 3));

  forms.forEach((form) => {
    send.push({
      id: form.id,
      status: form.state,
      tyme: form.date,
      type: form.VT == null ? "" : form.VTID.Vid
    });
  });

  res
    .status (200)
    .send (send)
    .end
}

module.exports = {
  autorize,
  newstatmen,
  getRecenze, 
  getstatmens,
};

