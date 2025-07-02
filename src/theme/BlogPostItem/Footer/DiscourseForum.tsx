import { useEffect } from 'react';

export default function DiscourseForum({ discourseEmbedUrl }: { discourseEmbedUrl: string }) {
  useEffect(() => {
    window.DiscourseEmbed = {
      discourseUrl: 'https://community.developer.overheid.nl/',
      discourseEmbedUrl,
    };

    const d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
  }, []);

  return (
    <>
      <h2 className='margin-top--lg'>Reacties</h2>
      <div id="discourse-comments" className='margin-top--md'></div>
      <meta name='discourse-username' content='developer.overheid' />
    </>
  );
}