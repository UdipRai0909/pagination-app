import { useState } from "react";

const useFetchPost = (url, method, userState) => {
  const [data, setData] = useState();

  const handleFetchPost = () => {
    (async () => {
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userState.name,
          username: userState.username,
          email: userState.email,
          address: {
            street: userState.street,
            city: userState.city,
          },
          img: `https://xsgames.co/randomusers/assets/avatars/female/${
            Math.floor(Math.random() * 80) + 20
          }.jpg`,
          phone: userState.phone,
        }),
      })
        .then((response) => response.json())
        .then((json) => setData(json));
    })();
  };

  console.log(data);

  return { handleFetchPost };
};

export default useFetchPost;
