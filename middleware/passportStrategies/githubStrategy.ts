import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { getUserByGithubId, createGithubUser } from '../../controllers/userController';
import { Request } from 'express';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, 
      accessToken: string, 
      refreshToken: string, 
      profile: any, 
      done: (error: any, user?: any) => void ) => {
      try {
        let user = getUserByGithubId(profile.id);
        if (!user) {
          user = createGithubUser({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            username: profile.username,
            profileUrl: profile.profileUrl,
            avatar: profile.photos?.[0]?.value || '',
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
