import {investorRepository} from '../repository/investor.repository'

export const investorResolvers = {
    Investor: {
        __resolveReference(object) {
            return investorRepository.find(investor => investor.id === object.id)
        }
    },
    Query: {
        investorByEmail(_, args) {
            return investorRepository.find(investor => investor.email === args.email)
        },
        investorsByFirstName(_, args) {
            return investorRepository.filter(investors => investors.firstName === args.name)
        }
    }
}

