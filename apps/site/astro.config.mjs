// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://attnbox.zalize.com",
  integrations: [
    starlight({
      title: "attnbox",
      description: "Unified attention inbox for your local and cloud AI coding agents.",
      logo: { src: "./src/assets/icon.svg" },
      favicon: "/favicon.svg",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/wookat/attnbox" }],
      sidebar: [
        { label: "Quick start", slug: "quickstart" },
        { label: "Using the inbox", slug: "inbox" },
        { label: "Sources & honest limits", slug: "limits" },
        { label: "Authoritative hooks", slug: "hooks" },
        { label: "Troubleshooting with doctor", slug: "doctor" }
      ],
      customCss: ["./src/styles/custom.css"]
    })
  ]
});
