import type { PropsWithChildren } from 'react';
import '@rijkshuisstijl-community/design-tokens/dist/index.css'

// Default implementation, that you can customize
function Root({ children }: PropsWithChildren<object>) {
    return <div className="rhc-theme">{children}</div>;
}

export default Root;
