export interface JWT{
  id: number,
  name: string,
  role: 0 | 1 | 2,
  profile: string | File,
  suspended: boolean,
  email: string,
  createdAt: Date,
  iat: number,
  exp: number
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
  content: string;
  createdAt: string;
  author_id: number;
}

interface Reaction {
  id: number;
  type: string;
  user_id: number;
}