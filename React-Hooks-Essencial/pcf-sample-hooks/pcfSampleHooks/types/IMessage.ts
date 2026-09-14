export interface IMessage {
  id: number;
  text: string;
  sender: string;
  isBot?: boolean;
}