import {investmentRepository} from '../repository/investment.repository'

export const investmentResolvers = {
    Investment: {
        __resolveReference(object) {
            return investmentRepository.find(investment => investment.id === object.id)
        }
    },
    Query: {
        investmentByName(_, args) {
            return investmentRepository.filter(investors => investors.name === args.name)
        }
    }
}

