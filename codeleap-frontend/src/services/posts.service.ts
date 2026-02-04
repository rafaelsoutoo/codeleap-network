import { api } from "@/config/api";
import { CreatePostDTO, PostDTO, UpdatePostDTO } from "@/dtos/posts.dto";


export const postsService = {
  async list() {
    const { data } = await api.get<PostDTO[]>("/careers/");

    return data;
  },

  async create(payload: CreatePostDTO) {
    const { data } = await api.post<PostDTO>("/careers/", payload);

    return data;
  },

  async update(id: number, payload: UpdatePostDTO) {
    const { data } = await api.patch<PostDTO>(`/careers/${id}/`, payload);

    return data;
  },

  async remove(id: number) {
    await api.delete(`/careers/${id}/`);
  },

  async read(id: number) {
    const { data } = await api.get<PostDTO>(`/careers/${id}/`);

    return data;
  },
};
