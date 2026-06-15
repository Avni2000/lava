import preact from 'preact';

/**
 * This is used to generate a preview on hover for .md links
 * This is currently unused, but it'd be nice to use right now so we don't have to switch it out later.1
 */
export function PreviewLinks(link: string, content: string) {
    return <a href={link}>{content}</a>
}