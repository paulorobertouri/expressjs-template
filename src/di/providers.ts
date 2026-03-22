import { AuthService, CustomerService } from "../services/index.js";
import { InMemoryCustomerRepository } from "../repositories/customer_repo.js";

export interface Providers {
  authService: AuthService;
  customerService: CustomerService;
  customerRepository: InMemoryCustomerRepository;
}

export const createProviders = (): Providers => {
  const customerRepository = new InMemoryCustomerRepository();
  const authService = new AuthService();
  const customerService = new CustomerService(customerRepository);

  return {
    authService,
    customerService,
    customerRepository,
  };
};
