export class JiraTaskManagement {
  constructor(authToken) {
    this.AuthToken = authToken;
    this.TicketType = "Task";
    this.Priority = "";
    this.TicketTitle = "";
    this.Description = "";
  }

  getTicketTypeValues = () => {
    return ["Task"];
  };

  getTicketPriorityOptions = () => {
    return ["Lowest", "Low", "Medium", "High", "Highest"];
  };

  toForm() {
    return [
      {
        key: "ticketType",
        label: "Ticket Type",
        type: "select",
        value: this.getTicketTypeValues()
      },
      {
        key: "priority",
        label: "Priority",
        type: "select",
        value: this.getTicketPriorityOptions()
      },
      {
        key: "title",
        label: "Ticket Title",
        props: { required: true }
      },
      {
        key: "description",
        label: "Ticket Description",
        type: "textarea",
        props: { required: true }
      }
    ];
  }
}
