import {
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Grid,
  GridItem,
  Td,
  Tr,
  Tbody,
  Thead,
  Th,
  TableContainer,
  Table,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadingBack } from "../hooks/useLoadingBack";
import useFetch from "../hooks/useFetch";
import { useLoading } from "../hooks/useLoading";

export const ViewUser = () => {
  const [user, setUser] = useState();
  const userId = useParams().id;
  const userData = useFetch("http://localhost:3009/users/" + userId);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const removeUser = () => {
    (async () => {
      await fetch("http://localhost:3009/users/" + userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resonse) => resonse.json())
        .then((result) => console.log(result));
    })();
  };

  const { loadBtn: loadDelete, handleLoadBtn: handleLoadDelete } = useLoading();
  const { loadBtn: loadEdit, handleLoadBtn: handleLoadEdit } = useLoading();
  const { backBtn, handleBackBtn } = useLoadingBack();

  const navigate = useNavigate();
  const toast = useToast();

  const handleGobackBtn = () => {
    handleBackBtn();
    setTimeout(() => navigate("/"), 1000);
  };

  const handleDeleteUser = () => {
    handleLoadDelete();
    removeUser();
    setTimeout(() => navigate("/"), 1000);
    setTimeout(
      () =>
        toast({
          title: "Deleted Succesfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        }),
      800
    );
  };

  const handleEditUser = () => {
    handleLoadEdit();
    setTimeout(() => navigate("/edit/" + userId), 1000);
  };

  return (
    <Flex
      h={"100vh"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid>
        <GridItem>
          <Flex justifyContent={"space-between"}>
            <Button
              as="a"
              w={"25%"}
              isLoading={loadDelete}
              onClick={handleDeleteUser}
              colorScheme="red"
              size="md"
              mb={4}
              borderRadius={"3xl"}
            >
              Delete
            </Button>
            <Button
              as="a"
              w={"25%"}
              isLoading={loadEdit}
              onClick={handleEditUser}
              // bg="blue.700"
              // color={"white"}
              colorScheme="blue"
              size="md"
              mb={4}
              borderRadius={"3xl"}
            >
              Edit
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex>
            <Box
              // maxW={"300px"}
              w={"full"}
              pt={5}
              bg="white"
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Flex justify={"center"}>
                <Avatar
                  size={"2xl"}
                  src={user?.img}
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
                <Stack spacing={0}>
                  <TableContainer p={5}>
                    <Table size="sm" variant="unstyled" colorScheme="messenger">
                      {/* <TableCaption>
                        Profle Details for a single user
                      </TableCaption> */}
                      <Thead>
                        <Tr>
                          <Th
                            colSpan={2}
                            bg="teal.100"
                            rounded={"2xl"}
                            textAlign={"center"}
                            fontSize={"lg"}
                            color={"teal"}
                            textTransform="uppercase"
                          >
                            Id : {user?.id}
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr pt={5}>
                          <Th>Name</Th>
                          <Td>{user?.name}</Td>
                        </Tr>
                        <Tr>
                          <Th>Username</Th>
                          <Td>{user?.username}</Td>
                        </Tr>
                        <Tr>
                          <Th>Email</Th>
                          <Td>{user?.email}</Td>
                        </Tr>
                        <Tr>
                          <Th>Street</Th>
                          <Td>{user?.address?.street}</Td>
                        </Tr>
                        <Tr>
                          <Th>City</Th>
                          <Td>{user?.address?.city}</Td>
                        </Tr>
                        <Tr>
                          <Th>Phone</Th>
                          <Td isNumeric>{user?.phone}</Td>
                        </Tr>
                      </Tbody>
                      {/* <Tfoot></Tfoot> */}
                    </Table>
                  </TableContainer>
                </Stack>

                <Button
                  as="a"
                  isLoading={backBtn}
                  onClick={handleGobackBtn}
                  w={"120px"}
                  h={"25px"}
                  bg="#49a6e9"
                  color={"aliceblue"}
                  rounded={"3xl"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  <Text textStyle={"upperXsMd"}>Go back</Text>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};
