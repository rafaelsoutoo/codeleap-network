export interface PostDTO {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
  }
  
  export interface CreatePostDTO {
    username: string;
    title: string;
    content: string;
  }
  
  export interface UpdatePostDTO {
    title: string;
    content: string;
  }
  