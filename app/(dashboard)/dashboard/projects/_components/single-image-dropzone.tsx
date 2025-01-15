"use client";

import { useEdgeStore } from "@/app/_lib/edgestore";
import { formatFileSize } from "@edgestore/react/utils";
import { UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, width, height, value, className, disabled, onChange },
    ref,
  ) => {
    const { edgestore } = useEdgeStore();

    // Estado local para rastrear a imagem
    const [localValue, setLocalValue] = React.useState<
      File | string | undefined
    >(value);

    React.useEffect(() => {
      setLocalValue(value); // Sincronizar o estado local com o valor externo
      console.log(value);
    }, [value]);

    const imageUrl = React.useMemo(() => {
      if (typeof localValue === "string") {
        return localValue;
      } else if (localValue) {
        return URL.createObjectURL(localValue);
      }
      return null;
    }, [localValue]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          setLocalValue(file); // Atualiza o estado local
          void onChange?.(file); // Propaga a mudança para o componente pai
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} disabled={!!imageUrl} />

          {imageUrl ? (
            // Image Preview
            <Image
              className="h-full w-full cursor-default rounded-md border border-muted-foreground object-cover"
              src={imageUrl}
              alt="Imagem do projeto"
              width={width}
              height={height}
            />
          ) : (
            // Upload Icon
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <UploadCloudIcon className="mb-2 h-7 w-7" />
              <div className="text-gray-400">
                Arraste e solte para fazer upload
              </div>
              <div className="mt-3">
                <Button type="button" disabled={disabled}>
                  selecionar
                </Button>
              </div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <div
              className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  // Deleta a imagem do bucket
                  await edgestore.publicFiles.delete({
                    url: imageUrl,
                  });
                  console.log("Imagem removida com sucesso");

                  setLocalValue(undefined); // Atualiza o estado local
                  void onChange?.(undefined); // Propaga para o componente pai
                } catch (error) {
                  console.error("Erro ao remover a imagem:", error);
                }
              }}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                <X
                  className="text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    );
  },
);
SingleImageDropzone.displayName = "SingleImageDropzone";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        "inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // color
        "border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700",
        // size
        "h-6 rounded-md px-2 text-xs",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { SingleImageDropzone };
