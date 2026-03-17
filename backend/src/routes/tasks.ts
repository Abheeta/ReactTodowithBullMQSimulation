import AppRouter from "./AppRouter";
import { deleteTask, getTasks } from "@/controllers/todocontroller";
import { addTask, updateTask } from "@/controllers/todocontroller";
import { HttpStatusCodes } from "@/utils/enums/http";
import { createValidator } from "@/utils/validator";
import z from "zod";

const router = new AppRouter();
const validator = createValidator();

router.get("/", async(_req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
})

const addTaskRequestSchema = z.object({title: z.string().min(1).max(200)});
const updateTaskRequestSchema = z.object({title: z.string().optional(), completed: z.boolean().optional()});
const updateEndPointSchema = z.object({id: z.coerce.number()});

router.post(
    "/",
    validator.body(addTaskRequestSchema),
    async(req, res) => {
        const { title } = req.body as z.infer<typeof addTaskRequestSchema>;
        const newTask = await addTask(title)

        res.json(newTask);
        
    }
)

router.patch(
    "/:id",
    validator.body(updateTaskRequestSchema),
    validator.params(updateEndPointSchema),

    async(req, res) => {
        const {id} = req.params as unknown as z.infer<typeof updateEndPointSchema>;
        const {title, completed} = req.body as z.infer<typeof updateTaskRequestSchema>;

        await updateTask(id, {title, completed})
        res.status(HttpStatusCodes.Success.NO_CONTENT).end();
    }

)

router.delete(
    "/:id",
    validator.params(updateEndPointSchema),
    async(req, res) => {
        const {id} = req.params as unknown as z.infer<typeof updateEndPointSchema>;
        deleteTask(id);

        res.status(HttpStatusCodes.Success.ACCEPTED).end();
    }
)
export default router;
