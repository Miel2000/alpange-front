const mqMobile = "(max-width: 414px)";
const mqDesktop = "(min-width: 415px)";
const mqDesktopLarge = "(min-width: 1921px)";

const headerHeightPrimary = 150;
const headerHeightSecondary = 90;

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

export const state = () => ({
	mqMobile,
	mqDesktop,
	mqDesktopLarge,
	STRAPI_BASE_URL,
	isMobile: false,
	isMobileNavOpen: false,
	headerHeight: headerHeightPrimary
});

export const mutations = {

	updateHeaderHeight(state) {

		state.headerHeight = state === "primary" ? headerHeightPrimary : headerHeightSecondary;
	
	},

	updateIsMobile(state) {

		state.isMobile = window.matchMedia(state.mqMobile).matches;
	
	},

	setMobileNavOpen(state, newState) {

		state.isMobileNavOpen = newState;
		
	}

};
