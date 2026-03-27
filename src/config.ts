import { TTableField } from "./type";

export const CONFIG = {
  TABLE_FIELD_DEFAULT: (): TTableField[] => [
    {
      prop: "FullName",
      require: true,
      columnName: "FullName",
    },
    {
      prop: "CompanyName",
      require: true,
      columnName: "CompanyName",
    },
    {
      prop: "Email",
      require: true,
      columnName: "email",
    },
    {
      prop: "sex",
      require: true,
      columnName: "Sex",
    },
    {
      prop: "phone",
      require: true,
      columnName: "Phone number",
    },
  ],
};
