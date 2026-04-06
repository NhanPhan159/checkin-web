import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CONFIG } from "@/config";
import firebaseHelper from "@/lib/firebase/FirebaseDB";
import useGlobalStore from "@/store";
import { TTableField } from "@/type";
import { Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageField = () => {
  const [fields, setFields] = useState<TTableField[] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { tableFields, fetchTableFields } = useGlobalStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSave = async () => {
    if (!fields || !fields.length) return;
    setLoading(true);
    if (!tableFields) await firebaseHelper.addTableField(fields);
    else await firebaseHelper.updateTableField(fields);
    await fetchTableFields();
    setLoading(false);
    toast.success("Save change successfully!!!");
    setOpenDialog(false);
  };
  const handleOnChange = (
    id: string,
    fieldKey: keyof TTableField,
    value: TTableField[keyof TTableField],
  ) => {
    if (!fields) return null;
    const newFields = fields.map((field) => {
      if (field.id === id) {
        if (fieldKey === "prop") field.prop = value as string;
        else if (fieldKey === "excelColumnName")
          field.excelColumnName = value as string;
      }
      return field;
    });
    setFields(newFields);
  };
  useEffect(() => {
    if (tableFields) setFields(tableFields);
    else setFields(CONFIG.TABLE_FIELD_DEFAULT);
  }, [tableFields]);
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          <DialogTrigger asChild>
            <Button variant="default" asChild>
              <div className="cursor-pointer">
                <Grid3x3 />
                Fields
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            {loading && (
              <div className="absolute bg-gray-500 opacity-40 flex items-center justify-center size-full">
                <Spinner className="size-10" />
              </div>
            )}
            <DialogHeader>
              <DialogTitle>Manage Your Field</DialogTitle>
              <DialogDescription>
                Manipulate to your fields for the table
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <div className="flex justify-around">
                  <span>Prop</span>
                  <span>Excel Column</span>
                </div>
              </Field>
              {fields?.map((curr, index) => (
                <Field key={index} orientation={"horizontal"}>
                  <Input
                    name="prop"
                    value={curr.prop}
                    onChange={(event) =>
                      handleOnChange(curr.id, "prop", event.target.value)
                    }
                  />
                  <Input
                    name="columnName"
                    value={curr.excelColumnName}
                    onChange={(event) =>
                      handleOnChange(
                        curr.id,
                        "excelColumnName",
                        event.target.value,
                      )
                    }
                  />
                </Field>
              ))}
            </FieldGroup>
            <DialogFooter className="flex items-center justify-center">
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default ManageField;
