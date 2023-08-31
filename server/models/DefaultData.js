const { v4: uuidv4 } = require("uuid");

const User = require("./User");
const Role = require("./Role");

async function setDefaultData() {
  try {
    let admin_id = null;
    let moderator_id = null;
    let user_id = null;

    const count_role = await Role.count();

    if (count_role === 0) {
      admin_id = uuidv4();
      moderator_id = uuidv4();
      user_id = uuidv4();

      await Role.create({ id: admin_id, name: "Admin" });
      await Role.create({ id: moderator_id, name: "Moderator" });
      await Role.create({ id: user_id, name: "User" });
    }

    const count_user = await User.count();

    if (count_user === 0) {
      if (admin_id === null || moderator_id === null || user_id === null) {
        let admin_role = await Role.findOne({ where: { name: "Admin" } });
        admin_id = admin_role.id;
        let moderator_role = await Role.findOne({ where: { name: "Moderator" } });
        moderator_id = moderator_role.id;
        let user_role = await Role.findOne({ where: { name: "User" } });
        user_id = user_role.id;
      }
      //made hash passwords default users
      const hash_password_admin = await bcrypt.hash("admin", 5);
      const hash_password_moderator = await bcrypt.hash("moderator", 5);
      const hash_password_user = await bcrypt.hash("user", 5);

      await User.create({
        id: uuidv4(),
        name: "Admin",
        email: "admin@example.com",
        password: hash_password_admin,
        role_id: admin_id,
        is_locked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "Moderator",
        email: "moderator@example.com",
        password: hash_password_moderator,
        role_id: moderator_id,
        is_locked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "User",
        email: "user@example.com",
        password: hash_password_user,
        role_id: user_id,
        is_locked: false,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
}
setDefaultData();
