import gql from 'graphql-tag';
import { API_URL } from '~/constants';
import { GetWebsiteQuery, Website } from '~/generated/graphql-admin';
import { adminSdk } from '~/graphql-wrapper';

let GRAPHQL_API = API_URL;
GRAPHQL_API = `${GRAPHQL_API}/admin-api`;

export const getWebsiteQuery = async () => {
	return adminSdk.GetWebsite({}, { apiUrl: GRAPHQL_API }).then((res: GetWebsiteQuery) => {
		return res?.getWebsite as Website;
	});
};

gql`
	fragment CarousalItem on CarousalItem {
		id
		position
		isActive
		featuredAsset {
			id
			createdAt
			updatedAt
			preview
			focalPoint {
				x
				y
			}
		}
	}
`;

gql`
	fragment WebLink on WebLink {
		id
		link
		linkText
		position
		featuredAsset {
			id
			createdAt
			updatedAt
			preview
			focalPoint {
				x
				y
			}
		}
	}
`;

gql`
	fragment Website on Website {
		content
		footerContent
		announcementBarText
		id
		weblinks {
			...WebLink
		}
		carousalItems {
			...CarousalItem
		}
	}
`;

gql`
	query GetWebsite {
		getWebsite {
			...Website
		}
	}
`;
