import { deleteProject } from "@/app/_actions/project/delete-project";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { SquareXIcon, StepForwardIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteProjectDialogContentProps {
  productId: string;
  imageURL: string;
}

const DeleteProjectDialogContent = ({
  productId,
  imageURL,
}: DeleteProjectDialogContentProps) => {
  const { edgestore } = useEdgeStore();

  const handleContinueClick = async () => {
    try {
      await deleteProject({ id: productId });

      await edgestore.publicFiles.delete({
        url: imageURL,
      });

      toast.success("Projeto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir Projeto!");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Excluindo este projeto irá excluir todos os dados relacionados. Deseja
          continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel className="gap-1.5">
          <SquareXIcon size={16} />
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          className="gap-1.5 text-secondary"
          onClick={handleContinueClick}
        >
          <StepForwardIcon size={16} />
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProjectDialogContent;
