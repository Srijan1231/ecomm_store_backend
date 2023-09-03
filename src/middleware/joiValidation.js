import Joi from "joi";

const SHORTSTRREQ = Joi.string().min(3).max(100).required();
const SHORTSTR = Joi.string().min(3).max(100);
const LONGTSTR = Joi.string().min(3).max(10000);
const NUM = Joi.number();
const NUMREQ = Joi.number().required();

// ======== user
export const newUserValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      fName: SHORTSTRREQ,
      lName: SHORTSTRREQ,
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),

      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const updateUserValidation = (req, res, next) => {
  try {
    //define the schema
    req.body.password = req.body.password;
    const schema = Joi.object({
      fName: SHORTSTRREQ,
      lName: SHORTSTRREQ,
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),

      address: SHORTSTR.allow(""),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const loginValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
      password: SHORTSTRREQ.min(6),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
