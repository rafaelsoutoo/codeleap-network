import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    Text,
    useToast,
} from "@chakra-ui/react";
import { PostDTO } from "@/dtos/posts.dto";
import { postsService } from "@/services/posts.service";
import { useState } from "react";

interface PostDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: PostDTO | null;
    onDeleted: (id: number) => void;
}

export function PostDeleteModal({
    isOpen,
    onClose,
    post,
    onDeleted,
}: PostDeleteModalProps) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function handleDelete() {
        if (!post) return;

        try {
            setLoading(true);

            await postsService.remove(post.id);

            onDeleted(post.id);
            onClose();

            toast({
                title: "Post deleted",
                status: "success",
            });
        } catch {
            toast({
                title: "Error deleting post",
                status: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />

            <ModalContent borderRadius="16px">
                <ModalHeader>Are you sure you want to delete this item?</ModalHeader>

                <ModalFooter gap={3}>
                    <Button
                        bg="white"
                        color="black"
                        h="32px"
                        border="1px"
                        w="120px"
                        borderRadius="8px"
                        onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        bg="#FF5151"
                        color="white"
                        h="32px"
                        w="120px"
                        borderRadius="8px"
                        _hover={{ bg: "#e04848" }}
                        onClick={handleDelete}
                        isLoading={loading}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
