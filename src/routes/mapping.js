import Game from "../pages/game";
import Home from "../pages/home";

const RoutesMapping = [
    {
        component: Game,
        path: "/games/:id"
    },
    {
        component: Home,
        path: "/",
        exact: true
    }
];

export default RoutesMapping;
