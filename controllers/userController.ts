import {userModel, User } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string): User | null  => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    } else {
      throw new Error("Password is incorrect");
    }
  }
  return null;
};
const getUserById = (id:number): User | null => {
  const user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByGithubId = (githubId: string): User | undefined => {
  return userModel.findByGithubId(githubId)
}

interface GithubUserData {
  githubId: string;
  name: string;
  username: string;
  profileUrl: string;
  avatar: string;
}

const createGithubUser = (data: GithubUserData) => {
  return userModel.create({
    name: data.name,
    role: "user", //give user role as a  default
    githubId: data.githubId,
    username: data.username,
    profileUrl: data.profileUrl,
    avatar: data.avatar,
  });
};

function isUserValid(user: any, password: string): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubId,
  createGithubUser,
};
