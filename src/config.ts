import { TTableField } from "./type";

export const CONFIG = {
  TABLE_FIELD_DEFAULT: (): TTableField[] => [
    {
      id: "1",
      prop: "FullName",
      require: true,
      excelColumnName: "FullName",
    },
    {
      id: "2",
      prop: "CompanyName",
      require: true,
      excelColumnName: "Work Place",
    },
    {
      id: "3",
      prop: "Email",
      require: true,
      excelColumnName: "email",
    },
    {
      id: "4",
      prop: "sex",
      require: true,
      excelColumnName: "Sex",
    },
    {
      id: "5",
      prop: "phone",
      require: true,
      excelColumnName: "Phone number",
    },
  ],
};
