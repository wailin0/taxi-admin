import {
  BellRing,
  Bike,
  CirclePlus,
  ClockArrowUp,
  Contact,
  Gauge,
  HandCoins,
  MapPinned,
  Scroll,
  Ticket,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";

const UseMenus = () => {
  return useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: (
          <Gauge
            id={"my-anchor-element-/dashboard"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Drivers",
        path: "/drivers",
        icon: (
          <Contact
            id={"my-anchor-element-/drivers"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Customers",
        path: "/customers",
        icon: (
          <UsersRound
            id={"my-anchor-element-/customers"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Setup Fees",
        path: "/setup-fees",
        icon: (
          <HandCoins
            id={"my-anchor-element-/setup-fees"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Trip History",
        path: "/trip-history",
        icon: (
          <Bike
            id={"my-anchor-element-/setup-fees"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Extra Fee",
        path: "/extra-fees",
        icon: (
          <CirclePlus
            id={"my-anchor-element-/notification"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Notifications",
        path: "/notification",
        icon: (
          <BellRing
            id={"my-anchor-element-/notification"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },

      {
        name: "Top-up",
        path: "/top-up",
        icon: (
          <Wallet
            id={"my-anchor-element-/top-up"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Post",
        path: "/posts",
        icon: (
          <Scroll
            id={"my-anchor-element-/posts"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Cupon",
        path: "/cupons",
        icon: (
          <Ticket
            id={"my-anchor-element-/cupons"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      // {
      //     name: "Facilities",
      //     path: "/facilities",
      //     icon: <Living />
      // },
      {
        name: "Book Orders",
        path: "/book-orders",
        icon: (
          <ClockArrowUp
            id={"my-anchor-element-/book-orders"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
      {
        name: "Map",
        path: "/map",
        icon: (
          <MapPinned
            id={"my-anchor-element-/map"}
            className=" text-gray-400 w-[20px] "
          />
        ),
      },
    ],
    []
  );
};

export default UseMenus;
