import { Box, Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import notfound from "../../assets/Forgot password-cuate.svg";

const ActivateAccount = () => {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const verify_account = async (e) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `https://glamourhaven.herokuapp.com/accounts/users/activation/`,
        {
          uid: uid,
          token: token,
        },
        config
      );

      if (data) {
        console.log(data);
        setVerified(true);
      }
      alert("Activation successful");
      // .then(function())
    } catch (error) {
      setVerified(false);
      console.log("Ërror occurred");
      alert("Ërror occurred");
    }
    if (verified) navigate("/login");
  };

  if (verified) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Center pt="48">
        <VStack>
          <Image height="40vh" src={notfound} />
          <Text>
            Were sorry. We dont know how you got here but we can find our way
            back. Click here to go back to the home page
          </Text>
          <Button
            type="submit"
            bg="brand.300"
            color="#fff"
            onClick={verify_account}
            py
          >
            Activate Account
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default ActivateAccount;
