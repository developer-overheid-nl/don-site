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
