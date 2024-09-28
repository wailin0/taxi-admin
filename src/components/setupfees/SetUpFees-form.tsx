import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import { cn } from "../../lib/utils";
import InputField from "../forms/InputField";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useMutation } from "@apollo/client";
import {
  GET_ALL_INITIAL_FEES,
  UPDATE_TOPUP_FEES_BY_ID,
} from "../../graphql/setupfees";
import DropDownDataField from "../forms/DropDownField";

type Fees = {
  id?: string;
  initial_fee?: number;
  insurance_fee?: number;
  platform_fee?: number;
  waiting_fee_per_minute?: number;
  free_waiting_minute?: number;
  distance_fee_per_km?: number;
  commission_rate_type?: string;
  commission_rate?: number;
};

type SetupFeesType = {
  editData?: Fees;
  editMode: boolean;
  loading: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const additionalData = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed", value: "fixed" },
];

export const SetUpFeesForm: React.FC<SetupFeesType> = ({
  editData,
  editMode,
  loading,
}) => {
  const [updateService, { loading: updateLoading }] = useMutation(
    UPDATE_TOPUP_FEES_BY_ID,
    {
      refetchQueries: [GET_ALL_INITIAL_FEES],
    }
  );

  const FormSchema = yup.object({
    initial_fee: yup.number(),
    insurance_fee: yup.number(),
    platform_fee: yup.number(),
    waiting_fee_per_minute: yup.number(),
    free_waiting_minute: yup.number(),
    distance_fee_per_km: yup.number(),
    commission_rate_type: yup.string(),
    commission_rate: yup.number(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: editData,
  });

  useEffect(() => {
    form.setValue("initial_fee", editData?.initial_fee);
    form.setValue("insurance_fee", editData?.insurance_fee);
    form.setValue("platform_fee", editData?.platform_fee);
    form.setValue("waiting_fee_per_minute", editData?.waiting_fee_per_minute);
    form.setValue("free_waiting_minute", editData?.free_waiting_minute);
    form.setValue("distance_fee_per_km", editData?.distance_fee_per_km);
    form.setValue("commission_rate_type", editData?.commission_rate_type);
    form.setValue("commission_rate", editData?.commission_rate);
  }, [editData]);

  const handleUpdate = async (data: Fees) => {
    await updateService({
      variables: {
        id: editData?.id,
        commission_rate: data?.commission_rate,
        commission_rate_type: data?.commission_rate_type,
        waiting_fee_per_minute: data?.waiting_fee_per_minute,
        platform_fee: data?.platform_fee,
        insurance_fee: data?.insurance_fee,
        initial_fee: data?.initial_fee,
        free_waiting_minute: data?.free_waiting_minute,
        distance_fee_per_km: data?.distance_fee_per_km,
      },
    });
    // toggle();
  };

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center h-[300px]">
          <Skeleton className="h-[400px] mt-[100px] rounded-md w-full" />
        </div>
      ) : (
        <Form {...form}>
          <form
            className="sm:space-y-[16px] bg-white p-5 rounded"
            onSubmit={form.handleSubmit(handleUpdate)}
          >
            <div className={formContainer}>
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Initial Fee"
                fieldName="initial_fee"
                placeholder={"Type Here"}
                type="number"
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
              <InputField
                disabled={false}
                labelTitle="Insurance Fee"
                type="number"
                fieldName="insurance_fee"
                placeholder={"Type Here"}
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
            </div>
            <div className={formContainer}>
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Platform Fee"
                fieldName="platform_fee"
                type="number"
                placeholder={"Type Here"}
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Waiting Fee Per Minute"
                fieldName="waiting_fee_per_minute"
                placeholder={"Type Here"}
                type="number"
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
            </div>
            <div className={formContainer}>
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Free Waiting Minute"
                fieldName="free_waiting_minute"
                type="number"
                placeholder={"Type Here"}
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Distance Fee Per KM"
                fieldName="distance_fee_per_km"
                type="number"
                placeholder={"Type Here"}
                required={false}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
            </div>
            <div className={formContainer}>
              <DropDownDataField
                disabled={editMode ? true : false}
                labelTitle="Commission Rate Type"
                fieldName="commission_rate_type"
                required={false}
                requiredLabel={true}
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
                additionalData={additionalData}
              />
              <InputField
                disabled={editMode ? true : false}
                labelTitle="Comission Rate"
                fieldName="commission_rate"
                placeholder={"Type Here"}
                required={false}
                type="number"
                languageName={"career"}
                fieldHeight={cn(" w-full", fieldHeight)}
                fieldWidth={filedWidth}
              />
            </div>
            <ModalConfirmBtns
              size={"lg"}
              width="w-[100px] rounded-md"
              isLoading={updateLoading}
              editMode={true}
              toggle={() => {}}
            />
          </form>
        </Form>
      )}
    </div>
  );
};
