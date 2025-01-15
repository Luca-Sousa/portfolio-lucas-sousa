"use client";

import { useEdgeStore } from "@/app/_lib/edgestore";
import { useState } from "react";
import { FileState, MultiImageDropzone } from "./multi-image-dropzone";
import React from "react";

interface MultiImageDropzoneUsageProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function MultiImageDropzoneUsage({
  value,
  onChange,
}: MultiImageDropzoneUsageProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
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
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          const uploadedUrls: string[] = [];
          setFileStates([...fileStates, ...addedFiles]);

          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File,
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
    </div>
  );
}
