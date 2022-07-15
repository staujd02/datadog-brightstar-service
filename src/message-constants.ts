export class MessageConstants {
  static Hello(): string {
    return 'Hello World!';
  }

  static GuardedHello(): string {
    return '...... hello.';
  }

  static TeapotCoffeeExceptionMessage(): string {
    return `I can't brew coffee, silly. I'm a teapot!`;
  }

  static GiveTeaMessage(): string {
    return 'Have some lovely tea, dear.';
  }

  static MysteryBeverageMessage(): string {
    return "I don't know what this is";
  }

  static AuthenticationRequiredMessage(): string {
    return 'Only special authenticated people can see this.';
  }

  static DefaultBaseInternalExceptionMessage(): string {
    return 'An internal error has occurred. Please see the application logs for more details. ';
  }
}
