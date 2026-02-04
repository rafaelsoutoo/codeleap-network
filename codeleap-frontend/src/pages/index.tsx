import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, signIn } = useAuth();

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isAuthenticated) router.replace("/main");
  }, [isAuthenticated, router]);



  async function handleEnter() {
    await signIn(username);
    router.push("/main");
  }



  return (
    <Flex w="100vw" h="100vh" justify="center" align="center" bg="#DDDDDD">
      <Box
        w="500px"
        h="205px"
        p="24px"
        gap={4}
        bg="#FFFFFF"
        borderRadius="16px"
        border="1px solid"
        borderColor="#CCCCCC"
        display="flex"
        flexDirection="column"
      >
        <Text color="#000000" fontSize="22px" fontWeight={700}>
          Welcome to CodeLeap network!
        </Text>

        <VStack align="start" gap="2px" >
          <Text color="#000000" fontSize="16px" fontWeight={400}>
            Please enter your username
          </Text>
          <Input
            h="32px"
            borderRadius='8px'
            borderColor="#777777"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John doe"
          />
        </VStack>


        <Flex justify="flex-end" mt="auto">
          <Button
            w="111px"
            h='32px'
            bg="#7695EC"
            borderRadius="8px"
            color="white"
            onClick={handleEnter}
            isDisabled={!username}
          >ENTER
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
