import { useEffect, useState } from "react";
import {
  Text,
  Grid,
  Stack,
  GridItem,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Homepage } from "./components/Homepage";
import useFetch from "./hooks/useFetch";
import { useLoading } from "./hooks/useLoading";
import { useNavigate } from "react-router-dom";

export const App = () => {
  // States
  const [users, setUsers] = useState();

  // API
  const page1 = useFetch("http://localhost:3009/users/?_page=1&_limit=4");
  const page2 = useFetch("http://localhost:3009/users/?_page=2&_limit=4");
  const page3 = useFetch("http://localhost:3009/users/?_page=3&_limit=4");
  const page4 = useFetch("http://localhost:3009/users/?_page=4&_limit=4");

  // Use Effect
  useEffect(() => {
    setUsers(page1);
  }, [page1]);

  // Navigation
  const navigate = useNavigate();

  // Custom Hooks
  const { loadBtn, handleLoadBtn } = useLoading();

  // Handle Functions
  const handleAddUser = () => {
    handleLoadBtn();
    setTimeout(() => navigate("create"), 1000);
  };

  return (
    <Stack>
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(4, 1fr)"
        px={10}
      >
        <GridItem rowSpan={1} colSpan={4}>
          <Flex flexDirection={"column"} alignItems={"center"} mt={5}>
            <Text fontSize="5xl" fontWeight={"bold"} letterSpacing={2}>
              Pagination
            </Text>
            <Divider borderColor="#49a6e9" border={4} w="8%" />
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"right"}
            pr={"40px"}
            my={1}
          >
            <Button
              as="a"
              isLoading={loadBtn}
              onClick={handleAddUser}
              colorScheme="teal"
              size="md"
              mb={4}
            >
              Add a new user
            </Button>
          </Flex>
        </GridItem>

        <Homepage usersData={users} />

        <GridItem rowSpan={1} colSpan={4} alignSelf="end">
          <Flex justifyContent={"center"}>
            <Button as="a" colorScheme="teal" onClick={() => setUsers(page1)}>
              1
            </Button>
            <Button
              as="a"
              colorScheme="teal"
              ml={5}
              onClick={() => setUsers(page2)}
            >
              2
            </Button>
            <Button
              as="a"
              colorScheme="teal"
              ml={5}
              onClick={() => setUsers(page3)}
            >
              3
            </Button>
            <Button
              as="a"
              colorScheme="teal"
              ml={5}
              onClick={() => setUsers(page4)}
            >
              4
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Stack>
  );
};
