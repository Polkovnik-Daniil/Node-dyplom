const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const User = require("./User");
const Role = require("./Role");

async function setDefaultData() {
  try {
    let adminId = null;
    let moderatorId = null;
    let userId = null;

    const count_role = await Role.count();

    if (count_role === 0) {
      adminId = uuidv4();
      moderatorId = uuidv4();
      userId = uuidv4();

      await Role.create({ id: adminId, name: "Admin" });
      await Role.create({ id: moderatorId, name: "Moderator" });
      await Role.create({ id: userId, name: "User" });
    }

    const countUser = await User.count();

    if (countUser === 0) {
      if (adminId === null || moderatorId === null || userId === null) {
        let adminRole = await Role.findOne({ where: { name: "Admin" } });
        adminId = adminRole.id;
        let moderatorRole = await Role.findOne({
          where: { name: "Moderator" },
        });
        moderatorId = moderatorRole.id;
        let userRole = await Role.findOne({ where: { name: "User" } });
        userId = userRole.id;
      }
      //made hash passwords default users
      const HASH_PASSWORD_ADMIN = await bcrypt.hash("admin", 5);
      const HASH_PASSWORD_MODERATOR = await bcrypt.hash("moderator", 5);
      const HASH_PASSWORD_USER = await bcrypt.hash("user", 5);

      await User.create({
        id: uuidv4(),
        name: "Admin",
        email: "admin@example.com",
        password: HASH_PASSWORD_ADMIN,
        roleId: adminId,
        isLocked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "Moderator",
        email: "moderator@example.com",
        password: HASH_PASSWORD_MODERATOR,
        roleId: moderatorId,
        isLocked: false,
      });
      await User.create({
        id: uuidv4(),
        name: "User",
        email: "user@example.com",
        password: HASH_PASSWORD_USER,
        roleId: userId,
        isLocked: false,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
}
setDefaultData();
