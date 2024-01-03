export interface Ticket {
    id: string;
    title: string;
    body: string;
  }
  
  export interface TicketIdProps {
    params: {
      id: string;
    };
  }