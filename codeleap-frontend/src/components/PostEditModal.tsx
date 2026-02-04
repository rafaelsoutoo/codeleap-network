import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    VStack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PostDTO, UpdatePostDTO } from "@/dtos/posts.dto";
import { postsService } from "@/services/posts.service";

interface PostEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: PostDTO | null;
    onUpdated: (post: PostDTO) => void;
}

export function PostEditModal({
    isOpen,
    onClose,
    post,
    onUpdated,
}: PostEditModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    async function handleUpdate() {
        if (!post) return;

        try {
            setLoading(true);

            const payload: UpdatePostDTO = {
                title,
                content,
            };

            const updated = await postsService.update(post.id, payload);

            onUpdated(updated);
            onClose();

            toast({
                title: "Post updated!",
                status: "success",
            });
        } catch {
            toast({
                title: "Error updating post",
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
                <ModalHeader>Edit item</ModalHeader>

                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <VStack align="start">
                            <Text fontSize="14px">Title</Text>
                            <Input
                                h="32px"
                                borderRadius='8px'
                                borderColor="#777777"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </VStack>

                        <VStack align="start">
                            <Text fontSize="14px">Content</Text>
                            <Textarea
                                h="32px"
                                borderRadius='8px'
                                borderColor="#777777"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter gap={3}>
                    <Button
                        bg="white"
                        color="black"
                        h="32px"
                        border="1px"
                        w="120px"
                        borderRadius="8px"
                        variant="ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        bg="#47B960"
                        color="white"
                        h="32px"
                        w="120px"
                        borderRadius="8px"
                        _hover={{ bg: "#3da653" }}
                        onClick={handleUpdate}
                        isLoading={loading}
                        isDisabled={!title || !content}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
