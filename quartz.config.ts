import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
    configuration: {
        pageTitle: "Knowledge Base",
        enableSPA: true,
        enablePopovers: true,
        analytics: null,
        locale: "en-US",
        ignorePatterns: ["private", "templates", ".obsidian"],
        defaultDateType: "created",
        theme: {
            fontOrigin: "googleFonts",
            cdnCaching: true,
            typography: {
                header: "Inter",
                body: "Inter",
                code: "JetBrains Mono",
            },
            colors: {
                lightMode: {
                    light: "#fdfbf7",          // warm off-white background
                    lightgray: "#ece7e1",      // borders, code background
                    gray: "#c9c1b8",           // graph links, heavier borders
                    darkgray: "#5b5650",       // body text
                    dark: "#3a3632",           // headers, icons
                    secondary: "#8fb3c9",      // pastel blue - links, current node
                    tertiary: "#b8a8d6",       // pastel lavender - hover states
                    highlight: "rgba(143, 179, 201, 0.18)",
                    textHighlight: "#fbe7a188",
                },
                darkMode: {
                    light: "#232329",          // soft charcoal background
                    lightgray: "#33333b",      // borders, code background
                    gray: "#55555f",           // graph links, heavier borders
                    darkgray: "#d3d0cb",       // body text
                    dark: "#f3f1ec",           // headers, icons
                    secondary: "#a3c4dc",      // pastel blue - links, current node
                    tertiary: "#c8b6e8",       // pastel lavender - hover states
                    highlight: "rgba(163, 196, 220, 0.18)",
                    textHighlight: "#e6c86a55",
                },
            },
        },
    },
    plugins: {
        transformers: [
            Plugin.FrontMatter(),
            Plugin.CreatedModifiedDate({
                priority: ["frontmatter", "filesystem"],
            }),
            Plugin.SyntaxHighlighting({
                theme: {
                    light: "github-light",
                    dark: "github-dark",
                },
                keepBackground: false,
            }),
            Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
            Plugin.GitHubFlavoredMarkdown(),
            Plugin.TableOfContents(),
            Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
            Plugin.Description(),
            Plugin.Latex({ renderEngine: "katex" }),
        ],
        filters: [Plugin.RemoveDrafts()],
        emitters: [
            Plugin.AliasRedirects(),
            Plugin.ComponentResources(),
            Plugin.ContentPage(),
            Plugin.FolderPage(),
            Plugin.TagPage(),
            Plugin.ContentIndex({
                enableSiteMap: true,
                enableRSS: true,
            }),
            Plugin.Assets(),
            Plugin.Static(),
            Plugin.NotFoundPage(),
        ],
    },
}

export default config
