import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ui/form";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import { cn } from "../../lib/utils";
import InputField from "../forms/InputField";
import SwitchField from "../forms/SwitchField";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@apollo/client";
import { GET_ALL_DRIVERS, UPDATE_DRIVER_BY_ID } from "../../graphql/kiloTaxi";

type UserFormType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const UserForm: React.FC<UserFormType> = ({
  editData,
  toggle,
  editMode,
}) => {
  const [updateService, { loading }] = useMutation(UPDATE_DRIVER_BY_ID, {
    refetchQueries: [GET_ALL_DRIVERS],
  });

  const FormSchema = yup.object({
    balance: yup.string(),
    created_at: yup.string(),
    disabled: yup.boolean(),
    driver_id: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: editData
      ? editData
      : {
          balance: "",
          created_at: "",
          disabled: false,
          driver_id: "",
        },
  });

  const handleOnSave = async (data: any) => {
    await updateService({
      variables: {
        id: data?.id,
        disabled: data?.disabled,
        driver_id: data?.driver_id,
      },
    });
    toggle();
  };

  return (
    <Form {...form}>
      <form
        className="sm:space-y-[16px]"
        onSubmit={form.handleSubmit(handleOnSave)}
      >
        <Avatar>
          <AvatarImage
            className="w-[100px] rounded-md"
            src={
              editData?.profile_picture_url
                ? editData?.profile_picture_url
                : "https://github.com/shadcn.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={formContainer}>
          <InputField
            disabled={false}
            labelTitle="Driver ID"
            fieldName="driver_id"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={editMode ? true : false}
            labelTitle="Balance"
            fieldName="balance"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        {/* <div className={formContainer}>
          <InputField
            disabled={editMode ? true : false}
            labelTitle="Birthday Date"
            fieldName="birth_date"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={editMode ? true : false}
            fieldName="address"
            labelTitle="Address"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div> */}
        <div className={"flex gap-[20px]"}>
          <SwitchField
            title="Disabled"
            fieldName="disabled"
            required={false}
            fieldHeight=""
            fieldWidth=""
          />
        </div>
        <ModalConfirmBtns
          size={"lg"}
          width="w-[100px] rounded-md"
          isLoading={loading}
          editMode={false}
          toggle={toggle}
        />
      </form>
    </Form>
  );
};
