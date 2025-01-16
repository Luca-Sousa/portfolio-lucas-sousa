"use client";

import { useEdgeStore } from "@/app/_lib/edgestore";
import { useState } from "react";
import { FileState, MultiFileDropzone } from "./MultiFileDropzone";
import { FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

interface MultiFileDropzoneUsageProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function MultiFileDropzoneUsage({
  value,
  onChange,
}: MultiFileDropzoneUsageProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const uploadedUrls: string[] = [];
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);

          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });

                uploadedUrls.push(res.url);
              } catch {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            }),
          );
          onChange([...value, ...uploadedUrls]);
        }}
      />

      <div className="max-w-[350px] space-y-3">
        {value.map((imageUrl, index) => (
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

                      const updatedUrls = value.filter((_, i) => i !== index);
                      onChange([...updatedUrls]);
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
    </div>
  );
}
