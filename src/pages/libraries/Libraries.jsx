import { Container, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API } from "../../api/api";

const Libraries = () => {
  const { data: libruaries } = useQuery({
    queryKey: ["libruraies"],
    queryFn: () => API.get("libraries/libraries/").then((res) => res.data),
  });
  console.log(libruaries);

  return (
    <Container className="mt-[100px]">
      <div>
        <h1>KutubXonalar ruyxati</h1>
      </div>
      <div>
        <Input placeholder="Kutubxonalarni qidirish" />

      </div>
      <div>
        {
          
        }
      </div>
    </Container>
  );
};

export default Libraries;
