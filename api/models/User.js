/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

      email:{
          type: 'string',
          unique: true,
          required: true,
          isEmail: true,
          maxLength: 250,
          example: "totogmail.com"
      },
      name:{
          type: 'string',
          maxLength: 250,
          example: "Chirac"
      },
      firstName:{
          type: 'string',
          maxLength: 250,
          example: "toto"
      },
      dateOfBirth:{
          type: 'number',
          isBefore: new Date()

      },
      sex:{
          type: 'string',
          isIn:['male', 'female']
      },
      password: {
          type: 'string',
          required: true
      },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
      team: {
          model: 'team'
      },
      usermatch:{
          collection:'usermatch',
          via: 'user'
      },
      reservations:{
          collection: 'reservation',
          via :'user'
      }

  },

};

