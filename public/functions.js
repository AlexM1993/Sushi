const button = document.getElementById("bigButton");
const nickButton = document.getElementById("nickNameButton");

console.log(window.location.href);
let str = window.location.href;
let s = str.replace("http://localhost:3000/", "");
console.log(s);

////////////deactivate account button below///////////////

button.addEventListener("click", async () => {
  if (document.getElementById("userEmail").value != "") {
    const error = () => {
      document.getElementById("userEmail").value = "";
      document.getElementById("userEmail").placeholder =
        "Couldn't find account :(";
    };

    const optionsGet = {
      headers: {
        authority: "api.protected.com",
        "protected-referer": "protected-protected",
        referer: "https://protected.protected.com/",
        "Access-Control-Allow-Origin": "<origin>",
        origin: "https://protected.protected.com",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      methodType: "json",
    };

    const response = await axios.get(
      `https://obscure-inlet-00533.herokuapp.com/https://api.protected.com/users/protected/users?email=${document
        .getElementById("userEmail")
        .value.toLowerCase()}`,
      optionsGet
    );
    console.log(response.data);
    console.log(response.data.payload[0].id);
    try {
      const updated = () => {
        document.getElementById("userEmail").value = "";
        document.getElementById(
          "userEmail"
        ).placeholder = `Deactivated ${response.data.payload[0].nickname}`;
      };
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode(
        `https://protected.protected.com/#/users/${response.data.payload[0].id}`
      );
      newDiv.appendChild(newContent);
      const currentDiv = document.getElementById("diprotected");
      document.body.insertBefore(newDiv, currentDiv);

      const id = response.data.payload[0].id;
      console.log(id);

      const optionsPut = {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
          Authorization: `Bearer ${token}`,
          authority: "api.protected.com",
          "content-type": "application/json;charset=UTF-8",
        },
        contentType: "application/json",
      };

      const put = await axios.put(
        `https://obscure-inlet-00533.herokuapp.com/https://api.protected.com/users/protected/users/${id}`,
        JSON.stringify({ registration_status: "deactivated" }),
        optionsPut
      );
      updated();
    } catch (err) {
      error();
    }
  } else {
    document.getElementById("userEmail").placeholder = "Field cannot be blank";
  }
});

////////////////////////////Release about button below//////////////////////////////////

nickButton.addEventListener("click", async () => {
  const optionsPutIncomplete = {
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      Authorization: `Bearer ${token}`,
      authority: "api.protected.com",
      "content-type": "application/json;charset=UTF-8",
    },
    contentType: "application/json",
  };

  if (document.getElementById("userNickname").value != "") {
    const error = () => {
      document.getElementById("userNickname").value = "";
      document.getElementById("userNickname").placeholder =
        "Couldn't find account :(";
    };

    const optionsGet = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      methodType: "json",
    };

    try {
      const response = await axios.get(
        `https://obscure-inlet-00533.herokuapp.com/https://api.protected.com/users/protected/nicknames/${
          document.getElementById("userNickname").value
        }`,
        optionsGet
      );

      try {
        const updated = () => {
          document.getElementById("userNickname").value = "";
          document.getElementById("userNickname").placeholder = "Success";
        };

        const id = response.data.payload.id;
        console.log(id);

        const optionsPut = {
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            accept: "application/json",
            "accept-language": "en-US,en;q=0.9",
            Authorization: `Bearer ${token}`,
            authority: "api.protected.com",
            "content-type": "application/json;charset=UTF-8",
          },
          contentType: "application/json",
        };

        const put = await axios.put(
          `https://obscure-inlet-00533.herokuapp.com/https://api.protected.com/users/protected/users/${id}`,
          JSON.stringify({
            about: "",
          }),
          optionsPut
        );
        updated();
      } catch (err) {
        error();
      }
    } catch {
      error();
    }
  } else {
    document.getElementById("userNickname").placeholder =
      "Field cannot be blank";
  }
});

const sendPutRequest = async (url, options) => {
  try {
    const response = await axios(url, options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRandomNumber = () => Math.floor(Math.random() * 5) + 1;

const generateNewNickname = (sharedName) => {
  const randomNumber = getRandomNumber();
  const prefix = `randNum${randomNumber}`;
  return `${prefix}${sharedName.nickname}`;
};

const isMatchPlayedMoreThanTwoYearsAgo = (gameFinishTime) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return (
    gameFinishTime === undefined ||
    currentTimeInSeconds - gameFinishTime > 63072000
  );
};

const isMatchPlayedLessThanTwoYearsAgo = (gameFinishTime) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return (
    gameFinishTime !== undefined &&
    currentTimeInSeconds - gameFinishTime < 63072000
  );
};

const canReleaseName = (gameFinishTime) => {
  return (
    gameFinishTime === undefined ||
    isMatchPlayedMoreThanTwoYearsAgo(gameFinishTime)
  );
};

const handleSearchButtonClick = async () => {
  const releaseNickname = document.getElementById("releaseNickname");
  const searchQuery = releaseNickname.value;

  const searchUrl = `https://api.hidden.com/search/pagination.limit=30&query=${searchQuery}&Authorization=Bearer ${apiKey}`;

  try {
    const searchResponse = await axios.get(searchUrl);
    const searchData = searchResponse.data;
    const userSearch = searchData.payload.results;

    const regex = new RegExp(`${searchQuery}`, "i");

    const sharedNames = userSearch.filter(({ nickname }) => {
      return nickname.length === searchQuery.length && nickname.match(regex);
    });

    for (let sharedName of sharedNames) {
      const numOfGames = sharedName.games.length;

      if (numOfGames !== 0 && sharedName.nickname.length < 12) {
        for (let game of sharedName.games) {
          const gameUrl = `https://open.protected.com/data/protected/${sharedName.id}/history?game=${game.name}&from=24&offset=0&limit=1`;

          const optionsPutData = {
            method: "PUT",
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive",
              accept: "application/json",
              "accept-language": "en-US,en;q=0.9",
              Authorization: `Bearer ${token}`,
              authority: "hidden.com",
              "content-type": "application/json;charset=UTF-8",
            },
            data: JSON.stringify({
              nickname: generateNewNickname(sharedName),
              registration_status: "deactivated",
            }),
          };

          const gameResponse = await sendPutRequest(gameUrl, optionsPutData);
          console.log(gameResponse);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};