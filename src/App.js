import { Container, Title, Space, Divider } from "@mantine/core";

import Movies from "./Movies";
import Tvshows from "./Tvshows";

function App() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center" color="red">
          NETFLIX
        </Title>
        <Space h="20px" />
        <Title order={2} align="center">
          Enjoy big movies, hit series and more from RM17
        </Title>
        <Space h="30px" />
        <Divider />
        {/* list all the movies here */}
        <Movies />
        <Tvshows />
      </Container>
    </div>
  );
}

export default App;
