import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type LoginResponse {
        ok: Boolean!
        error: String
        token: String
    }
    type GetMyProfileResponse {
        ok: Boolean!
        error: String
        user: String
    }
    type Query {
        login(name: String!): LoginResponse!
        getMyProfile: GetMyProfileResponse!
    }
`;
const resolvers = {
    Query: {
        getMyProfile: async (_, __, { req }) => {
            console.log("req: ", req);
            return {
                ok: true,
                error: null,
                user: "comming soon"
            };
        },
        login: async (_, { name }, { req }) => {
            
            try {
                console.log("REQ: ", req);
                console.log("name: ", name);
                if(name === "KKH") {
                    return {
                        ok: true,
                        error: null,
                        token: "Comming soon"
                    };
                } else {
                    return {
                        ok: false,
                        error: "No Authorized",
                        token: null
                    };
                }
                
                
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
}
class App {
    public app: GraphQLServer;

    constructor() {
        this.app = new GraphQLServer({
            typeDefs,
            resolvers
        });
        this.middlewares();
    }
    private middlewares = async () => {
        this.app.express.use(this.jwt);
    }
    private jwt = async(req, res, next): Promise<void> => {
        const token = req.get('JWT');
        if(token) {
            console.log("TOKEN: ", token);
            
        }
        next();
    }
}

export default new App().app;