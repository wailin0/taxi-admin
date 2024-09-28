import { gql } from "@apollo/client";

export const GET_ALL_TOPUPS = gql`
  query getTopUpTransactions {
    driver_transactions(
      where: { transaction_type: { _eq: "cash in" } }
      order_by: { created_at: desc }
    ) {
      id
      amount
      status
      created_at
      transaction_number
      top_up {
        receipt_photo_url
      }
      driver {
        name
        phone
        driver_id
        address
        profile_picture_url
        vehicle_number
        balance
        bookings {
          customer {
            name
            phone
            profile_picture_url
          }
        }
      }
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

export const UPDATE_AMOUNT = gql`
mutation MyMutation($id: uuid = "", $amount: numeric = "", $status: String = "") {
  update_driver_transactions_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, status: $status}) {
    amount
    status
  }
}

`;
