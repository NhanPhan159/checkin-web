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
import { TTableField } from "@/type";
import { Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageField = () => {
  const [fields, setFields] = useState<TTableField[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSave = async () => {
    if (!fields || !fields.length) return;
    setLoading(true);
    await firebaseHelper.addTableField(fields);
    setLoading(false);
    toast.success("Save change successfully!!!");
  };
  useEffect(() => {
    const dummyField = CONFIG.TABLE_FIELD_DEFAULT();
    setFields(dummyField);
  }, []);
  return (
    <>
      <Dialog>
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
                  <span>Table Column</span>
                </div>
              </Field>
              {fields?.map((curr, index) => (
                <Field key={index} orientation={"horizontal"}>
                  <Input name="prop" value={curr.prop} />
                  <Input name="columnName" value={curr.columnName} />
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
