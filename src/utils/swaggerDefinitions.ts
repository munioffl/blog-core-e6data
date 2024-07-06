export const swaggerDefinitions = {
  openapi: '3.0.0',
  info: {
    title: 'Blogging Platform API',
    version: '1.0.0',
    description: 'API documentation for the Blogging Platform',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication related endpoints',
    },
    {
      name: 'Posts',
      description: 'API for managing blog posts',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                  role: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login a user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User logged in successfully',
          },
          401: {
            description: 'Invalid credentials',
          },
        },
      },
    },
    '/posts': {
      get: {
        summary: 'Retrieve a list of posts',
        tags: ['Posts'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            required: false,
            schema: {
              type: 'integer',
            },
            description: 'The page number',
          },
          {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              type: 'integer',
            },
            description: 'The number of items per page',
          },
        ],
        responses: {
          200: {
            description: 'A list of posts',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      post: {
        summary: 'Create a new post',
        tags: ['Posts'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'content', 'author'],
                properties: {
                  title: {
                    type: 'string',
                  },
                  content: {
                    type: 'string',
                  },
                  author: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Post created successfully',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    '/posts/{id}': {
      get: {
        summary: 'Retrieve a single post by ID',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The post ID',
          },
        ],
        responses: {
          200: {
            description: 'A single post',
          },
          404: {
            description: 'Post not found',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      put: {
        summary: 'Update an existing post',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The post ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                  },
                  content: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Post updated successfully',
          },
          404: {
            description: 'Post not found',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      delete: {
        summary: 'Delete a post',
        tags: ['Posts'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The post ID',
          },
        ],
        responses: {
          200: {
            description: 'Post deleted successfully',
          },
          404: {
            description: 'Post not found',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  },
};

export default swaggerDefinitions;
