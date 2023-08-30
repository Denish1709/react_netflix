import { useState, useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function TvshowEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [premiere_year, setPremiereYear] = useState("");
  const [seasons, setSeasons] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/tvshows/" + id)
      .then((response) => {
        // set value for every fields
        setTitle(response.data.title);
        setCreator(response.data.creator);
        setPremiereYear(response.data.premiere_year);
        setSeasons(response.data.seasons);
        setGenre(response.data.genre);
        setRating(response.data.rating);
      })
      .catch((error) => {
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleUpdateTvshow = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:5000/tvshows/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          title: title,
          creator: creator,
          premiere_year: premiere_year,
          seasons: seasons,
          genre: genre,
          rating: rating,
        }),
      });
      // show add success message
      notifications.show({
        title: "Tvshow Edited",
        color: "green",
      });
      // redirect back to home page
      navigate("/");
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
        Edit Tvshow
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={title}
          placeholder="Enter the Tvshow here"
          label="Title"
          description="The title of the Tvshow"
          withAsterisk
          onChange={(event) => setTitle(event.targget.value)}
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
          placeholder="Enter the Tvshow seasons"
          label="Seasons"
          description="The seasons of the Tvshow"
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
        <Button fullWidth onClick={handleUpdateTvshow}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}

export default TvshowEdit;
