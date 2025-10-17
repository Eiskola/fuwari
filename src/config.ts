import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// 网站设置
export const siteConfig: SiteConfig = {
	title: "Eiskola's Blog",
	subtitle: "the tech shop.",
	lang: "en", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		// 首页横幅图片
		src: "assets/images/banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "top", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // 放置首页横幅图片的作者信息 Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // 设置是否显示文章目录  Display the table of contents on the right side of the post
		depth: 2, // 文章目录显示层级 Maximum heading depth to show in the table, from 1 to 3
	},
	// 鼠标视觉特效配置：包括点击烟花（fireworks）和鼠标跟随小星星（stars）
	mouseEffects: {
		fireworks: { enable: true },	// 鼠标点击烟花效果
		stars: { enable: false },		// 鼠标星星拖尾效果，实验性，会造成卡顿，建议关闭
	},
	// 樱花飘落特效（独立配置）
	sakura: { enable: true },
	// 全局静态背景配置
	staticBackground: {
		enable: true,
		type: "image",
		src: "assets/images/bg.png", // 同 banner图访问方式
		position: "fixed",
		opacity: 0.9,
	},
	// footer 设置
	favicon: [
		// Leave this array empty to use the default favicon
		{
		  src: '/favicon/favicon-200.png',    // Path of the favicon, relative to the /public directory
		  theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		  sizes: '200x200',            // (Optional) Size of the favicon, set only if you have favicons of different sizes
		}
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Life,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/gnibnay", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Eiskola",
	bio: "岁月漫长，然而值得等待.",
	links: [
		// {
		// 	name: "Outlook",
		// 	icon: "file-icons:microsoft-outlook", // Visit https://icones.js.org/ for icon codes
		// 	// You will need to install the corresponding icon set if it's not already included
		// 	// `pnpm add @iconify-json/<icon-set-name>`
		// 	url: "https://gnibnay@outlook.com",
		// },
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/gnibnay",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
