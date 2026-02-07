import * as Shiki from "https://esm.sh/shiki@3.0.0";

const VerseHighlighting = async () => {
    const [LangResponse, ThemeResponse] = await Promise.all([
        fetch("/book/Assets/Verse.json"),
        fetch("/book/Assets/VerseDark.json")
    ]);

    const VerseGrammar = await LangResponse.json();
    const VerseTheme = await ThemeResponse.json();

    const Highlighter = await Shiki.createHighlighter({
        themes: [VerseTheme],
        langs: [VerseGrammar]
    });

    const VerseCodeBlocks = document.querySelectorAll("code.language-verse");

    VerseCodeBlocks.forEach((Block) => {
        const CodeContent = Block.innerText;

        const HTML = Highlighter.codeToHtml(CodeContent, {
            lang: VerseGrammar.name,
            theme: VerseTheme.name
        });

        Block.parentElement.outerHTML = HTML;
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", VerseHighlighting);
} else {
    VerseHighlighting();
}