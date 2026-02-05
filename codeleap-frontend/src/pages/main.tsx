import { PostCard } from "@/components/PostCard";
import { PostDeleteModal } from "@/components/PostDeleteModal";
import { PostEditModal } from "@/components/PostEditModal";
import { PostDTO } from "@/dtos/posts.dto";
import { useAuth } from "@/hooks/useAuth";
import { postsService } from "@/services/posts.service";
import { Box, Button, Flex, Input, Skeleton, Text, Textarea, Toast, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Main() {
    const router = useRouter();
    const { isAuthenticated, logout, username } = useAuth();



    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(true);


    const [editingPost, setEditingPost] = useState<PostDTO | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [deletingPost, setDeletingPost] = useState<PostDTO | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const toast = useToast();


    useEffect(() => {
        if (!isAuthenticated) router.replace("/");
    }, [isAuthenticated, router]);

    async function handleLogout() {
        await logout();
        router.push("/");
    }


    async function handleCreatePost() {
        try {
            setLoadingCreate(true);
            const newPost = await postsService.create({
                username: username!,
                title,
                content,
            });

            setPosts((prev) => [newPost, ...prev]);

            setTitle("");
            setContent("");



        } catch {
            toast({
                title: 'Error creating',
                description: 'The API may be waking up. This can take up to 2 minutes on the first request.',
                status: 'error'
            })

        } finally {
            setLoadingCreate(false);
        }
    }

    async function fetchPosts() {
        try {
            setLoadingPosts(true);
            const data = await postsService.list();
            setPosts(data);
        } catch {
            toast({
                title: 'Error loading posts',
                description: 'The API may be waking up. This can take up to 2 minutes on the first request.',
                status: 'error'
            });
        } finally {
            setLoadingPosts(false);
        }
    }

    function handleOpenEdit(post: PostDTO) {
        setEditingPost(post);
        setIsEditOpen(true);
    }

    function handleUpdatedPost(updated: PostDTO) {
        setPosts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );
    }

    function handleOpenDelete(post: PostDTO) {
        setDeletingPost(post);
        setIsDeleteOpen(true);
    }

    function handleDeletedPost(id: number) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    }


    useEffect(() => {

        if (isAuthenticated) {
            fetchPosts();
        }

    }, [isAuthenticated, toast]);

    return (
        <Flex w="100%" h="100vh" justify="center" bg="#DDDDDD" >
            <Box w="100%" maxW="800px" bg="white" overflow="auto">
                <Flex w="100%" h="80px" bg="#7695EC" align="center" px="40px">
                    <Text color="white" fontSize="22px" fontWeight={700}>
                        CodeLeap Network {username}
                    </Text>
                </Flex>

                <Flex direction="column" gap="24px" p="24px">
                    <Flex minH="334px" w="100%" bg="white" borderRadius="16px" borderWidth="1px" borderColor="#999999" p="20px" direction="column" gap={5}>

                        <Text fontSize="22px" fontWeight={700}>
                            What’s on your mind?
                        </Text>

                        <VStack align="start">
                            <Text fontSize="16px" fontWeight={400}>
                                Title
                            </Text>
                            <Input
                                h="32px"
                                borderRadius='8px'
                                borderColor="#777777"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Hello world"
                            />
                        </VStack>
                        <VStack align="start">
                            <Text fontSize="16px" fontWeight={400}>
                                Content
                            </Text>

                            <Textarea
                                h="32px"
                                borderRadius='8px'
                                borderColor="#777777"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Content here"
                            />
                        </VStack>


                        <Flex justify="flex-end" mt="auto">

                            <Button
                                w="111px"
                                h='32px'
                                bg="#7695EC"
                                borderRadius="8px"
                                color="white"
                                _hover={{ bg: "#7695EC" }}
                                onClick={handleCreatePost}
                                isLoading={loadingCreate}
                                isDisabled={!title || !content}
                            >
                                Create
                            </Button>
                        </Flex>
                    </Flex>
                    {loadingPosts
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <Flex
                                key={i}
                                w="100%"
                                borderRadius="16px"
                                border="1px solid"
                                borderColor="#999999"
                                direction="column"
                                overflow="hidden"
                                bg="white"
                            >
                                <Flex
                                    w="100%"
                                    h="70px"
                                    bg="#7695EC"
                                    align="center"
                                    px="24px"
                                    justify="space-between"
                                >
                                    <Skeleton height="20px" width="200px" borderRadius="6px" />
                                    <Flex gap="10px">
                                        <Skeleton boxSize="32px" borderRadius="8px" />
                                        <Skeleton boxSize="32px" borderRadius="8px" />
                                    </Flex>
                                </Flex>

                                <Flex direction="column" p="14px" gap="12px">
                                    <Flex justify="space-between">
                                        <Skeleton height="14px" width="120px" />
                                        <Skeleton height="14px" width="80px" />
                                    </Flex>

                                    <Skeleton height="14px" />
                                    <Skeleton height="14px" width="90%" />
                                    <Skeleton height="14px" width="80%" />
                                </Flex>
                            </Flex>
                        ))
                        : posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onEdit={handleOpenEdit}
                                onDelete={handleOpenDelete}
                            />
                        ))}


                    <Flex justify="flex-end">
                        <Button w="111px" h="32px" onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <PostEditModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                post={editingPost}
                onUpdated={handleUpdatedPost}
            />

            <PostDeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                post={deletingPost}
                onDeleted={handleDeletedPost}
            />
        </Flex>
    );
}      
