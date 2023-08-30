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
        admin_role = await Role.findOne({ where: { name: "Admin" } });
        admin_id = admin_role.id;
        moderator_role = await Role.findOne({ where: { name: "Moderator" } });
        moderator_id = moderator_role.id;
        user_role = await Role.findOne({ where: { name: "User" } });
        user_id = user_role.id;
      }
      await User.create({
        id: uuidv4(),
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        role_id: admin_id,
        is_locked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "Moderator",
        email: "moderator@example.com",
        password: "moderator",
        role_id: moderator_id,
        is_locked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "User",
        email: "user@example.com",
        password: "user",
        role_id: user_id,
        is_locked: false,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
}
setDefaultData();
