const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './models/database.sqlite'
  });

async function connect (){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

class Person extends Model {}
class Role extends Model {}
class Person_Role extends Model {}
class Student extends Model {}
class Kafedra extends Model {}
class Group extends Model {}
class Naprav extends Model {}
class Vid_Tip extends Model {}
class Form extends Model {}

Person.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  FName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  OName: {
    type: DataTypes.TEXT
  }
}, {
  sequelize, 
  modelName: 'Person', 
  freezeTableName: true,
  timestamps: false
});

Vid_Tip.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Vid: {
    type: DataTypes.TEXT,
  },
  Tip: {
    type: DataTypes.TEXT
  }
}, {
  sequelize, 
  modelName: 'Vid_Tip', 
  freezeTableName: true,
  timestamps: false
});

Kafedra.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Zav: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id'
    }
  },
  Name: {
    type: DataTypes.TEXT
  }
}, {
  sequelize, 
  modelName: 'Kafedra', 
  freezeTableName: true,
  timestamps: false
});

Naprav.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Name: {
    type: DataTypes.TEXT
  },
  Profile: {
    type: DataTypes.TEXT
  }
}, {
  sequelize, 
  modelName: 'Naprav', 
  freezeTableName: true,
  timestamps: false
});

Group.init({
  Gr: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  Napr: {
    type: DataTypes.INTEGER,
    references: {
      model: Naprav,
      key: 'id'
    }
  },
  Kaf: {
    type: DataTypes.INTEGER,
    references: {
      model: Kafedra,
      key: 'id'
    }
  },
  kurs: {
    type: DataTypes.INTEGER
  },
}, {
  sequelize, 
  modelName: 'Group', 
  freezeTableName: true,
  timestamps: false
});

Student.init({
  Pers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    references: {
      model: Person,
      key: 'id'
    }
  },
  Gr: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
    unique: true,
    references: {
      model: Group,
      key: 'Gr'
    }
  },
  data: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize, 
  modelName: 'Student', 
  freezeTableName: true,
  timestamps: false
});

Role.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    timestamps: false
  }
}, {
  sequelize, 
  modelName: 'Role', 
  freezeTableName: true,
  timestamps: false
});

Person_Role.init({}, {
  sequelize, 
  modelName: 'Person_Role', 
  freezeTableName: true,
  timestamps: false
});

Form.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Stud: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'Pers'
    }
  },
  VT: {
    type: DataTypes.INTEGER,
    references: {
      model: Vid_Tip,
      key: 'id'
    }
  },
  Gr: {
    type: DataTypes.TEXT,
    references: {
      model: Student,
      key: 'Gr'
    }
  },
  Ruc_tusur: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id'
    }
  },
  Otv_po_nap: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id'
    }
  },
  Ruc_ot_org: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id'
    }
  },
  Otv_on_fac: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'id'
    }
  },
  state: {
    type: DataTypes.INTEGER,
    defaultValue: '0'
  },
  recenz: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_DATE'), // Текущая дата по умолчанию
  },
  datestart: {
    type: DataTypes.DATEONLY,
  },
  dateend: {
    type: DataTypes.DATEONLY,
  },
}, {
  sequelize, 
  modelName: 'Form', 
  freezeTableName: true,
  timestamps: false
});

Form.belongsTo(Vid_Tip, { as: 'VTID', foreignKey: 'VT', sourceKey: 'id' });
Vid_Tip.hasMany(Form, { as: 'VTID', foreignKey: 'VT', sourceKey: 'id' });

Form.belongsTo(Student, { as: 'StudID', foreignKey: 'Stud', sourceKey: 'Pers' });
Student.hasMany(Form, { as: 'StudID', foreignKey: 'Stud', sourceKey: 'Pers' });
Form.belongsTo(Student, { as: 'GrID', foreignKey: 'Gr', sourceKey: 'Gr' });
Student.hasMany(Form, { as: 'GrID', foreignKey: 'Gr', sourceKey: 'Gr' });

Form.belongsTo(Person, { as: 'RuctusurID', foreignKey: 'Ruc_tusur', sourceKey: 'id' });
Person.hasMany(Form, { as: 'RuctusurID', foreignKey: 'Ruc_tusur', sourceKey: 'id' });
Form.belongsTo(Person, { as: 'OyvponapID', foreignKey: 'Otv_po_nap', sourceKey: 'id' });
Person.hasMany(Form, { as: 'OyvponapID', foreignKey: 'Otv_po_nap', sourceKey: 'id' });
Form.belongsTo(Person, { as: 'RucotorgID', foreignKey: 'Ruc_ot_org', sourceKey: 'id' });
Person.hasMany(Form, { as: 'RucotorgID', foreignKey: 'Ruc_ot_org', sourceKey: 'id' });
Form.belongsTo(Person, { as: 'OtvonfacID', foreignKey: 'Otv_on_fac', sourceKey: 'id' });
Person.hasMany(Form, { as: 'OtvonfacID', foreignKey: 'Otv_on_fac', sourceKey: 'id' });

Group.belongsTo(Naprav, { as: 'NapravID', foreignKey: 'Napr', sourceKey: 'id' });
Group.belongsTo(Kafedra, { as: 'KafedraID', foreignKey: 'Kaf', sourceKey: 'id' });
Naprav.hasMany(Group, { as: 'NapravID', foreignKey: 'Napr', sourceKey: 'id' });
Kafedra.hasMany(Group, { as: 'KafedraID', foreignKey: 'Kaf', sourceKey: 'id' });

Student.belongsTo(Group, { as: 'GroupStudentID', foreignKey: 'Gr', sourceKey: 'Gr' });
Student.belongsTo(Person, { as: 'PersonStudentID', foreignKey: 'Pers', sourceKey: 'id' });
Group.hasMany(Student, { as: 'GroupStudentD', foreignKey: 'Gr', sourceKey: 'Gr' });
Person.hasMany(Student, { as: 'PersonStudentID', foreignKey: 'Pers', sourceKey: 'id' });

Person.hasMany(Kafedra, { as: 'PersonKafID', foreignKey: 'Zav', sourceKey: 'id' });
Kafedra.belongsTo(Person, { as: 'PersonKafID', foreignKey: 'Zav', sourceKey: 'id' });

Role.belongsToMany(Person, { through: Person_Role});
Person.belongsToMany(Role, { through: Person_Role});

module.exports = {
  Person,
  Role,
  Person_Role,
  Student,
  Kafedra,
  Group,
  Naprav,
  Vid_Tip,
  Form,
  connect,
  sequelize,
  Op
}