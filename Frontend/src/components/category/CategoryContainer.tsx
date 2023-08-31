import { useNavigate } from "react-router-dom";
import { useAppDispatch, useEffectOnce } from "../../utils/hooks";
import React from "react";
import { Category } from "../../utils/types";
import { getCategory } from "../../services/category.service";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import Topics from "../topic/Topics";
import { Box, Typography } from "@mui/material";

interface CategoryContainerProps {
  categoryId: string;
}

const CategoryContainer = (props: CategoryContainerProps) => {
  const { categoryId } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = React.useState<Category>();

  useEffectOnce(() => {
    getCategory(categoryId)
      .then((res) => {
        setCategory(res);
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          alertActions.changeAlert({
            type: "error",
            message: errorMessageFromAxiosError(e),
          })
        );
        // navigate("/", { replace: true });
      });
  });

  return (
    <Box
      sx={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={"bold"}
        paddingY={"5px"}
        borderBottom={"1px solid grey"}
      >
        Topics of category {category?.title || categoryId}
      </Typography>
      <Topics categoryId={categoryId} />
    </Box>
  );
};

export default CategoryContainer;
