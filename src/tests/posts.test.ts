// tests/posts.test.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock("next/server", () => {
  return {
    NextResponse: {
      json: (body: unknown, init?: { status?: number }) => {
        return { body, status: init?.status ?? 200 };
      },
    },
    NextRequest: class {},
  };
});

jest.mock("@/services/authService", () => ({
  authService: jest.fn(),
}));

jest.mock("@/services/postService", () => ({
  getAllPosts: jest.fn(),
  createPost: jest.fn(),
}));

import type { NextRequest as NextRequestType } from "next/server";
import { GET, POST } from "@/app/api/posts/route"; // ajustá si tu route.ts está en otra ubicación
import { authService } from "@/services/authService";
import { getAllPosts, createPost } from "@/services/postService";
import type { Post, User } from "@/models/interfaces";

type PostBody = {
  title: string;
  content: string;
};

type HandlerResponse<T = unknown> = {
  body: T;
  status: number;
};

type MockRequest<T = unknown> = {
  json: () => Promise<T>;
};

function asHandlerResponse<T>(value: unknown): HandlerResponse<T> {
  return value as unknown as HandlerResponse<T>;
}

describe("api/posts route handlers (con interfaces)", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockedAuth = authService as unknown as jest.MockedFunction<
    () => Promise<{ user: { id: string } } | null>
  >;

  const mockedGetAllPosts = getAllPosts as unknown as jest.MockedFunction<
    () => Promise<Post[]>
  >;

  const mockedCreatePost = createPost as unknown as jest.MockedFunction<
    (userId: string, title: string, content: string) => Promise<Post>
  >;

  // helper user para poblar author
  const fakeUser: User = {
    _id: "u1",
    name: "Juan",
    image: "https://example.com/avatar.png",
  };

  describe("GET", () => {
    it("devuelve la lista de posts cuando el usuario está autenticado", async () => {
      const fakePosts: Post[] = [
        {
          _id: "p1",
          author: fakeUser,
          title: "Hola",
          createdAt: new Date().toISOString(),
          content: "cosa",
          commentsCount: 0,
        },
        {
          _id: "p2",
          author: fakeUser,
          title: "Mundo",
          createdAt: new Date().toISOString(),
          content: "otra cosa",
          commentsCount: 2,
        },
      ];

      mockedAuth.mockResolvedValue({ user: { id: "u1" } });
      mockedGetAllPosts.mockResolvedValue(fakePosts);

      const raw = await GET();
      const res = asHandlerResponse<Post[]>(raw);

      expect(mockedAuth).toHaveBeenCalled();
      expect(mockedGetAllPosts).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakePosts);
    });

    it('devuelve 401 cuando authService lanza "401"', async () => {
      mockedAuth.mockRejectedValue(new Error("401"));

      const raw = await GET();
      const res = asHandlerResponse<{ error: string }>(raw);

      expect(mockedAuth).toHaveBeenCalled();
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "Unauthenticated." });
    });

    it("si ocurre otro error devuelve 500", async () => {
      mockedAuth.mockRejectedValue(new Error("boom"));

      const raw = await GET();
      const res = asHandlerResponse<{ error: string }>(raw);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Server Error." });
    });
  });

  describe("POST", () => {
    it("crea un post correctamente cuando body es válido y usuario autenticado", async () => {
      const jsonMock = jest.fn(async () => ({
        title: "Nuevo post",
        content: "Contenido",
      }));
      const fakeReq: MockRequest<PostBody> = { json: jsonMock };

      const created: Post = {
        _id: "p-new",
        author: fakeUser,
        title: "Nuevo post",
        createdAt: new Date().toISOString(),
        content: "Contenido",
        commentsCount: 0,
      };

      mockedAuth.mockResolvedValue({ user: { id: "u1" } });
      mockedCreatePost.mockResolvedValue(created);

      const raw = await POST(fakeReq as unknown as NextRequestType);
      const res = asHandlerResponse<Post>(raw);

      expect(jsonMock).toHaveBeenCalled();
      expect(mockedAuth).toHaveBeenCalled();
      expect(mockedCreatePost).toHaveBeenCalledWith(
        "u1",
        "Nuevo post",
        "Contenido"
      );
      expect(res.status).toBe(200);
      expect(res.body).toEqual(created);
    });

    it("devuelve 400 cuando el body es inválido (ZodError)", async () => {
      const jsonMock = jest.fn(async () => ({ title: 123 } as unknown));
      const fakeReq: MockRequest<unknown> = { json: jsonMock };

      const raw = await POST(fakeReq as unknown as NextRequestType);
      const res = asHandlerResponse<{ error: string }>(raw);

      expect(jsonMock).toHaveBeenCalled();
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid request body." });
    });

    it('devuelve 401 cuando authService lanza "401" en POST', async () => {
      const jsonMock = jest.fn(async () => ({ title: "t", content: "c" }));
      const fakeReq: MockRequest<PostBody> = { json: jsonMock };

      mockedAuth.mockRejectedValue(new Error("401"));

      const raw = await POST(fakeReq as unknown as NextRequestType);
      const res = asHandlerResponse<{ error: string }>(raw);

      expect(mockedAuth).toHaveBeenCalled();
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "Unauthenticated." });
    });

    it("si ocurre otro error devuelve 500", async () => {
      const jsonMock = jest.fn(async () => ({ title: "t", content: "c" }));
      const fakeReq: MockRequest<PostBody> = { json: jsonMock };

      mockedAuth.mockResolvedValue({ user: { id: "u1" } });
      mockedCreatePost.mockRejectedValue(new Error("boom"));

      const raw = await POST(fakeReq as unknown as NextRequestType);
      const res = asHandlerResponse<{ error: string }>(raw);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Server Error." });
    });
  });
});
