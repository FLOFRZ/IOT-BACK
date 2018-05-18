var bcrypt = require('bcryptjs');

module.exports = {


  friendlyName: 'Create user',


  description: '',


  inputs: {
    email: {
      type: "string"
    },
    password:{
      type: "string"
      },

  },


  exits: {
    invalid:{
      responseType: 'badRequest',
      description: "Email and/or password not valid"
    },
      EmailAlreadyInUse: {
      statutCode: 409,
          description: "Email already in use"
      }
  },


  fn: async function (inputs, exits) {

    attr = {};
    attr.email = inputs.email.toLowerCase();

    if (inputs.password){
      attr.password = await bcrypt.hash(inputs.password, 10);
      attr.firstName= inputs.firstName;

      var user = await User.create(attr)
            .intercept('E_UNIQUE', () => 'EmailAlreadyInUse')
            .intercept({name: 'UsageError'}, () => 'invalid')
            .fetch()
        return exits.success(user);
    }else{
      return exists.invalid("Missing password");
    }



  }


};

