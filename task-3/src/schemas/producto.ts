import Joi from "joi";

const productoSchema = Joi.object({
  Product_name: Joi.string().required().min(3).max(255),
  description: Joi.string().required().min(3).max(255),
  price: Joi.number().min(1),
  Product_Image: Joi.required(),
});

export default productoSchema;
