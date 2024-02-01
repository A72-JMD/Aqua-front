import validator from "validator";

// validator.isEmpty(""); // returns true
// validator.isEmpty("test@test.com"); // returns false
// validator.isEmail("test@test.com") // returns true
// validator.isEmail("go away"); // return false

validator = new FormValidator([
  {
    field: "email",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide an email address."
  },
  {
    field: "email",
    method: validator.isEmail,
    validWhen: true,
    message: "That is not a valid email."
  },
  {
    field: "age",
    method: validator.isInt,
    args: [{ min: 21, max: 65 }], // an array of additional arguments
    validWhen: true,
    message: "Your age must be an integer between 21 and 65"
  }
]);
const validation = validator.validate(this.state);

class FormValidator {
  constructor(validations) {
    // validations is an array of rules specific to a form
    this.validations = validations;
  }

  validate(state) {
    // start out assuming valid
    let validation = this.valid();
    // for each validation rule
    this.validations.forEach(rule => {
      // if the field isn't already marked invalid by an earlier rule
      if (!validation[rule.field].isInvalid) {
        // determine the field value, the method to invoke and
        // optional args from the rule definition
        const field_value = state[rule.field].toString();
        const args = rule.args || [];
        const validation_method =
          typeof rule.method === "string"
            ? validator[rule.method]
            : rule.method;
        // call the validation_method with the current field value
        // as the first argument, any additional arguments, and the
        // whole state as a final argument.  If the result doesn't
        // match the rule.validWhen property, then modify the
        // validation object for the field and set the isValid
        // field to false
        if (validation_method(field_value, ...args, state) != rule.validWhen) {
          validation[rule.field] = {
            isInvalid: true,
            message: rule.message
          };
          validation.isValid = false;
        }
      }
    });
    return validation;
  }
  // create a validation object for a valid form
  valid() {
    const validation = {};

    this.validations.map(
      rule => (validation[rule.field] = { isInvalid: false, message: "" })
    );
    return { isValid: true, ...validation };
  }
}
export default FormValidator;
