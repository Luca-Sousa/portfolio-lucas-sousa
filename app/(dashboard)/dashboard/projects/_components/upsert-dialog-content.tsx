"use client";

import { upsertProject } from "@/app/_actions/project/upsert-project";
import {
  upsertProjectSchema,
  UpsertProjectSchema,
} from "@/app/_actions/project/upsert-project/schema";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { getTechnologies } from "@/app/_data_access/get-technologies";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectStatus, Technology } from "@prisma/client";
import { Loader2Icon, FilePlus2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { SingleImageDropzone } from "./single-image-dropzone";
import { Calendar } from "@/app/_components/ui/calendar";
import { MultiFileDropzoneUsage } from "./MultiFileDropzoneUsage";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { SingleFilePDFDropzone } from "./single-file-pdf-dropzone";
import "react-quill/dist/quill.snow.css";
import Editor from "./rich-text/editor";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProjectSchema;
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const { edgestore } = useEdgeStore();
  // const [file, setFile] = useState<File>();
  // const [url, setUrl] = useState<string>();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [status, setStatus] = useState<ProjectStatus[]>([]);

  const form = useForm({
    resolver: zodResolver(upsertProjectSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      startDate: new Date(),
      certificateUrl: undefined,
      certificateDesc: undefined,
      imagesUrl: [],
      thumbnailUrl: "",
      repositoryUrl: "",
      deployUrl: "",
      status: "" as ProjectStatus,
      technologies: [],
    },
  });

  const isEditing = !!defaultValues;

  useEffect(() => {
    const fetchTechnologies = async () => {
      const techs = await getTechnologies();
      setTechnologies(techs);
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    setStatus(Object.values(ProjectStatus));
  }, []);

  // const handleImagesChange = async (file: File) => {
  //   if (isEditing) {
  //     console.log("Substituindo imagem:", defaultValues.imagesUrl);
  //     const res = await edgestore.publicFiles.upload({
  //       file,
  //       options: {
  //         replaceTargetUrl: form.getValues("imagesUrl"),
  //       },
  //     });

  //     setFile(file);
  //     form.setValue("imagesUrl", res.url);
  //     toast.success("Imagem alterada com sucesso!");
  //   } else {
  //     setFile(file);

  //     if (file) {
  //       if (url === undefined) {
  //         const res = await edgestore.publicFiles.upload({
  //           file,
  //         });

  //         toast.success("Imagem adicionada com sucesso!");
  //         setUrl(res.url);
  //         form.setValue("imagesUrl", res.url);
  //       } else {
  //         const res = await edgestore.publicFiles.upload({
  //           file,
  //           options: {
  //             replaceTargetUrl: form.getValues("imagesUrl"),
  //           },
  //         });

  //         toast.success("Imagem alterada com sucesso!");
  //         setUrl(res.url);
  //         form.setValue("imagesUrl", res.url);
  //       }
  //     }
  //   }
  // };

  const handleImageChange = async (file: File | null) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
      });

      form.setValue("thumbnailUrl", res.url);
    } else {
      form.setValue("thumbnailUrl", "");
    }
  };

  const handleFilePDFChange = async (file: File | null) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
      });

      form.setValue("certificateUrl", res.url);
    } else {
      form.setValue("certificateUrl", "");
    }
  };

  const handleSubmitProject = async (data: UpsertProjectSchema) => {
    try {
      const confirmUploads = [
        edgestore.publicImages.confirmUpload({ url: data.thumbnailUrl }),
        data.certificateUrl
          ? edgestore.publicFiles.confirmUpload({ url: data.certificateUrl })
          : null,
        ...data.imagesUrl.map((image) =>
          edgestore.publicImages.confirmUpload({ url: image }),
        ),
      ];
      // Esperar todos os uploads serem confirmados
      await Promise.all(confirmUploads.filter(Boolean));

      await upsertProject({
        ...data,
        id: defaultValues?.id,
      });

      onSuccess?.();
      toast.success(
        `Projeto ${isEditing ? "atualizado" : "criado"} com sucesso!`,
      );
    } catch {
      toast.error(
        `Ocorreu um erro ao ${isEditing ? "atualizar" : "criar"} o projeto!`,
      );
    }
  };

  return (
    <DialogContent className="flex h-full max-h-[90%] max-w-[1200px] flex-col">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar" : "Criar Novo"} Projeto
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmitProject)}
          className="flex h-full flex-col justify-between space-y-2 overflow-hidden"
        >
          <div className="flex h-full justify-between overflow-hidden">
            <div className="mr-2 flex h-full w-[364px] flex-col overflow-hidden">
              <ScrollArea>
                <div className="space-y-4 pb-2">
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem da Thumbnail</FormLabel>
                        <FormControl>
                          <SingleImageDropzone
                            width={350}
                            height={350}
                            value={field.value}
                            onChange={(file) =>
                              handleImageChange(file as File | null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imagesUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagens do Projeto</FormLabel>
                        <FormControl>
                          <MultiFileDropzoneUsage
                            value={field.value}
                            onChange={(urls) => field.onChange(urls)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certificateUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Link do Certificado{" "}
                          <span className="text-xs text-muted-foreground">
                            (opcional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <SingleFilePDFDropzone
                            value={field.value}
                            onChange={(file) =>
                              handleFilePDFChange(file as File | null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>
            </div>

            <div className="flex w-[780px] flex-col">
              <ScrollArea>
                <div className="flex w-full flex-1 flex-col gap-3 pb-2 pl-1 pr-4">
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="h-fit flex-1">
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do Projeto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="w-full max-w-40">
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent align="end">
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                {status.map((statusItem) => (
                                  <SelectItem
                                    key={statusItem}
                                    value={statusItem}
                                  >
                                    {statusItem === ProjectStatus.IN_UPDATE &&
                                      "Atualização"}
                                    {statusItem ===
                                      ProjectStatus.IN_PRODUCTION &&
                                      "Finalizado"}
                                    {statusItem === ProjectStatus.IN_PROGRESS &&
                                      "Desenvolvimento"}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição - Projeto</FormLabel>
                        <FormControl>
                          <Editor
                            content={field.value}
                            onChange={(value) => field.onChange(value)}
                            placeholder="Descrição do Projeto..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certificateDesc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição - Certificado</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Descrição do Certificado..."
                            className="min-h-32 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Início</FormLabel>
                          <FormControl>
                            <Calendar
                              className="rounded-lg border border-input"
                              classNames={{
                                day_selected:
                                  "bg-primary font-semibold hover:font-semibold focus:font-semibold text-muted hover:bg-primary hover:text-muted focus:bg-primary focus:text-muted",
                              }}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                              defaultMonth={field.value}
                              locale={ptBR}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <FormField
                        control={form.control}
                        name="technologies"
                        render={() => (
                          <FormItem>
                            <FormLabel>Tecnologias</FormLabel>
                            <div className="flex flex-wrap gap-4">
                              {technologies.map((tech) => (
                                <FormField
                                  key={tech.id}
                                  control={form.control}
                                  name="technologies"
                                  render={({ field }) => {
                                    return (
                                      <FormItem key={tech.id}>
                                        <div className="flex items-center gap-3">
                                          <FormControl>
                                            <Checkbox
                                              className="data-[state=checked]:text-black"
                                              checked={field.value?.includes(
                                                tech.id,
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      tech.id,
                                                    ])
                                                  : field.onChange(
                                                      field.value.filter(
                                                        (value) =>
                                                          value !== tech.id,
                                                      ),
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="flex items-center gap-1 text-xs">
                                            <Image
                                              alt={tech.name}
                                              src={tech.iconURL}
                                              width={16}
                                              height={16}
                                            />
                                            {tech.name}
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deployUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deploy</FormLabel>
                            <FormControl>
                              <Input placeholder="Link de Deploy" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="repositoryUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repositório</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Link do Repositório"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <DialogFooter className="flex items-end justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button
                  type="reset"
                  disabled={form.formState.isSubmitting}
                  variant={"secondary"}
                  className="gap-1.5"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="gap-1.5 font-semibold text-secondary"
              >
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  <FilePlus2 size={16} />
                )}
                Salvar Projeto
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
