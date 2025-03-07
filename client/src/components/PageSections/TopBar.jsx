import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import CartIcon from "../Cart/CartIcon";
import { CartState } from "../../context/cart";
import Cart from "../../pages/Products/Cart";
import { useDisclosure } from "@chakra-ui/react";
import notifications from "../../data/notifications.json";
import moment from "moment";
import { useOutsideClick } from "@chakra-ui/react";
import { useAuthState } from "../../context";
import UserBadge from "../UserBadge";

const NotificationItem = ({ notification }) => {
  return (
    <VStack spacing={0} my={3} p={3} zIndex="100000">
      <VStack>
        <HStack alignSelf="left" w="100%">
          <Avatar size="xs" src={notification.profile_pic} />
          <Text fontSize="0.9em">{notification.name}</Text>
          <Spacer />
          <Text textAlign="right" fontSize="0.9em" color="neutral.300">
            {moment(notification.time_sent).format("h:mm a")}
          </Text>
        </HStack>
        <Text textAlign="left" ml={3} fontSize="0.8em" noOfLines={2}>
          {notification.message}
        </Text>
      </VStack>
    </VStack>
  );
};

const TopBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { cartItems } = CartState();
  const CartQuantity = cartItems.reduce(
    (cartTotalQuantity, item) => cartTotalQuantity + item.quantity,
    0
  );
  const [show, setShow] = useState(false);
  const ref = React.useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setShow(false),
  });

  const { userDetails, isAuthenticated } = useAuthState();

  function emailUsername(emailAddress) {
    return emailAddress.match(/^(.+)@/)[1];
  }

  return (
    <>
      <Flex py={3} px={5} alignItems="center" w="85vw" bg="white" h="10vh">
        <VStack alignItems="left" spacing="3px">
          <HStack>
            <Text fontSize="1.5em">Welcome Back, </Text>
            <Text fontWeight="bold" fontSize="1.5em" color="brand.300">
              {emailUsername(`${userDetails?.email}`)}
            </Text>
          </HStack>
          <Text fontSize="0.7em">
            Check out todays stats Check out todays stats Check out todays stats
          </Text>
        </VStack>
        <Spacer />
        <HStack spacing="30px" mr={3} alignItems="baseline">
          {show ? (
            <InputGroup>
              <InputLeftElement>
                <FiSearch />
              </InputLeftElement>
              <Input
                borderRadius="50px"
                placeholder="Search...."
                ref={ref}
                width="400px"
              />
            </InputGroup>
          ) : (
            <Icon
              as={FiSearch}
              h={5}
              w={5}
              cursor="pointer"
              onClick={() => setShow(true)}
            />
          )}
          <CartIcon
            number={CartQuantity}
            color={"black"}
            handleOpenCart={() => onOpen()}
          />
          <Popover isLazy>
            <PopoverTrigger>
              <Tag rounded="2xl" h="8px" cursor="pointer" flexShrink={0}>
                <HStack>
                  <Icon as={MdNotifications} />
                  <Text>12</Text>
                </HStack>
              </Tag>
            </PopoverTrigger>
            <PopoverContent zIndex="100">
              <PopoverHeader textAlign="left" fontWeight="semibold">
                Notifications
              </PopoverHeader>
              <PopoverBody>
                {notifications?.slice(0, 5).map((notification) => {
                  return (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  );
                })}
                <Text>View all</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
        <HStack>
          {isAuthenticated && userDetails.token ? (
            <UserBadge userDetails={userDetails} />
          ) : null}
        </HStack>
      </Flex>
      <Cart isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TopBar;
