import { SIDE_NAV_DARK, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'
import axios from 'axios';

export const APP_NAME = 'Grand Energy';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';

// Page base URLs
export const GE_STAGING_URL = 'grand-energy-customer-staging.reddotapps.com.sg';
export const GE_PROD_URL = 'grand-energy-customer-prod.reddotapps.com.sg';
// API URLs
export const GE_API_STAGING_URL = 'https://grandenergy-staging-api.reddotapps.com.sg';
export const GE_API_PROD_URL = 'https://grandenergy-prod-api.reddotapps.com.sg';
// HRMS page base URLs
export const GE_HRMS_STAGING_URL = 'https://grandenergy-staging.reddotapps.com.sg';
export const GE_HRMS_PROD_URL = 'https://grandenergy-prod.reddotapps.com.sg';

axios.defaults.baseURL = 'https://grandenergy-staging-api.reddotapps.com.sg'
axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token')
axios.defaults.headers.common['content-type'] = "application/json";

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_DARK,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#111118',
	headerNavColor: '#111118',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR
	
};
