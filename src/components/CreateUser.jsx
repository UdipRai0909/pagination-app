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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingBack } from "../hooks/useLoadingBack";
import { useLoading } from "../hooks/useLoading";
import useFetchPost from "../hooks/useFetchPost";

export const CreateUser = () => {
  const [userCreate, setUserCreate] = useState();
  const { handleFetchPost } = useFetchPost(
    "http://localhost:3009/users",
    "POST",
    userCreate
  );
  const { backBtn, handleBackBtn } = useLoadingBack();
  const { loadBtn, handleLoadBtn } = useLoading();
  const navigate = useNavigate();
  const toast = useToast();

  const handleOnChange = (e) => {
    setUserCreate({
      ...userCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOnSubmit = () => {
    handleLoadBtn();
    handleFetchPost();
    setTimeout(navigate("/"), 1000);
    setTimeout(
      () =>
        toast({
          title: "Created Successfully",
          description: `Name: ${userCreate?.name}`,
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
      bg="green.700"
      color="#fff"
    >
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Create Form</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onChange={handleOnChange} onSubmit={handleCreateOnSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" type="text" placeholder="Name.." />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name="username" type="text" placeholder="User Name.." />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="test@test.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <Input name="street" type="text" placeholder="Street Address.." />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input name="city" type="text" placeholder="City Name.." />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" type="text" placeholder="Phone number" />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <Button
                isLoading={loadBtn}
                type="submit"
                width="half"
                mt={4}
                bg="green.900"
                border="1px solid white"
                _hover={{ background: "green.600" }}
              >
                Create
              </Button>

              <Button
                as="a"
                isLoading={backBtn}
                type="button"
                width="half"
                mt={4}
                bg="green.900"
                border="1px solid white"
                _hover={{ background: "green.600" }}
                onClick={handleBackBtn}
              >
                Go Back
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
