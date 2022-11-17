import Joi from "joi";

const userSchema = Joi.object({


  password: Joi.string().required().min(6).max(50),

  email: Joi.string().email().required().max(255),


});

export default userSchema;
