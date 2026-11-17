export {};

declare global {
  interface Window {
    DiscourseEmbed: {
      discourseUrl: string;
      discourseEmbedUrl?: string;
      topicId?: number;
      className?: string;
    };
  }
}

// Invoker Commands API (command/commandfor op <button>). React 18 geeft
// onbekende kleine-letterattributen door aan de DOM, maar de types kennen ze
// nog niet.
declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?: string;
    commandfor?: string;
  }
}
