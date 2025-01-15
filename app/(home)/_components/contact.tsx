"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { Textarea } from "../../_components/ui/textarea";
import { Button } from "../../_components/ui/button";
import { RefreshCwIcon, Send } from "lucide-react";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../_components/ui/sheet";
import Link from "next/link";
import { toast } from "sonner";
import {
  ContactMessageSchema,
  contactMessageSchema,
} from "@/app/_actions/contact-message/schema";
import { createContactMessage } from "@/app/_actions/contact-message";

interface ContactProps {
  onSuccess: () => void;
}

const Contact = ({ onSuccess }: ContactProps) => {
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleTextareaResize = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const onSubmit = async (data: ContactMessageSchema) => {
    try {
      await createContactMessage({
        ...data,
      });

      onSuccess?.();
      toast.success("Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Ocorreu um erro ao enviar a mensagem.");
    }
  };

  return (
    <SheetContent>
      <SheetHeader className="space-y-3 text-left">
        <div className="space-y-3">
          <SheetTitle className="text-3xl">Contato</SheetTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>

        <SheetDescription>
          Entre em contato ou envie-me um e-mail diretamente para{" "}
          <Link
            className="text-primary hover:underline"
            href={"mailto:luke.sousa.dev@gmail.com"}
          >
            luke.sousa.dev@gmail.com
          </Link>
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Seu nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Seu email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Assunto{" "}
                  <span className="text-xs text-muted-foreground">
                    (opcional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Assunto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Escreva sua mensagem aqui..."
                    className="max-h-72 min-h-32 resize-none [&::-webkit-scrollbar]:hidden"
                    onInput={handleTextareaResize}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter className="flex-col space-y-2 sm:space-y-0">
            <SheetClose asChild className="basis-1/3">
              <Button
                variant="destructive"
                type="reset"
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
            </SheetClose>

            <Button
              type="submit"
              className="flex w-full basis-2/3 items-center gap-2 text-secondary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <RefreshCwIcon size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
};

export default Contact;
