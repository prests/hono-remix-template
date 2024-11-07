export const MODE = process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV;
export const IS_PRODUCTION_MODE = MODE === 'production';
