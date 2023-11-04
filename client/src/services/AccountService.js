import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from '../models/Ticket'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets(){
    const res = await api.get("/account/tickets")
    logger.log("here are all my tickets!", res.data)
    AppState.tickets = res.data.map((myticket) => new Ticket(myticket))
  }
}

export const accountService = new AccountService()
