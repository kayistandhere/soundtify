class APIError  {
    readonly messages: string[];
  
    constructor(messages: string[]) {
      if (!messages || messages.length === 0) {
        throw new Error('APIError requires at least one message');
      }
      this.messages = messages;
    }
  
    public toString(): string {
      return `API Error:\n${this.messages.map((e) => `- ${e}`).join('\n')}`;
    }
  }