import { Query, Resolver } from "type-graphql";
import { User } from "./user.dto";

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: "2903jgfoi",
      email: "woiejvo",
      username: "wjoiej",
    };
  }
}

export default UserResolver;
