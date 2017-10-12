/* tslint:disable:max-line-length */
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { UsersService } from '../user/users.service';

import { BotService } from '../botservice/bot.service';


import * as moment from 'moment';

// the person using the app us Juliet
const me: User      = new User('Users', 'assets/images/avatars/male-avatar-1.png');
const echo: User    = new User('Isma Bot', 'assets/images/avatars/female-avatar-1.png');

const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `Greetings, Human`,
    thread: tEcho
  })
];

export class ChatExampleData {
  static init(messagesService: MessagesService,
              threadsService: ThreadsService,
              UsersService: UsersService, botService : BotService): void {

    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => messagesService.addMessage(message) );

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService, botService);
  }

  static setupBots(messagesService: MessagesService, botService : BotService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {
        botService.getAnswer(message.text).subscribe(
          data => {
          messagesService.addMessage(
                  new Message({
                    author: echo,
                    text: data['param']['answer'],
                    thread: tEcho
                  })
                );

          }

        );
      },
                null);

  }
}
