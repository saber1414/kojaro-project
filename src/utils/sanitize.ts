import sanitizeHtml from "sanitize-html";

export const sanitizeContent = (dirty: string): string => {
    return sanitizeHtml(dirty || "", {
        allowedTags: [
            "h1", "h2", "h3", "h4", "h5", "h6",
            "p", "br", "hr",
            "ul", "ol", "li",
            "strong", "em", "b", "i", "u", "s",
            "a", "img",
            "blockquote", "code", "pre",
            "table", "thead", "tbody", "tr", "th", "td",
            "div", "span",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel", "title"],
            img: ["src", "alt", "title", "class", "width", "height"],
            '*': ["id", "class"]
        },
        allowedSchemes: ["http","https","data"],
        allowedSchemesByTag: {
            img: ["http","https","data"]
        },
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", {
                rel: "noopener noreferrer",
                target: "_blank"
            })
        }
    })
};