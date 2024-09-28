import { gql } from "@apollo/client";

export const GET_ALL_DRIVERS = gql`
  query MyQuery {
    drivers(order_by: { created_at: asc }) {
      id
      name
      address
      profile_picture_url
      balance
      birth_date
      created_at
      disabled
      driver_id
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query MyQuery {
    customers(order_by: { created_at: asc }) {
      created_at
      disabled
      email
      fcm_token
      id
      name
      password
      phone
      profile_picture_url
    }
  }
`;

export const DELETE_DRIVER_BY_ID = gql`
  mutation MyMutation($id: uuid!) {
    delete_drivers_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_DRIVER_BY_ID = gql`
  mutation MyMutation(
    $id: uuid!
    $disabled: Boolean!
    $driver_id: String = ""
  ) {
    update_drivers_by_pk(
      pk_columns: { id: $id }
      _set: { disabled: $disabled, driver_id: $driver_id }
    ) {
      disabled
      driver_id
    }
  }
`;
