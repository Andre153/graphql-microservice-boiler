import {gql} from 'apollo-server-express'

export const investorTypeDefs = gql`    
    
    extend type Query {
        investorByEmail(email: String!): Investor
        investorsByFirstName(name: String!): [Investor]
    }
    
    type Investor @key(fields: "id") {
        id: String!
        firstName: String!
        lastName: String!
        email: String!
    }
`;
