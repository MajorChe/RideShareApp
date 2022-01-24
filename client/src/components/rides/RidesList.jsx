import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import RidesListItem from "./RidesListItem";

const RidesList = (props) => {
  const createRideItems = () => {
    return props.rides.map((ride) => {
      return (
        <RidesListItem
          ride_id={ride.ride_id}
          name={ride.name}
          avatar={ride.avatar}
          contact={ride.contact}
          date={ride.date}
          origin={ride.origin}
          destination={ride.destination}
          date_of_ride={ride.date_of_ride}
          time_of_ride={ride.time_of_ride}
          cost={ride.cost}
          available_seats={ride.available_seats}
          pick_up={ride.pick_up}
          drop_off={ride.drop_off}
          ride_description=""
          ride_image={ride.ride_image}
        />
      );
    });
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} mt={"10px"}>
      {createRideItems()}
    </SimpleGrid>
  );
};

export default RidesList;
