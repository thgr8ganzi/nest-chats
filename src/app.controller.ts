import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index.hbs')
  root() {
    return { data: { title: 'Chatting', copyright: 'Lee' } };
  }
}
