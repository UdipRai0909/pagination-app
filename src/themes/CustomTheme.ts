import { extendTheme } from "@chakra-ui/react";

export const CustomTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.300",
      },
    },
  },
  textStyles: {
    profileStyle: { fontSize: "md", fontWeight: "bold", color: "#617d98" },
    profileEmail: { fontSize: "xs", color: "gray.500" },
    upperXsMd: {
      textTransform: "uppercase",
      fontSize: "xs",
      fontWeight: "md",
    },
  },
});
