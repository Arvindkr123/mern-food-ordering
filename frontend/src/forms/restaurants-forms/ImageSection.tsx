import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, ControllerRenderProps } from "react-hook-form";
import { useState } from "react";

const MAX_FILE_SIZE_MB = 5;

const ImageSection = () => {
  const { control, setError, clearErrors } = useFormContext();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError("imageFile", {
          type: "manual",
          message: `File size exceeds ${MAX_FILE_SIZE_MB}MB.`,
        });
        return;
      }

      // Clear errors if file is valid
      clearErrors("imageFile");
      setFileName(file.name);
      field.onChange(file);
    } else {
      setFileName(null);
      field.onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <Input
                    className="bg-white"
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    onChange={(event) => handleFileChange(event, field)}
                  />
                  {fileName && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {fileName}
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
