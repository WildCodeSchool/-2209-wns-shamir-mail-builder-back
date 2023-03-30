import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe('User resolver', () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await createServer();
      });

      it("should create a user and return his email", async () => {
        const createUserQuery = gql`
          mutation CreateUser($username: String!, $password: String!, $email: String!, $phone: String!) {
            createUser(username: $username, password: $password, email: $email, phone: $phone) {
              email
            }
        }
        `;
        
        const response = await server.executeOperation({
            query: createUserQuery,
            variables: {
              username: "Joel Miller",
              password: "cordyceps",
              email: "joel.miller@gmail.com",
              phone: "0123456789",
            },
          });
          expect(response.data?.createUser).toBeDefined();
      })

      it("should retrieve a user and return his email", async () => {
        const getOneUserQuery = gql`
          query GetOneUser($email: String!) {
            getOneUser(email: $email) {
              email
            }
        }
        `;
        
        const response = await server.executeOperation({
            query: getOneUserQuery,
            variables: {
              email: "joel.miller@gmail.com"
            },
          });
          expect(response.data?.getOneUser).toBeDefined();
      })

      it("should send an error for unregistered user", async () => {
        const getOneUserQuery = gql`
          query GetOneUser($email: String!) {
            getOneUser(email: $email) {
              email
            }
        }
        `;
        
        const response = await server.executeOperation({
            query: getOneUserQuery,
            variables: {
              email: "InvalidUser@gmail.com"
            },
          });
          expect(response.errors).toBeDefined();
      })

      it("should return a token", async () => {
        const getTokenMutation = gql`
          mutation GetToken($password: String!, $email: String!) {
            getToken(password: $password, email: $email)
          }
        `;
    
        const response = await server.executeOperation({
          query: getTokenMutation,
          variables: {
            password: "cordyceps",
            email: "joel.miller@gmail.com",
          },
        });
    
        expect(response.errors).toBeUndefined();
        expect(response.data?.getToken).toBeDefined();
      });

      it("should send an error for invalid credentials", async () => {
        const getTokenMutation = gql`
          mutation GetToken($password: String!, $email: String!) {
            getToken(password: $password, email: $email)
          }
        `;
    
        const response = await server.executeOperation({
          query: getTokenMutation,
          variables: {
            password: "dkqsgdqjky",
            email: "joel.miller@gmail.com",
          },
        });
    
        expect(response.errors).toBeDefined();
      });

      it("should save a subscription for a given user", async () => {
        const saveUserSub = gql`
          mutation SaveUserSub($email: String!, $subscription: SubscriptionInput!) {
            saveUserSub(email: $email, subscription: $subscription) {
              username
            }
          }
        `;

        const nextMonth = new Date().getMonth() + 1;

        const newSubscription = {
          name: "abonnement",
          info: "mensuel",
          price: 9.99,
          subscriptionStart: new Date(),
          subscriptionEnd: new Date(new Date().setMonth(nextMonth)),
          subscriptionStatus: 'actif',
        }
    
        const response = await server.executeOperation({
          query: saveUserSub,
          variables: {
            email: "joel.miller@gmail.com",
            subscription: newSubscription,
          },
        });
    
        expect(response.data?.saveUserSub).toBeDefined();
      });

      
})