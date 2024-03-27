interface Notification {
  id: string;
  type: string;
  content: string;
  wasRead: boolean;
  createdAt: Date;
}

export default Notification;
