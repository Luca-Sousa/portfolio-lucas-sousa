"use client";

import { Button } from "@/app/_components/ui/button";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";

interface DeleteButtonImageUrlBucket {
  form: string[];
  field: FieldValues;
}

const DeleteButtonImageUrlBucket = ({
  form,
  field,
}: DeleteButtonImageUrlBucket) => {
  const { edgestore } = useEdgeStore();

  return (
    <div className="max-w-[350px] space-y-3">
      {form.map((imageUrl, index) => (
        <div
          key={index}
          className="flex h-16 w-full flex-col justify-center rounded border border-gray-300 px-4 py-2"
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-white">
            <FileIcon size="30" className="shrink-0" />
            <div className="min-w-0 text-sm">
              <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                <Link
                  href={imageUrl}
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  {imageUrl}
                </Link>
              </div>
            </div>

            <div className="grow" />

            <div className="flex w-12 justify-end text-xs">
              <Button
                variant="secondary"
                size="icon"
                type="button"
                className="rounded-md p-1 transition-colors duration-200"
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    // Deleta a imagem do bucket
                    await edgestore.publicFiles.delete({
                      url: imageUrl,
                    });

                    const updatedUrls = field.value.filter(
                      (imageUrl: string) => imageUrl !== field.value,
                    );

                    field.onChange(updatedUrls);
                  } catch (error) {
                    console.error("Erro ao remover a imagem:", error);
                  }
                }}
              >
                <Trash2Icon className="shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeleteButtonImageUrlBucket;
