import React from "react";
import {
  Paper,
  Typography,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import AddCategoryModal from "./AddCategoryModal";
import { useNavigate } from "react-router-dom";
import {
  addCategory,
  deleteCategory,
  getCategories,
  renameCategory,
  reorderCategories,
} from "../../../services/category.service";
import { alertActions } from "../../../store/alert-slice";
import { isAdmin, errorMessageFromAxiosError } from "../../../utils/helpers";
import {
  useAppDispatch,
  useAppSelector,
  useEffectOnce,
} from "../../../utils/hooks";
import { Category } from "../../../utils/types";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RenameCategoryModal from "./RenameCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const PAGE_SIZE = 50;

enum Modal {
  None = 0,
  AddCategory = 1,
  RenameCategory = 2,
  DeleteCategory = 3,
}

const AdminCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((user) => user.auth.user);

  const [modalStatus, setModalStatus] = React.useState(Modal.None);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(0);

  const [categories, setCategories] = React.useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: string;
    title: string;
  }>();

  useEffectOnce(() => {
    const abortController = new AbortController();
    if (!user || !isAdmin(user)) {
      navigate("/", { replace: true });
    } else {
      getCategories(currentPage - 1, PAGE_SIZE, abortController.signal)
        .then((res) => {
          setCategories(res.content);
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
    }
    return () => abortController.abort();
  });

  const getCategoriesData = React.useCallback(
    (abortSignal?: AbortSignal) => {
      getCategories(currentPage - 1, PAGE_SIZE, abortSignal)
        .then((res) => {
          setCategories(res.content);
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
    },
    [currentPage, dispatch]
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    getCategoriesData(abortController.signal);
    return () => abortController.abort();
  }, [currentPage, getCategoriesData]);

  const reorderCategoriesHandler = (categ: Category[]) => {
    const keyVal: { [id: string]: number } = {};
    categ.reduce(
      (prev, curr, currIndex) => ((keyVal[curr.id] = currIndex), prev),
      {}
    );
    reorderCategories(keyVal)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: "Successfully changed the category order",
          })
        );
        getCategoriesData();
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
  };

  const onMoveUp = (idInArray: number) => {
    if (idInArray <= 0) {
      return;
    }

    setCategories((prevState) => {
      const newState = [...prevState];
      const temp = newState[idInArray - 1];
      newState[idInArray - 1] = newState[idInArray];
      newState[idInArray] = temp;
      reorderCategoriesHandler(newState);
      return newState;
    });
  };

  const onMoveDown = (idInArray: number) => {
    if (idInArray >= categories.length - 1) {
      return;
    }

    setCategories((prevState) => {
      const newState = [...prevState];
      const temp = newState[idInArray + 1];
      newState[idInArray + 1] = newState[idInArray];
      newState[idInArray] = temp;
      reorderCategoriesHandler(newState);
      return newState;
    });
  };

  const addCategoryHandler = (enteredTitle: string) => {
    addCategory(enteredTitle)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `Successfully added category ${enteredTitle}`,
          })
        );
        setModalStatus(Modal.None);
        getCategoriesData();
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
  };

  const onRenameCategoryHandler = (newTitle: string) => {
    if (!selectedCategory) {
      return;
    }

    renameCategory(selectedCategory?.id, newTitle)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `Successfully changed category ${selectedCategory?.title} title to ${newTitle}`,
          })
        );
        onCloseModal();
        getCategoriesData();
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
  };

  const onDeleteCategoryHandler = () => {
    if (!selectedCategory) {
      return;
    }

    deleteCategory(selectedCategory?.id)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `Successfully deleted category ${selectedCategory?.title}`,
          })
        );
        onCloseModal();
        getCategoriesData();
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
  };

  const onCloseModal = () => {
    setModalStatus(Modal.None);
    setSelectedCategory(undefined);
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "white",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "inherit",
            width: "100%",
          }}
        >
          <Typography variant="h5">Category control</Typography>
          <Typography variant="subtitle2">Control the categories</Typography>
          <br />
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell>Last edited at</TableCell>
                  <TableCell>Rename</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Up</TableCell>
                  <TableCell>Down</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.title}</TableCell>
                    <TableCell>{category.createdBy.username}</TableCell>
                    <TableCell>
                      {new Date(category.createDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(category.lastEditDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setModalStatus(Modal.RenameCategory);
                          setSelectedCategory({
                            id: category.id,
                            title: category.title,
                          });
                        }}
                      >
                        Rename
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => {
                          setModalStatus(Modal.DeleteCategory);
                          setSelectedCategory({
                            id: category.id,
                            title: category.title,
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        sx={{ marginRight: { xs: "0px", md: "10px" } }}
                        size="small"
                        onClick={() => onMoveUp(index)}
                        title="Move category up"
                        disabled={index <= 0}
                      >
                        <KeyboardArrowUpIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => onMoveDown(index)}
                        title="Move category down"
                        disabled={index >= categories.length - 1}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <Stack alignItems={"center"}>
              <Pagination
                count={maxPage}
                page={currentPage}
                onChange={(_event, page) => setCurrentPage(page)}
                defaultPage={0}
              />
            </Stack>
            <br />
            <Button
              variant="outlined"
              onClick={() => setModalStatus(Modal.AddCategory)}
            >
              Add category
            </Button>
            <br />
            <br />
          </>
        </Paper>
      </Paper>
      {modalStatus == Modal.AddCategory && (
        <AddCategoryModal
          open={modalStatus == Modal.AddCategory}
          onHandleClose={onCloseModal}
          onHandleAdd={addCategoryHandler}
        />
      )}
      {modalStatus == Modal.RenameCategory && (
        <RenameCategoryModal
          open={modalStatus == Modal.RenameCategory}
          selectedTitle={selectedCategory?.title ?? ""}
          onHandleClose={onCloseModal}
          onHandleRename={onRenameCategoryHandler}
        />
      )}
      {modalStatus == Modal.DeleteCategory && (
        <DeleteCategoryModal
          open={modalStatus == Modal.DeleteCategory}
          selectedTitle={selectedCategory?.title ?? ""}
          onHandleClose={onCloseModal}
          onHandleDelete={onDeleteCategoryHandler}
        />
      )}
    </>
  );
};

export default AdminCategories;
