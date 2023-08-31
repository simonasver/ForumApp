import React from "react";
import { Box, Typography } from "@mui/material";
import CategoryBar from "./CategoryBar";
import { Category } from "../../utils/types";
import { useAppDispatch, useEffectOnce } from "../../utils/hooks";
import { getCategories } from "../../services/category.service";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";

const PAGE_SIZE = 50;

const Categories = () => {
  const dispatch = useAppDispatch();

  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffectOnce(() => {
    const abortController = new AbortController();

    getCategories(0, PAGE_SIZE, abortController.signal)
      .then((res) => {
        setCategories(res.content);
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
  });

  return (
    <Box sx={{ paddingY: "10px", marginBottom: "10px" }}>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        paddingBottom={"5px"}
        borderBottom={"1px solid grey"}
      >
        Categories
      </Typography>
      {categories.map((category) => (
        <CategoryBar
          key={category.id}
          id={category.id}
          title={category.title}
        />
      ))}
    </Box>
  );
};

export default Categories;
