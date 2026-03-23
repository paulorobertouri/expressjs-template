import { Customer } from '../domain/models.js';

export interface ICustomerRepository {
  getCustomer(id: string): Promise<Customer | null>;
  listCustomers(): Promise<Customer[]>;
}

export class InMemoryCustomerRepository implements ICustomerRepository {
  private customers: Map<string, Customer> = new Map([
    ['1', { id: '1', name: 'John Doe', email: 'john@example.com' }],
    ['2', { id: '2', name: 'Jane Smith', email: 'jane@example.com' }],
  ]);

  async getCustomer(id: string): Promise<Customer | null> {
    return this.customers.get(id) || null;
  }

  async listCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
}
