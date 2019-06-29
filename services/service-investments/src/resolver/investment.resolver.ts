import {investmentRepository, investorInvestments} from '../repository/investment.repository'

export const investmentResolvers = {
    Investment: {
        __resolveReference(object) {
            return investmentRepository.find(investment => investment.id === object.id)
        }
    },
    Query: {
        investmentByName(_, args) {
            return investmentRepository.filter(investment => investment.name === args.name)
        }
    },
    Investor: {
        investments(args) {
            const investments = investorInvestments.find(investor => investor.investorId = args.id)
            return investmentRepository.filter(investment => investments.investments.includes(investment.id))
        }
    }
}

