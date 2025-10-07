import Elysia from "elysia";

const Dashboard = new Elysia({
    prefix: "/dashboard"
})
    .get("/apa", () => "Hello World")

export default Dashboard
