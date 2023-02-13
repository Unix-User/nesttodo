import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Olá Mundo!</h1>
      <ul><li><a href="feed/">Posts</a></li></ul>
      Adicionar usuário:
      ${this.renderUserForm()}
      Adicionar post:
      ${this.renderPostForm()}`;
  }

  renderUserForm(): string {
    return `<form action="user" method="post">
      <label for="name">name:</label><br>
      <input type="text" id="name" name="name" value=""><br>
      <label for="email">email:</label><br>
      <input type="email" id="email" name="email" value=""><br><br>
      <input type="submit" value="Submit"></form><br />`;
  }

  renderPostForm(): string {
    return `<form action="post" method="post">
      <label for="title">title:</label><br>
      <input type="text" id="title" name="title" value=""><br>
      <label for="authorEmail">authorEmail:</label><br>
      <input type="email" id="authorEmail" name="authorEmail" value=""><br>
      <label for="content">content:</label><br>
      <input type="text" id="content" name="content" value=""><br><br>
      <input type="submit" value="Submit"></form>`;
  }
}

