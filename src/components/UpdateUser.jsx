import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useFetchPost from "../hooks/useFetchPost";
import { useLoading } from "../hooks/useLoading";
import { useLoadingBack } from "../hooks/useLoadingBack";

export const UpdateUser = () => {
  const [user, setUser] = useState();
  const [userUpdate, setUserUpdate] = useState();
  const userId = useParams().id;
  const userData = useFetch("http://localhost:3009/users/" + userId);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const navigate = useNavigate();
  const toast = useToast();

  const { handleFetchPost } = useFetchPost(
    `http://localhost:3009/users/${userId}`,
    "PATCH",
    userUpdate
  );
  const { loadBtn, handleLoadBtn } = useLoading();
  const { backBtn, handleBackBtn } = useLoadingBack();

  const handleGetBackUpdate = () => {
    handleBackBtn();
    setTimeout(() => navigate("/"), 1000);
  };

  const handleUpdateOnChange = (e) => {
    setUserUpdate({ ...userUpdate, [e.target.name]: [e.target.value] });
  };

  const handleUpdateOnSubmit = () => {
    handleLoadBtn();
    handleFetchPost();
    setTimeout(navigate("/"), 1000);
    setTimeout(
      () =>
        toast({
          title: `Edited Successfully`,
          description: `ID: ${user?.id}, Username: ${user?.username}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        }),
      800
    );
  };

  return (
    <Flex
      w="full"
      h="100vh"
      align="center"
      justifyContent="center"
      bg="blue.700"
      color="#fff"
    >
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Edit Form</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onChange={handleUpdateOnChange} onSubmit={handleUpdateOnSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                defaultValue={user?.name}
                placeholder="Name.."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                defaultValue={user?.username}
                placeholder="User Name.."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                defaultValue={user?.email}
                placeholder="test@test.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <Input
                type="text"
                defaultValue={user?.address?.street}
                placeholder="Street Address.."
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                defaultValue={user?.address?.city}
                placeholder="City Name.."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                defaultValue={user?.phone}
                placeholder="Phone number"
              />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <Button
                isLoading={loadBtn}
                bg="blue.900"
                border="1px solid white"
                width="half"
                mt={4}
                type="submit"
                _hover={{ background: "blue.600" }}
              >
                Update
              </Button>
              <Button
                isLoading={backBtn}
                onClick={handleGetBackUpdate}
                width="half"
                mt={4}
                bg="blue.900"
                border="1px solid white"
                type="button"
                _hover={{ background: "blue.600" }}
                // onClick={}
              >
                Go back
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
