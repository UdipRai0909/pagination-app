import {
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";

export const Homepage = (props) => {
  // States

  // Props
  const { usersData } = props;

  // Custom Hooks
  const { loadBtn: loadView, handleLoadBtn: handleLoadView } = useLoading();

  // Navigation, Location
  const navigate = useNavigate();

  // Handle Functions
  const handleViewProfile = (id) => {
    handleLoadView();
    setTimeout(() => navigate("/view/" + id), 1000);
    // navigate("/view/" + id)
  };

  return (
    <>
      {usersData &&
        usersData.map((user, i) => (
          <GridItem
            rowSpan={2}
            colSpan={1}
            alignSelf="end"
            key={Date.now() + i}
            px={5}
          >
            <Center>
              <Box
                maxW={"240px"}
                w={"full"}
                py={5}
                bg="white"
                boxShadow={"2xl"}
                rounded={"2xl"}
                overflow={"hidden"}
              >
                <Flex justify={"center"}>
                  <Avatar
                    size={"2xl"}
                    src={user.img}
                    // alt="Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Flex
                  pb={5}
                  mt={3}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Stack spacing={0} align={"center"}>
                    <Text textStyle={"profileStyle"}>{user.name}</Text>
                    <Text textStyle={"profileEmail"}>{user.email}</Text>
                  </Stack>

                  <Button
                    as="a"
                    isLoading={loadView}
                    onClick={() => handleViewProfile(user.id)}
                    w={"120px"}
                    h={"25px"}
                    mt={5}
                    bg="#49a6e9"
                    color={"aliceblue"}
                    rounded={"3xl"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    <Text textStyle={"upperXsMd"}>View Profile</Text>
                  </Button>
                </Flex>
              </Box>
            </Center>
          </GridItem>
        ))}
    </>
  );
};
