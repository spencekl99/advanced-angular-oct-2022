import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { CustomerDocuments, CustomerEvents } from '../actions/customer.actions';

export interface CustomerEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: string;
  company: string;
  roles: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomersState extends EntityState<CustomerEntity> {
  loaded: boolean;
  errored: boolean;
  selectedCustomerId?: string;
}

export const adapter = createEntityAdapter<CustomerEntity>();

const initialState = adapter.getInitialState({
  loaded: false,
  errored: false,
});

export const reducer = createReducer(
  initialState,
  on(CustomerEvents.selected, (s, a) => ({
    ...s,
    selectedCustomerId: a.payload,
  })),
  on(CustomerDocuments.customers, (s, a) =>
    adapter.setAll(a.payload, { ...s, loaded: true, errored: false }),
  ),
  on(CustomerEvents.error, (s) => ({ ...s, errored: true, loaded: true })),
);
