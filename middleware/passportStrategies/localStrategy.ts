import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  role: string;
  githubId?: string;
  username?: string;
  profileUrl?: string;
  avatar?: string;
}


const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, 
    password: string, 
    done: (error: any, user?: User | false, options?: { message: string }) => void ) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      return user
        ? done(null, user)
        : done(null, false, {
            message: "Your login details are not valid. Please try again",
          });

    } catch (error: any) {
      return done(null, false, { message: error.message })
    }
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser( (user: Express.User, done: (err: any, id?: number) => void ) => {
  const typedUser = user as User;
  // user: Express.User
  done(null, typedUser.id);
}
)
/*
FIX ME (types) 😭
*/
passport.deserializeUser((id: number, done: (err: any, user?: User | false) => void) => {
  try{
    let user = getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, false);
    }
  } catch (error) {
    done(error, false);
  }
});


const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
