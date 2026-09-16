import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { ScanFormValues, ScanResult } from "../../types/scan";
import { ScanFormSchema } from "../../types/scan";
import { secondsToMinutes } from "../../utils/time";
export const ScanForm: FC<ScanFormProps> = ({ scanResults }) => {
  const { register, handleSubmit, control } = useForm<ScanFormValues>({
    resolver: zodResolver(ScanFormSchema),
    defaultValues: {
      albums: scanResults.map((r) => ({ ...r, accepted: true })),
    },
  });

  const { fields } = useFieldArray({ control, name: "albums" });

  const onSubmit = (data: ScanFormValues) => {
    const payload = data.albums.map(({ accepted, ...rest }) => ({
      ...rest,
      ignored: !accepted,
    }));
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {scanResults.length > 0 && (
        <ul>
          {fields.map((field, index) => (
            <li key={field.id}>
              <input
                type="checkbox"
                {...register(`albums.${index}.accepted`)}
              />
              {field.artist} - {field.album} - {field.track_count} songs,{" "}
              {field.year}
              {field.has_cover ? " Cover" : " Cover Missing"}
              {field.duration_seconds > 0 &&
                `, duration ${secondsToMinutes(field.duration_seconds)}mins`}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Save</button>
    </form>
  );
};

type ScanFormProps = {
  scanResults: ScanResult[];
};
