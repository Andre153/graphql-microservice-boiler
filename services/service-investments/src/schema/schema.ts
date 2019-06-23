import {gql} from 'apollo-server-express'

export const investmentTypeDefs = gql`    
    extend type Query {
        investmentByName(name: String!): [Investment]
    }
    
    type Investment @key(fields: "id") {
        id: String!
        name: String!
        price: Int
    }
    
    extend type Investor @key(fields: "id") {
        id: String! @external
        investments: [Investment]
    }
`;
