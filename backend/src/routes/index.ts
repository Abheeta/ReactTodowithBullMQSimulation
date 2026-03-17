import AppRouter from "./AppRouter";
import { HttpStatusCodes } from "@/utils/enums/http";
import tasksRouter from "./tasks";

const router = new AppRouter();

// Default message for base route
router.get("/", (_req, res) => {
    res.status(HttpStatusCodes.Success.OK).json({ message: "Welcome to ToDo App backend" });
});

router.use("/tasks", tasksRouter);

export default router;
