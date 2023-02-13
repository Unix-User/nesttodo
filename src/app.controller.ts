import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
//importa os services
import { UserService } from './user.service';
import { PostService } from './post.service';
import { AppService } from './app.service';
//importa o prisma client, e as models para users e posts
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller()
export class AppController {
  // declarar o que foi importado aqui no construtor
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) { }

  // quando chama a raiz do site responde com "getHello()" que esta no arquivo app.service.ts
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // quando chama por 'post/:id' na url, responde com "getPostById()" que esta no arquivo post.service.ts
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  // quando chama por 'feed' na url
  // responde com "getPublishedPosts()" que esta no arquivo post.service.ts
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  // quando chama por 'filtered-posts/:searchString' na url
  // responde com "getFilteredPosts()" que esta no arquivo post.service.ts
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  // quando envia por metodo post o titulo, conteudo e authorEmail na url 'post'
  // executa "createPost()" que esta no arquivo post.service.ts
  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  // quando envia por metodo post o name e email na url 'user'
  // executa "createPost()" que esta no arquivo user.service.ts
  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  
  // quando envia por metodo put os dados na url 'publish/:id'
  // executa "updatePost()" que esta no arquivo post.service.ts
  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  // quando envia por delete o id para 'post/:id'
  // executa "deletePost()" que esta no arquivo post.service.ts
  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}