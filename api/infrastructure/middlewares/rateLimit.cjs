const rateLimit = require('express-rate-limit');
// Lista de User-Agents de bots conocidos
const botUserAgents = [
	'Prerender',
	'Googlebot',
	'Google\\+',
	'bingbot',
	'Googlebot-Mobile',
	'seochat',
	'SemrushBot',
	'SemrushBot-SA',
	'Bot',
	'SEOChat',
	'Baiduspider',
	'Yahoo',
	'YahooSeeker',
	'DoCoMo',
	'Twitterbot',
	'TweetmemeBot',
	'Twikle',
	'Netseer',
	'Daumoa',
	'SeznamBot',
	'Ezooms',
	'MSNBot',
	'Exabot',
	'MJ12bot',
	'sogou\\sspider',
	'YandexBot',
	'bitlybot',
	'ia_archiver',
	'proximic',
	'spbot',
	'ChangeDetection',
	'NaverBot',
	'MetaJobBot',
	'magpie-crawler',
	'Genieo\\sWeb\\sfilter',
	'Qualidator.com\\sBot',
	'Woko',
	'Vagabondo',
	'360Spider',
	'ExB\\sLanguage\\sCrawler',
	'AddThis.com',
	'aiHitBot',
	'Spinn3r',
	'BingPreview',
	'GrapeshotCrawler',
	'CareerBot',
	'ZumBot',
	'ShopWiki',
	'bixocrawler',
	'uMBot',
	'sistrix',
	'linkdexbot',
	'AhrefsBot',
	'archive.org_bot',
	'SeoCheckBot',
	'TurnitinBot',
	'VoilaBot',
	'SearchmetricsBot',
	'Butterfly',
	'Yahoo!',
	'Plukkie',
	'yacybot',
	'trendictionbot',
	'UASlinkChecker',
	'Blekkobot',
	'Wotbox',
	'YioopBot',
	'meanpathbot',
	'TinEye',
	'LuminateBot',
	'FyberSpider',
	'Infohelfer',
	'linkdex.com',
	'Curious\\sGeorge',
	'Fetch-Guess',
	'ichiro',
	'MojeekBot',
	'SBSearch',
	'WebThumbnail',
	'socialbm_bot',
	'SemrushBot',
	'Vedma',
	'alexa\\ssite\\saudit',
	'SEOkicks-Robot',
	'Browsershots',
	'BLEXBot',
	'woriobot',
	'AMZNKAssocBot',
	'Speedy',
	'oBot',
	'HostTracker',
	'OpenWebSpider',
	'WBSearchBot',
	'FacebookExternalHit',
	'Google-Structured-Data-Testing-Tool',
	'baiduspider',
	'facebookexternalhit',
	'twitterbot',
	'rogerbot',
	'linkedinbot',
	'embedly',
	'quora\\slink\\spreview',
	'showyoubot',
	'outbrain',
	'pinterest',
	'slackbot',
	'vkShare',
	'W3C_Validator',
];

exports.loginLimiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 3 minutos
	max: 3, // Máximo de 3 solicitudes
	handler: (req, res, next) => {
		const userAgent = req.get('User-Agent');
		// Verificar si el User-Agent coincide con alguno de los patrones de bots
		if (
			userAgent &&
			botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))
		) {
			return res.status(403).json({
				error: 'Forbidden',
				message: 'Bot access is not allowed.',
			});
		}
		res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            sameSite: 'strict',
        });
		res.status(429).json({
			status: 429,
			message: 'Espera 3 minutos antes de volver a intentarlo.',
		});
	},
});

exports.getLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 25, // Máximo de 25 solicitudes
	handler: (req, res, next) => {
		const userAgent = req.get('User-Agent');
		// Verificar si el User-Agent coincide con alguno de los patrones de bots
		if (
			userAgent &&
			botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))
		) {
			return res.status(403).json({
				error: 'Forbidden',
				message: 'Bot access is not allowed.',
			});
		}
		res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            sameSite: 'strict',
        });
		res.status(429).json({
			status: 429,
			message: 'Tasa de solicitudes superada. Intenta de nuevo más tarde.',
		});
	},
});

exports.postLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 45, // Máximo de 45 solicitudes
	handler: (req, res, next) => {
		const userAgent = req.get('User-Agent');
		// Verificar si el User-Agent coincide con alguno de los patrones de bots
		if (
			userAgent &&
			botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))
		) {
			return res.status(403).json({
				error: 'Forbidden',
				message: 'Bot access is not allowed.',
			});
		}
		res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            sameSite: 'strict',
        });
		res.status(429).json({
			status: 429,
			message: 'Tasa de solicitudes superada. Intenta de nuevo más tarde.',
		});
	},
});

exports.putLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 45, // Máximo de 45 solicitudes
	handler: (req, res, next) => {
		const userAgent = req.get('User-Agent');
		// Verificar si el User-Agent coincide con alguno de los patrones de bots
		if (
			userAgent &&
			botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))
		) {
			return res.status(403).json({
				error: 'Forbidden',
				message: 'Bot access is not allowed.',
			});
		}
		res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            sameSite: 'strict',
        });
		res.status(429).json({
			status: 429,
			message: 'Tasa de solicitudes superada. Intenta de nuevo más tarde.',
		});
	},
});

exports.deleteLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutos
	max: 10, // Máximo de 10 solicitudes
	handler: (req, res, next) => {
		const userAgent = req.get('User-Agent');
		// Verificar si el User-Agent coincide con alguno de los patrones de bots
		if (
			userAgent &&
			botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))
		) {
			return res.status(403).json({
				error: 'Forbidden',
				message: 'Bot access is not allowed.',
			});
		}
		res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: 'localhost',
            sameSite: 'strict',
        });
		res.status(429).json({
			status: 429,
			message: 'Tasa de solicitudes superada. Intenta de nuevo más tarde.',
		});
	},
});