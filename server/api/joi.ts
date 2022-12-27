import Joi from "@hapi/joi";

type TRegister = {
    name: string;
    email: string;
    password: string;
};
type TLogin = Omit<TRegister, "name">;

type TValidatingObject = TLogin | TRegister; // objects to be validated
type TValidatingTypes = "register" | "login"; // names of validating objects

type TSchemaMap<T> = { [Property in keyof T]: Joi.StringSchema }; // map validating object to object with schema information
type TValidationObjectMap<T> = { [Propery in TValidatingTypes]: TSchemaMap<T> }; // map validating object for each type

// the validating fields
const name = Joi.string().required().max(50);
const email = Joi.string().required().email();
const password = Joi.string()
    .required()
    .pattern(
        new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
    );

// the validating objects
const validatingObjects: TValidationObjectMap<TValidatingObject> = {
    register: { name, email, password },
    login: { email, password },
};

/**
 * Validate an object.
 * @param object The object to validate.
 * @param type The type of object to validate.
 * @throws If an error occurs whilst validating the object.
 */
const validateObject = (
    object: TValidatingObject,
    type: keyof typeof validatingObjects
) => {
    const { error } = Joi.object(validatingObjects[type]).validate(object);
    if (error) throw new Error(error.message);
};

export default validateObject;
