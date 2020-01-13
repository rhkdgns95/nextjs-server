import { Options } from "graphql-yoga";
import app from "./app";

const PLAY_GROUND: string = "/playground";
const END_POINT: string = "/graphql";
const PORT: number = 4000;

const appOptions: Options = {
    playground: PLAY_GROUND,
    endpoint: END_POINT,
    port: PORT
};

const conn = () => console.log(`Graphql Server is Running to ${PORT}`);

app.start(appOptions, conn);