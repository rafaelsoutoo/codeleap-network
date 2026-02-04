import { PostDTO } from "@/dtos/posts.dto";
import { useAuth } from "@/hooks/useAuth";
import { formatTimeAgo } from "@/utils/date";
import { Flex, IconButton, Image, Text } from "@chakra-ui/react";

type PostCardProps = {
    post: PostDTO;
    onEdit: (post: PostDTO) => void;
    onDelete: (post: PostDTO) => void;

};

export function PostCard({ post, onEdit, onDelete }: PostCardProps) {

    const { username } = useAuth();

    const isOwner = username == post.username

    return (
        <Flex
            w="100%"
            bg="white"
            borderRadius="16px"
            border="1px solid"
            borderColor="#999999"
            overflow="auto"
            direction="column"
        >
            <Flex
                w="100%"
                minH="70px"
                bg="#7695EC"
                align="center"
                px="24px"
                justify="space-between"
            >
                <Text color="white" fontSize="22px" fontWeight={600}>
                    {post.title}
                </Text>


                {isOwner && (

                    <Flex gap="10px">
                        <IconButton
                            aria-label="Delete post"
                            icon={<Image src="/trashIcon.png" boxSize="18px" />}
                            variant="ghost"
                            color="white"
                            _hover={{ bg: "rgba(255,255,255,0.2)" }}
                            onClick={() => onDelete(post)}
                        />


                        <IconButton
                            aria-label="Edit post"
                            icon={<Image src="/editIcon.png" boxSize="18px" />}
                            variant="ghost"
                            color="white"
                            _hover={{ bg: "rgba(255,255,255,0.2)" }}
                            onClick={() => onEdit(post)}
                        />

                    </Flex>
                )
                }
            </Flex>

            <Flex direction="column" p="14px" gap="12px">
                <Flex justify="space-between" align="center">
                    <Text fontWeight={700} color="#777777" fontSize="14px">
                        @{post.username}
                    </Text>

                    <Text color="#777777" fontSize="14px" fontWeight={400}>
                        {formatTimeAgo(post.created_datetime)}
                    </Text>
                </Flex>

                <Text fontSize="16px" color="#000000">
                    {post.content}
                </Text>
            </Flex>
        </Flex>
    );
}
