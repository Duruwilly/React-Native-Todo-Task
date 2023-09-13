import Homescreen from "../screens/Homescreen";
import NewTask from "../screens/NewTask";

interface routeInterface {
  name: string;
  component: React.FC;
  options?: { title: string };
}

export const routes: Array<routeInterface> = [
  {
    name: "TodoList",
    component: Homescreen,
    options: { title: "" },
  },
  { name: "NewTask", component: NewTask, options: { title: "" } },
];
