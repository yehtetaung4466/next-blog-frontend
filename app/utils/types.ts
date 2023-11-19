export interface JWT {
  id: number;
  name: string;
  role: 0 | 1 | 2;
  profile: string | null;
  suspended: boolean;
  createdAt: string;
  iat: number;
  exp: number;
}

export interface User {
  id: number;
  name: string;
  role: 0 | 1 | 2;
  profile: string;
  suspended: boolean;
  createdAt: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  author_id: number;
  likes: number;
  dislikes: number;
  comment_count: number;
  comments: Comment[];
  reactions: Reaction[];
}

interface Comment {
  id: number;
  context: string;
  createdAt: string;
  author_id: number;
}

interface Reaction {
  id: number;
  reaction: "like" | "dislike" | "neutral";
  author_id: number;
  blog_id: number;
}

export interface Activity_t {
  type: 'like' | 'dislike' | 'comment';
  authorNameOfActivityMakedBlog: string;
  authorIdOfActivityMakedBlog: number;
  createdAt:Date;
}
