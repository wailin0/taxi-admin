import { gql } from "@apollo/client";

export const GET_ALL_INITIAL_FEES = gql`
  query MyQuery {
    fee_configs(order_by: { commission_rate: asc }) {
      id
      initial_fee
      insurance_fee
      platform_fee
      waiting_fee_per_minute
      free_waiting_minute
      distance_fee_per_km
      commission_rate_type
      commission_rate
    }
  }
`;

export const UPDATE_TOPUP_FEES_BY_ID = gql`
  mutation MyMutation(
    $id: uuid!
    $commission_rate: numeric = ""
    $commission_rate_type: String = ""
    $waiting_fee_per_minute: numeric = ""
    $platform_fee: numeric = ""
    $insurance_fee: numeric = ""
    $initial_fee: numeric = ""
    $free_waiting_minute: Int = 10
    $distance_fee_per_km: numeric = ""
  ) {
    update_fee_configs_by_pk(
      pk_columns: { id: $id }
      _set: {
        commission_rate: $commission_rate
        commission_rate_type: $commission_rate_type
        distance_fee_per_km: $distance_fee_per_km
        free_waiting_minute: $free_waiting_minute
        initial_fee: $initial_fee
        insurance_fee: $insurance_fee
        platform_fee: $platform_fee
        waiting_fee_per_minute: $waiting_fee_per_minute
      }
    ) {
      waiting_fee_per_minute
      platform_fee
      insurance_fee
      initial_fee
      free_waiting_minute
      distance_fee_per_km
      commission_rate_type
      commission_rate
    }
  }
`;
