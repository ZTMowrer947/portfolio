import 'server-only';

// Environment variables
export const spaceId = process.env.CONTENTFUL_SPACEID!;
export const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;
export const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN!;
export const environment = process.env.CONTENTFUL_ENVIRONMENT!;

// URL bases
export const apiBaseUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`;
export const apiDraftUrl = apiBaseUrl.replace(/\/\/cdn\./, '//preview.');
