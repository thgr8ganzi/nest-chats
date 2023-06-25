import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  handleDisconnect(@ConnectedSocket() socket): any {
    this.logger.log(`dis connected : ${socket.id} ${socket.nsp.name}}`);
  }
  handleConnection(@ConnectedSocket() socket): any {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}}`);
  }

  private logger = new Logger('ChatsGateway');

  constructor() {
    this.logger.log('ChatsGateway constructor');
  }
  afterInit() {
    this.logger.log('Initialized!');
  }
  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    socket.broadcast.emit('new_connected', username);
    return username;
  }
}
