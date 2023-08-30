import { useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function TvshowAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [premiere_year, setPremiereYear] = useState("");
  const [seasons, setSeasons] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const handleAddNewTvshow = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "http://localhost:5000/tvshows",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          title: title,
          creator: creator,
          premiere_year: premiere_year,
          seasons: seasons,
          genre: [genre],
          rating: rating,
        }),
      });
      // show add success message
      notifications.show({
        title: "Tvshow Added",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Add new Tv Show
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={title}
          placeholder="Enter the Tv Show title here"
          label="Title"
          description="The title of the Tvshow"
          withAsterisk
          onChange={(event) => setTitle(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={creator}
          placeholder="Enter the Tvshow creator"
          label="Creator"
          description="The creator of the Tvshow"
          withAsterisk
          onChange={(event) => setCreator(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={premiere_year}
          placeholder="Enter the premiere year here"
          label="Premiere Year"
          description="The premiere Year of the movie"
          withAsterisk
          onChange={setPremiereYear}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={seasons}
          placeholder="Enter the Tvshow Season here"
          label="Season"
          description="The Tvshow season"
          withAsterisk
          onChange={(event) => setSeasons(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={genre}
          placeholder="Enter the Tvshow Genre here"
          label="Genre"
          description="The genre of the Tvshow"
          withAsterisk
          onChange={(event) => setGenre(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={rating}
          placeholder="Enter the rating here"
          label="Rating"
          description="The rating of the movie"
          withAsterisk
          onChange={setRating}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewTvshow}>
          Add new Tvshow
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="grey">
          Go back to Home
        </Button>
      </Group>
      <Space h="20px" />
    </Container>
  );
}

export default TvshowAdd;
