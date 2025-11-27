import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "../services/api";
import { setTasks, deleteTask } from "../src/redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Typography,
  Card,
  Divider,
  Paper,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { logout } from "../src/redux/slices/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { list: tasks = [] } = useSelector((state) => state.tasks || {});
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginatedTasks = tasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  const loadTasks = async () => {
    try {
      const res = await apiRequest("/tasks", "GET");
      dispatch(setTasks(res));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await apiRequest(`/tasks/${taskId}`, "DELETE");
      dispatch(deleteTask(taskId));
      if ((page - 1) * tasksPerPage >= tasks.length - 1) {
        setPage((prev) => Math.max(prev - 1, 1));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const truncateText = (text, wordLimit = 4) => {
  if (!text) return "";
  const words = text.split(" ");

  if (words.length <= wordLimit) return text;

  return words.slice(0, wordLimit).join(" ") + " ...";
};


  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Box sx={{ padding: isMobile ? "15px" : "30px" }}>
      {/* HEADER */}
      <Paper
        elevation={4}
        sx={{
          padding: isMobile ? "10px 15px" : "15px 25px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          borderRadius: 3,
          gap: isMobile ? 2 : 0,
          mb: 4,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
          Welcome, {user?.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "row",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: isMobile ? "space-between" : "flex-start",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <IconButton
            onClick={() => navigate("/add-task")}
            size={isMobile ? "small" : "medium"}
            sx={{
              background: "#1976d2",
              color: "white",
              '&:hover': { background: "#115293" },
            }}
          >
            <AddIcon />
          </IconButton>


          <IconButton
            sx={{
              background: "#d32f2f",
              color: "white",
              '&:hover': { background: "#9a0007" },
            }}
            size={isMobile ? "small" : "medium"}
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <LogoutIcon />
          </IconButton>

        </Box>
      </Paper>

      {/* CENTER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: isMobile ? "100%" : "70%",
            padding: isMobile ? "15px" : "25px",
            borderRadius: 3,
            boxShadow: 4,
            background: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Your Tasks
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* EMPTY */}
          {tasks.length === 0 && (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                padding: "20px 0",
                color: "gray",
                fontSize: "18px",
              }}
            >
              No tasks found.
            </Typography>
          )}

          {/* TASK LIST (PAGINATED) */}
          {paginatedTasks.map((task) => (
            <Card
              key={task._id}
              sx={{
                padding: isMobile ? "12px" : "15px",
                borderRadius: 2,
                boxShadow: 2,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 0,
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                mb: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                 {truncateText(task.title, 6)}
                </Typography>

                <Typography sx={{ mt: 1 }}> {truncateText(task.description, 4)}</Typography>


              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mt: 1 }}>
                  <b>Status:</b> {task.status}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mt: 1, color: "gray" }}>
                  <b>Date:</b>{" "}
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString("en-GB")
                    : "No date"}
                </Typography>
              </Box>
              {/*  ACTION BUTTONS */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  width: isMobile ? "100%" : "auto",
                  gap: 1,
                  justifyContent: isMobile ? "flex-end" : "flex-start",
                }}
              >
                {/* EDIT BUTTON - visible to all */}
                <IconButton
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                >
                  <EditIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>

                {/* DELETE BUTTON - only admin */}
                {user?.role === "admin" && (
                  <IconButton
                    color="error"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => handleDelete(task._id)}
                  >
                    <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                )}
              </Box>
            </Card>
          ))}

          {/* PAGINATION */}
          {tasks.length > 5 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                siblingCount={isMobile ? 0 : 1}
              />
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
}
