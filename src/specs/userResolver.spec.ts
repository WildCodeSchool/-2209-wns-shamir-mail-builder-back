import { ApolloServer, gql } from "apollo-server";
import createServer from "../tools/server";

describe('User resolver', () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await createServer();
      });

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
              email: "Toto@gmail.com"
            },
          });
          expect(response.data?.getOneUser).toBeDefined();
      })

      it("should not retrieve a user", async () => {
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

      it("should retrieve a token", async () => {
        const getTokenMutation = gql`
          mutation GetToken($password: String!, $email: String!) {
            getToken(password: $password, email: $email)
          }
        `;
    
        const response = await server.executeOperation({
          query: getTokenMutation,
          variables: {
            password: "password",
            email: "Toto@gmail.com",
          },
        });
    
        expect(response.errors).toBeUndefined();
        expect(response.data?.getToken).toBeDefined();
      });

      it("should not retrieve a token", async () => {
        const getTokenMutation = gql`
          mutation GetToken($password: String!, $email: String!) {
            getToken(password: $password, email: $email)
          }
        `;
    
        const response = await server.executeOperation({
          query: getTokenMutation,
          variables: {
            password: "dkqsgdqjky",
            email: "Toto@gmail.com",
          },
        });
    
        expect(response.errors).toBeDefined();
      });

      
})