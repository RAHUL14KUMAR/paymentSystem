export const openApi = {
  openapi: "3.0.0",
  info: {
    title: "User API",
    description: "API to manage users",
    version: "1.0.0"
  },
  servers: [
    {
      url: "https://paymentsystem-n5pd.onrender.com"
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    "/api": {
      get: {
        summary: "Greeting from server",
        description: "Endpoint to verify that the server is running",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: "hello message"
                }
              }
            }
          }
        }
      }
    },
    "/user/register": {
      post: {
        summary: "Register user",
        description: "Endpoint to register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/userSchema"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userRegisterResponse"
                }
              }
            }
          },
          "400": {
            description: "Bad request - missing required fields"
          },
          "404": {
            description: "User with this email already exists"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },
    "/user/login": {
      post: {
        summary: "Login user",
        description: "Endpoint to login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/loginSchema"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User successfully logged in",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userLoginResponse"
                }
              }
            }
          },
          "400": {
            description: "Bad request - missing required fields"
          },
          "404": {
            description: "User with this email does not exist"
          },
          "401": {
            description: "Invalid password"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },
    "/user/update": {
      put: {
        summary: "Update user details",
        description: "Endpoint to update user details",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/updateSchema"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User details updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/updateresponse"
                }
              }
            }
          },
          "400": {
            description: "Bad request - missing required fields"
          },
          "404": {
            description: "User with this username does not exist"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },
    "/account/create": {
      post: {
        summary: "Create bank account",
        description: "Endpoint to create a new account",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/createAccountSchema"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Account created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/createAccountResponse"
                }
              }
            }
          },
          "400": {
            description: "Bad request - missing required fields"
          },
          "404": {
            description: "User with this username does not exist"
          },
          "500": {
            description: "Internal server error"
          }
        }
      },
    },
    "/account/details/{accountid}":{
      get: {
        summary: "Get account details",
        description: "Endpoint to get account details",
        security: [{ bearerAuth: [] }],
        parameters: [{
          name: 'accountid',
          in: 'path',
          required: true,
          description: 'pass the accountid to fetch the details',
          schema: {
            type: 'string',
          },
        }],
        responses: {
          "200": {
            description: "Account details retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/accountDetailsResponse"
                }
              }
            }
          },
          "404": {
            description: "Account with this account id does not exist"
          },
          "500": {
            description: "Internal server error"
          }
        }
      },
      put:{
        summary: "Update account details",
        description: "Endpoint to update account details",
        security: [{ bearerAuth: [] }],
        parameters: [{
          name: 'accountid',
          in: 'path',
          required: true,
          description: 'pass the accountid to update the details',
          schema: {
            type: 'string',
          },
        }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/updateAccountSchema"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Account details updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/accountDetailsResponse"
                }
              }
            }
          },
          "404": {
            description: "Account with this account id does not exist"
          }
        }
      },
      patch:{
        summary:"Update account details",
        description:"Endpoint to update account details",
        security: [{ bearerAuth: [] }],
        parameters: [{
          name: 'accountid',
          in: 'path',
          required: true,
          description: 'pass the accountid to update the details',
          schema: {
            type: 'string',
          },
        }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/updateAccountSchema"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Amount withdrawal successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/accountDetailsResponse"
                }
              }
            }
          },
          "404": {
            description: "Account with this account id does not exist"
          },
          "400":{
            description:"insufficient balance withdrawl"
          },
          "401":{
            description:"You are not authorized to withdraw this amount"
          }
        }
      }
    },
    "/payment/credit-cards":{
        post:{
          summary:"Payment using credit card",
          description:"Endpoint to payment done by using credit card",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/paymentSchema"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Payment successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/paymentResponse"
                  }
                }
              }
            },
            "400": {
              description: "Bad request - missing required fields"
            },
            "404": {
              description: "You have already made a payment of Rs.100000 please pay the bending bills first"
            },
            "500": {
              description: "Internal server error"
            }
        }
      }
    },
    "/payment/credit-card-details":{
      get:{
        summary:"Get user credit card details",
        description:"Endpoint to get credit card details",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Credit card details retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/creditCardDetailsResponse"
                }
              }
            }
          },
          "201":{
            description:"no payment has been done by credit card"
          },
          "404": {
            description: "Payment not found "
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },
    "/payment/credit-card/clear-dues":{
      put:{
        summary:"Clear credit card dues",
        description:"Endpoint to clear credit card dues",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Credit card dues cleared successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/creditCardDetailsResponse"
                }
              }
            }
          },
          "404": {
            description: "Payment not found or no payment has been done by credit card"
          },
          "201":{
            description:"You have already cleared all the credit card dues"
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    },
    "/payment/debit-card":{
      post:{
        summary:"Payment using debit card",
        description:"Endpoint to payment done by using debit card",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/paymentSchema"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Payment done successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/creditCardDetailsResponse"
                }
              }
            }
          },
          "400": {
            description: "Bad request - missing required fields"
          },
          "401": {
            description: "insufficient balance"
          },
          "404": {
            description: "Account not found"
          }
        }
      }
    },
    "/payment/debit-card-details":{
      get:{
        summary:"Get user debit card details",
        description:"Endpoint to get debit card details",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Debit card details retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/debitCardDetailsResponse"
                }
              }
            }
          },
          "201":{
            description:"no payment has been done by debit card"
          },
          "404": {
            description: "Payment not found "
          },
          "500": {
            description: "Internal server error"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      userSchema: {
        type: "object",
        properties: {
          firstname: { type: "string" },
          lastname: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" }
        },
        required: ["firstname", "lastname", "email", "password"]
      },
      userRegisterResponse: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          firstname: { type: "string" },
          lastname: { type: "string" },
          password: { type: "string" },
          token: { type: "string" }
        }
      },
      loginSchema: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" }
        }
      },
      userLoginResponse: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          firstname: { type: "string" },
          lastname: { type: "string" },
          password: { type: "string" },
          token: { type: "string" }
        }
      },
      updateSchema: {
        type: "object",
        properties: {
          username: { type: "string" },
          firstname: { type: "string" },
          lastname: { type: "string" },
          newemail: { type: "string", format: "email" },
          newpassword: { type: "string", format: "password" }
        },
        required: ["username", "firstname", "lastname", "newemail", "newpassword"]
      },
      updateresponse: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          firstname: { type: "string" },
          lastname: { type: "string" },
          password: { type: "string" },
          token: { type: "string" }
        }
      },
      createAccountSchema: {
        type: "object",
        properties: {
          bankName: { type: "string" },
          bankBranch: { type: "string" },
          bankAddress: { type: "string" }
        },
        required: ["bankName", "bankBranch", "bankAddress"]
      },
      createAccountResponse: {
        type: "object",
        properties: {
          userId: { type: "string" },
          bankName: { type: "string" },
          accountNumber: { type: "string" },
          bankBranch: { type: "string" },
          bankIFSC: { type: "string" },
          bankAddress: { type: "string" },
          _id: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          __v: { type: "number" }
        }
      },
      accountDetailsResponse:{
        type: "object",
        properties: {
          message: { type: "string" },
          account: {
            type: "object",
            properties: {
              userId: { type: "string" },
              balance: { type: "number" },
              currency: { type: "string" },
              bankName: { type: "string" },
              accountNumber: { type: "string" },
              bankBranch: { type: "string" },
              bankIFSC: { type: "string" },
              bankAddress: { type: "string" },
              _id: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              __v: { type: "number" }
            }
          }
        }
      },
      updateAccountSchema:{
        type: "object",
        properties: {
          amount: { type: "number" },
        },
        required: ["amount"]
      },
      paymentSchema:{
        type: "object",
        properties: {
          amount: { 
            type: "number"
          },
          cvv:{
            type: "string"
          },
          card_number:{
            type: "string"
          },
          expiryDate:{
            type: "string"
          }
        },
        required: ["amount", "cvv", "card_number", "expiryDate"]
      },
      paymentResponse:{
        type: "object",
        properties: {
          message: { type: "string" },
          payment: {
            type: "object",
            properties: {
              amount: { type: "number" },
              currency: { type: "string" },
              _id: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
               __v: { type: "number" }
            }
          }
        }
      },
      creditCardDetailsResponse:{
        type: "array",
        properties: {
          message: { type: "string" },
          creditCard: {
            type: "object",
            properties: {
              card_number: { type: "string" },
              cvv: { type: "string" },
              expiryDate: { type: "string" },
              cardHolderName: { type: "string" },
              pendingAmount: { type: "number" },
              _id: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              __v: { type: "number" }
            }
          }
        }
      },

      debitCardDetailsResponse:{
        type:"object",
        properties:{
          message:{ type: "string" },
          payment:{
            type:"object",
            _id: { type: "string" },
            userId:{
              type:"object",
              properties:{
                "_id":{ type: "string" },
                "username":{ type: "string" },
                "email":{ type: "string" },
                "firstname":{ type: "string" },
                "lastname":{ type: "string" },
                "password":{ type: "string" },

              }
            },
            amount:{ type: "number" },
            status:{ type: "string" },
            paymentMethod:{
              type:"object",
              properties:{
                "_id":{ type: "string" },
                "card_number":{ type: "string" },
                "cvv":{ type: "string" },
                "expiryDate":{ type: "string" },
                "cardHolderName":{ type: "string" },
                "bankDetails":{type:"string"}
              }
            },
            createdAt:{ type: "string", format: "date-time" },
            updatedAt:{ type: "string", format: "date-time" },
          }
        }
      }

    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
}

