import React from "react";
import { Box, Pagination, Paper, Stack } from "@mui/material";
import { Topic } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks";
import { getCategoryTopics } from "../../services/category.service";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import TopicBar from "./TopicBar";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

interface TopicsProps {
  categoryId: string;
}

const Topics = (props: TopicsProps) => {
  const { categoryId } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(0);

  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    const abortController = new AbortController();

    getCategoryTopics(
      categoryId,
      currentPage - 1,
      PAGE_SIZE,
      abortController.signal
    )
      .then((res) => {
        setTopics(res.content);
        setCurrentPage(res.number + 1);
        setMaxPage(res.totalPages);
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          alertActions.changeAlert({
            type: "error",
            message: errorMessageFromAxiosError(e),
          })
        );
      });
    return () => abortController.abort();
  }, [categoryId, currentPage, dispatch, navigate]);

  return (
    <Box
      sx={{
        paddingY: "10px",
        marginBottom: "10px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "100%", flex: 1 }}>
        {topics.map((topic) => (
          <TopicBar key={topic.id} id={topic.id} title={topic.title} />
        ))}
      </Box>
      <Stack alignItems={"center"}>
        <Pagination
          count={maxPage}
          page={currentPage}
          onChange={(_event, page) => setCurrentPage(page)}
          defaultPage={0}
        />
      </Stack>
    </Box>
  );
};

export default Topics;
