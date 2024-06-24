const zod = require("zod");

const schema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  password: zod.string(),
});
console.log("in types");
const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});
module.exports = {
  schema: schema,
  signInSchema,
  updateSchema
};
